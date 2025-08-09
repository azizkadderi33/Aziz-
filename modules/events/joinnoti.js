// joinnoti.js
// ترحيب بالمشتركين الجدد في الجروب، يدعم mention ونص قابل للتخصيص.
// (يدعم توليد صورة ترحيبية إذا مثبتين canvas و axios)

module.exports.config = {
  name: "joinnoti",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "عبدالعزيز", // غيّر الاسم إذا حبيت
  description: "يرحب بالأعضاء الجدد في الجروب (نص + اختياري صورة ترحيبية).",
  usages: "",
  cooldowns: 5
};

const useCanvas = (() => {
  try {
    require.resolve("canvas");
    require.resolve("axios");
    return true;
  } catch (e) {
    return false;
  }
})();

let Canvas, axios;
if (useCanvas) {
  Canvas = require("canvas");
  axios = require("axios");
}

module.exports.handleEvent = async ({ api, event, Users, Threads, Currencies }) => {
  try {
    // نتأكد إنه الحدث ترحيب (انضمام)
    if (event.logMessageType !== "log:subscribe") return;

    const added = event.logMessageData.addedParticipants || [];
    if (!added.length) return;

    // نجيب معلومات الجروب
    let threadInfo = {};
    try {
      threadInfo = (await api.getThreadInfo(event.threadID)) || {};
    } catch (e) {
      threadInfo = {};
    }

    const threadName = threadInfo.threadName || "this group";

    // عدد أعضاء الجروب الحالي (في بعض APIs تكون داخل threadInfo)
    let memberCount = threadInfo.participantIDs ? threadInfo.participantIDs.length : null;
    if (!memberCount) {
      try {
        const tinfo = await api.getThreadInfo(event.threadID);
        memberCount = tinfo.participantIDs ? tinfo.participantIDs.length : "???";
      } catch (e) {
        memberCount = "???";
      }
    }

    // إعدادات الرسالة — غيّر النُسق هنا كما تحب
    const welcomeTemplate = "أهلاً @name 👋\nنورت/ي *{threadName}*!\nاحنا الآن {count} عضو.\nإذا حبيت تعرف القوانين اكتب: !rules";
    // يمكنك وضع قائمة من الجمل عشوائيًا بدل النص الثابت:
    // const welcomePool = ["مرحبا @name!", "ياهلا @name!"];

    // نبني المينشن واسم العضو
    const mentions = [];
    let bodyTextParts = [];

    for (const p of added) {
      const id = p.userFbId || p.id; // بعض الإصدارات تستخدم userFbId
      let name = "عضو جديد";
      try {
        const userInfo = (await Users.getData(id)) || {};
        name = userInfo.name || (await api.getUserInfo(id))[id].name || name;
      } catch (e) {
        // نركّب اسم من event إذا فشل
        if (p.fullName) name = p.fullName;
      }

      // نص مع استبدال المتغيرات
      let welcome = welcomeTemplate.replace(/@name/g, name)
                                   .replace(/\{threadName\}/g, threadName)
                                   .replace(/\{count\}/g, memberCount);

      // نضيف Mention object المدعوم من framework
      mentions.push({
        tag: name,
        id
      });

      bodyTextParts.push(welcome);
    }

    const bodyText = bodyTextParts.join("\n\n");

    // إذا canvas منصب، نحاول نبعت صورة ترحيبية
    if (useCanvas) {
      try {
        // نولد صورة بسيطة: صورة خلفية + صورة البروفايل + اسم
        const width = 1000;
        const height = 400;
        const canvas = Canvas.createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        // خلفية gradient
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, "#3b82f6");
        grad.addColorStop(1, "#06b6d4");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // خطوط
        Canvas.registerFont && Canvas.registerFont; // لا يلزم لو ما عندك فونت

        // نرسم كل عضو المضاف (لو أكثر من واحد، نأخذ الأول كصورة)
        const first = added[0];
        const idFirst = first.userFbId || first.id;
        // نحصل رابط بروفايل -- بعض واجهات api توفر method getUserInfoURL; نخمن طريقة آمنة:
        let avatarUrl = `https://graph.facebook.com/${idFirst}/picture?width=512&height=512`;

        const res = await axios.get(avatarUrl, { responseType: "arraybuffer" });
        const avatar = await Canvas.loadImage(res.data);

        // draw circle avatar
        const avSize = 220;
        const avX = 60;
        const avY = (height - avSize) / 2;

        // دائرة
        ctx.save();
        ctx.beginPath();
        ctx.arc(avX + avSize/2, avY + avSize/2, avSize/2 + 4, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.arc(avX + avSize/2, avY + avSize/2, avSize/2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, avX, avY, avSize, avSize);
        ctx.restore();

        // نص الترحيب
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "left";

        // اسم الجروب
        ctx.font = "bold 36px Sans";
        ctx.fillText(threadName, avX + avSize + 40, avY + 80);

        // جملة مرحبا
        ctx.font = "28px Sans";
        const addedNames = added.map(a => a.fullName || a.name || "عضو").join(", ");
        ctx.fillText(`اهلاً ${addedNames}`, avX + avSize + 40, avY + 130);

        // عدد الأعضاء
        ctx.font = "24px Sans";
        ctx.fillText(`الآن ${memberCount} عضو`, avX + avSize + 40, avY + 170);

        const imageBuffer = canvas.toBuffer();

        const attach = [{ filename: "welcome.png", mimetype: "image/png", buffer: imageBuffer }];

        // نرسل الرسالة مع mentions و الصورة
        return api.sendMessage({ body: bodyText, mentions, attachment: attach }, event.threadID, (err, info) => {
          if (err) return console.error("Error sending welcome image:", err);
        });

      } catch (err) {
        // لو فشل توليد الصورة نرجع للنص فقط
        console.warn("Failed to create welcome image, sending text only:", err);
      }
    }

    // إذا ما في canvas أو فشل، نرسل نص فقط مع mentions
    return api.sendMessage({ body: bodyText, mentions }, event.threadID, (err) => {
      if (err) console.error("Error sending welcome text:", err);
    });

  } catch (error) {
    console.error("joinnoti error:", error);
  }
};