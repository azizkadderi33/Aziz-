module.exports.config = {
  name: "ردتلقائي",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "Replit Assistant",
  description: "الرد التلقائي على جميع الرسائل",
  commandCategory: "النظام",
  usages: "تشغيل/ايقاف [النص]",
  cooldowns: 5
};

const fs = require('fs-extra');
const pathFile = __dirname + '/cache/autoreply.json';

if (!fs.existsSync(pathFile)) {
  fs.writeFileSync(pathFile, JSON.stringify({
    enabled: false,
    message: "شكراً لرسالتك! 🌟"
  }));
}

module.exports.handleEvent = async function({ api, event }) {
  if (event.type !== "message" && event.type !== "message_reply") return;
  
  const data = JSON.parse(fs.readFileSync(pathFile));
  if (data.enabled && event.senderID !== api.getCurrentUserID()) {
    api.sendMessage(data.message, event.threadID, event.messageID);
  }
};

module.exports.run = async function({ api, event, args }) {
  const data = JSON.parse(fs.readFileSync(pathFile));
  
  if (args[0] === "تشغيل") {
    data.enabled = true;
    if (args[1]) data.message = args.slice(1).join(" ");
    fs.writeFileSync(pathFile, JSON.stringify(data));
    api.sendMessage("✅ تم تفعيل الرد التلقائي\nالرسالة: " + data.message, event.threadID);
  }
  else if (args[0] === "ايقاف") {
    data.enabled = false;
    fs.writeFileSync(pathFile, JSON.stringify(data));
    api.sendMessage("⭕ تم إيقاف الرد التلقائي", event.threadID);
  }
  else {
    api.sendMessage("❓ الاستخدام:\nردتلقائي تشغيل [النص]\nردتلقائي ايقاف", event.threadID);
  }
};