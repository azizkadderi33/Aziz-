module.exports.config = {
  name: "تحديث",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "𝐊𝐈𝐓𝐄 凧",
  description: "refresh appstate.json",
  commandCategory: "Admin",
  usages: "appstate",
  cooldowns: 5,
  dependencies: {
  }
};

module.exports.run = async function ({ api, event, args }) {
  const fs = require("fs-extra");
  const permission = [`593785946`,``];
  if (!permission.includes(event.senderID)) return api.sendMessage("متـقدࢪش  .\nفقط ❆『 خليل جلفاوي ➹ 』😻🌿", event.threadID, event.messageID);
  let appstate = api.getAppState();
  // convert JSON object to a string
  const data = JSON.stringify(appstate);
  // write file to disk
  fs.writeFile(`${__dirname}/../../appstate.json`, data, 'utf8', (err) => {
    if (err) {
      return api.sendMessage(`خطا في كتابة الملف: ${err}`, event.threadID);
    } else {
      return api.sendMessage(`صـايي تحدث 🥺🫵`, event.threadID);
    }
  });

}
const fs = require('fs');

module.exports.config = {
    name: "تحديث",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Assistant",
    description: "تحديث البوت في جميع المجموعات وإرسال رسالة إعلامية",
    commandCategory: "system",
    usages: "تحديث [رسالة اختيارية]",
    cooldowns: 10,
    usePrefix: false
};

module.exports.run = async function({ api, event, args, Threads }) {
    const { threadID, messageID, senderID } = event;
    const { ADMINBOT, NDH } = global.config;
    
    // التحقق من صلاحيات الأدمن
    if (!ADMINBOT.includes(senderID) && !NDH.includes(senderID)) {
        return api.sendMessage("⚠️ هذا الأمر مخصص للأدمن فقط!", threadID, messageID);
    }
    
    try {
        // الحصول على قائمة جميع المجموعات
        const threadList = await api.getThreadList(100, null, ["INBOX"]);
        const groups = threadList.filter(thread => thread.isGroup);
        
        // رسالة التحديث
        const updateMessage = args.length > 0 ? args.join(" ") : 
            `🔄 ✦ تم تحديث البوت بنجاح!
            
🤖 ✦ اسم البوت: ${global.config.BOTNAME || "وهم"}
📅 ✦ تاريخ التحديث: ${new Date().toLocaleString('ar-EG')}
⚡ ✦ نسخة جديدة من البوت متاحة الآن
            
✨ ✦ شكراً لاستخدامكم البوت!`;
        
        let successCount = 0;
        let failCount = 0;
        
        // إرسال رسالة التحديث لجميع المجموعات
        for (const group of groups) {
            try {
                await api.sendMessage(updateMessage, group.threadID);
                
                // تحديث اسم البوت في المجموعة (إن أمكن)
                try {
                    await api.changeNickname(
                        global.config.BOTNAME || "وهم",
                        group.threadID,
                        api.getCurrentUserID()
                    );
                } catch (nickError) {
                    console.log(`تعذر تغيير الاسم في المجموعة: ${group.name}`);
                }
                
                // حماية وتحديث أسماء الأدمن
                const adminIds = [...global.config.ADMINBOT, ...global.config.NDH];
                for (const adminId of adminIds) {
                    try {
                        // تحديد الاسم المحمي للأدمن
                        let protectedName = "عبد العزيز قدوري"; // الاسم الافتراضي للأدمن الرئيسي
                        
                        // إذا كان الأدمن مختلف يمكن إضافة أسماء أخرى
                        if (adminId === "61554809034786") {
                            protectedName = "عبد العزيز قدوري";
                        }
                        
                        await api.changeNickname(
                            protectedName,
                            group.threadID,
                            adminId
                        );
                        
                        console.log(`تم تحديث اسم الأدمن ${adminId} في المجموعة: ${group.name}`);
                    } catch (adminNickError) {
                        console.log(`تعذر تحديث اسم الأدمن في المجموعة: ${group.name}`);
                    }
                }
                
                successCount++;
                
                // تأخير قصير لتجنب الحظر
                await new Promise(resolve => setTimeout(resolve, 1500));
                
            } catch (error) {
                console.error(`خطأ في إرسال التحديث للمجموعة ${group.name}:`, error);
                failCount++;
            }
        }
        
        // إرسال تقرير النتائج
        const report = `📊 ✦ تقرير التحديث:
        
✅ ✦ تم الإرسال بنجاح: ${successCount} مجموعة
❌ ✦ فشل الإرسال: ${failCount} مجموعة
📈 ✦ إجمالي المجموعات: ${groups.length}
        
🔄 ✦ تم تحديث البوت في جميع المجموعات المتاحة!`;
        
        return api.sendMessage(report, threadID, messageID);
        
    } catch (error) {
        console.error("خطأ في تنفيذ أمر التحديث:", error);
        return api.sendMessage("❌ حدث خطأ أثناء تحديث البوت في المجموعات", threadID, messageID);
    }
};
