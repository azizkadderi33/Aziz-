const fs = require('fs-extra');
const path = require('path');
const pathData = path.join(__dirname, '../commands/cache/antiemoji.json');

module.exports.config = {
    name: "antiemoji",
    eventType: ["log:thread-icon"],
    version: "1.0.0",
    credits: "",
    description: "Ngăn chặn việc thay đổi emoji của nhóm",
};

module.exports.run = async function ({ event, api, Threads }) {
    const { threadID, logMessageData } = event;

    try {
        let antiData = await fs.readJSON(pathData);
        let threadEntry = antiData.find(entry => entry.threadID === threadID);
        if (!threadEntry) {
            api.sendMessage("『 ⚠️ 』➤ هذه المجموعة لم يتم تفعيل خاصية منع تغيير الإيموجي ❗", threadID);
            return;
        }

        const originalEmoji = threadEntry.emoji;
        const newEmoji = logMessageData.thread_icon;

        if (newEmoji !== originalEmoji) {
            api.sendMessage("『 ❌ 』➤ تم الكشف عن تغيير الإيموجي! ❗\n➥ جارٍ استرجاع الإيموجي الأصلي... 🔄", threadID);

            api.changeThreadEmoji(originalEmoji, threadID, (err) => {
                if (err) {
                    api.sendMessage("『 ⚠️ 』➤ فشل في استرجاع الإيموجي ❌\n➥ تأكد من صلاحيات البوت 🚫", threadID);
                } else {
                    api.sendMessage("『 ✅ 』➤ تم استرجاع الإيموجي الأصلي بنجاح! 🎉", threadID);
                }
            });
        }
    } catch (error) {
        api.sendMessage("『 💢 』➤ حدث خطأ أثناء المعالجة، يرجى المحاولة لاحقًا ❗", threadID);
    }
};