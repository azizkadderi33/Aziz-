const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "goibot",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "Mod by John Lester, updated by Grok, dz responses by ChatGPT",
  description: "goibot",
  commandCategory: "𝕊𝔸𝕐",
  usages: "noprefix",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event, args, Threads, Users }) {
  var { threadID, messageID, body } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Africa/Algiers").format("HH:mm:ss");
  var id = event.senderID;
  var name = await Users.getNameUser(id);
  if (!body) return;

  // الكلمات الشائعة + ردودها
  const keywordResponses = [
    { keyword: "اهلا", response: "ميكاسا كي راك؟ 🙂" },
    { keyword: "سلام", response: "سلام خويا، ميكاسا ترحب بيك! 🫡" },
    { keyword: "تعبان", response: "خويا روح ريّح، صحتك أهم! 🛌" },
    { keyword: "المطور", response: "عزيز عمّك وعم الكل! ماشي ساهل هو! 🔥" },
    { keyword: "وينك", response: "راني هنا نراقب من بعيد 👀" },
    { keyword: "ضحكني", response: "علاش الفيل ما يديرش لايك؟ خاطيه الفأر! 🐘😂" },
    { keyword: "نحبك", response: "و أنا نحبك بزاف بزاف! ❤️" },
    { keyword: "قلبي", response: "قلبك كبير بزاف، وزاد كي ذكرتني! 💖" },
    { keyword: "برد", response: "روح دفي، أنا نجي مع لحاف! ❄️🧣" },
    { keyword: "نعسان", response: "روح نعس، أنا نحرسك فالحلم! 😴" },
    { keyword: "جوعان", response: "تاكل نمي!🙂" },
    { keyword: "ميكاسا", response: "نعم نعم؟ أنا هنا! ⚔️" },
    { keyword: "بوتة", response: "أنا بوتة ميكاسا، شكون نقرط؟ 🤖" }
  ];

  // ردود عامة تتغير كل مرة (فيها إيموجيات وزهوان)
  const funReplies = [
    "وش داير يا عيني؟ 😎",
    "كي العادة، لابس عليا! وإنت؟ 👀",
    "ياخي راك تحب ميكاسا، ماشي ساهلة! 🥰",
    "آه خويا.. اليوم حسيت بالملل! 😩",
    "زعما نغني ولا نرقص؟ 🕺",
    "شكون حب يتزوج ميكاسا؟ لازم دوزيان سلك 😅",
    "ياخي قالك: بوتة وفهمت كلش! 🤓",
    "آه يا الزين! طلعتلي مورال! 😍",
    "ميكاسا: البطلة ديال هاذ القروب! 🦸‍♀️",
    "ضحكت حتى طاحتلي السماعة! 🎧😂"
  ];

  // تحقق من الكلمات المفتاحية
  for (let item of keywordResponses) {
    if (body.toLowerCase().includes(item.keyword.toLowerCase())) {
      return api.sendMessage(item.response, threadID, messageID);
    }
  }

  // ردود عامة إذا نادت "ميكاسا" أو "بوتة"
  if (body.toLowerCase().startsWith("ميكاسا") || body.toLowerCase().startsWith("بوتة")) {
    let rand = funReplies[Math.floor(Math.random() * funReplies.length)];
    return api.sendMessage(rand, threadID, messageID);
  }
};

module.exports.run = function () { };