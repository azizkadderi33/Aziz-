
const fs = require('fs');

module.exports.config = {
    name: "ايقاف_تشغيل",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Assistant",
    description: "إيقاف أو تشغيل البوت",
    commandCategory: "system",
    usages: "ايقاف/تشغيل",
    cooldowns: 3,
    usePrefix: false
};

module.exports.run = async function({ api, event, args }) {
    const { threadID, messageID, senderID } = event;
    const { ADMINBOT, NDH } = global.config;
    
    // التحقق من صلاحيات الأدمن
    if (!ADMINBOT.includes(senderID) && !NDH.includes(senderID)) {
        return api.sendMessage("⚠️ هذا الأمر مخصص للأدمن فقط!", threadID, messageID);
    }
    
    const command = event.body.toLowerCase().trim();
    const statusPath = './modules/commands/cache/bot_status.json';
    
    // إنشاء الملف إذا لم يكن موجوداً
    if (!fs.existsSync(statusPath)) {
        fs.writeFileSync(statusPath, JSON.stringify({ status: "active" }, null, 2));
    }
    
    let botStatus = JSON.parse(fs.readFileSync(statusPath));
    
    if (command === "ايقاف") {
        botStatus.status = "inactive";
        fs.writeFileSync(statusPath, JSON.stringify(botStatus, null, 2));
        return api.sendMessage("🔴 تم إيقاف البوت بنجاح!\n✅ البوت سيستجيب للأدمن فقط الآن", threadID, messageID);
    }
    
    if (command === "تشغيل") {
        botStatus.status = "active";
        fs.writeFileSync(statusPath, JSON.stringify(botStatus, null, 2));
        return api.sendMessage("🟢 تم تشغيل البوت بنجاح!\n✅ البوت يعمل بشكل طبيعي الآن", threadID, messageID);
    }
};
