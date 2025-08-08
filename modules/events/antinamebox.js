const fs = require('fs-extra');
const path = require('path');
const pathData = path.join(__dirname, '../commands/cache/antinamebox.json');

module.exports.config = {
    name: "antinamebox",
    eventType: ["log:thread-name"],
    version: "1.0.0",
    credits: "",
    description: "Ngăn chặn việc thay đổi tên nhóm",
};

module.exports.run = async function ({ event, api, Threads }) {
    const { logMessageData, threadID } = event;

    try {
        let antiData = await fs.readJSON(pathData);
        let threadEntry = antiData.find(entry => entry.threadID === threadID);
        if (!threadEntry) return;
        if (logMessageData.name !== threadEntry.namebox) {
            api.sendMessage("『 ❌ 』➤ تم الكشف عن تغيير إسم المجموعة! 🕵️\n➥ جارٍ استرجاع الاسم الأصلي... 🔄", threadID);
            api.changeThreadTitle(threadEntry.namebox, threadID);
            api.sendMessage(`『 ✅ 』➤ تم استرجاع اسم المجموعة بنجاح! 🛡️\n➥ الاسم الحالي: 「 ${threadEntry.namebox} 」`, threadID);
        }
    } catch (error) {
        api.sendMessage("『 ⚠️ 』➤ حدث خطأ أثناء محاولة استرجاع اسم المجموعة ❌", threadID);
    }
};