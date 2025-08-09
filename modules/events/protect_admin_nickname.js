
module.exports.config = {
    name: "protect_admin_nickname",
    eventType: ["log:user-nickname"],
    version: "1.0.0",
    credits: "Assistant",
    description: "حماية أسماء الأدمن من التغيير"
};

module.exports.run = async function({ api, event }) {
    const { logMessageData, threadID, author } = event;
    const { ADMINBOT, NDH } = global.config;
    
    // دمج قوائم الأدمن
    const allAdmins = [...ADMINBOT, ...NDH];
    
    // التحقق من أن التغيير كان لأحد الأدمن
    const targetUserID = logMessageData.participant_id;
    
    if (!allAdmins.includes(targetUserID)) return;
    
    // التحقق من أن الشخص الذي غير الاسم ليس أدمن
    if (allAdmins.includes(author)) return;
    
    try {
        // تحديد الاسم المحمي للأدمن
        let protectedName = "عبد العزيز قدوري"; // الاسم الافتراضي
        
        // يمكن إضافة أسماء مخصصة لأدمن مختلفين
        if (targetUserID === "61554809034786") {
            protectedName = "عبد العزيز قدوري";
        }
        
        // إعادة تعيين الاسم المحمي
        await api.changeNickname(protectedName, threadID, targetUserID);
        
        // إرسال تنبيه
        const warningMessage = `⚠️ تم اكتشاف محاولة تغيير اسم الأدمن!
        
🛡️ تم استعادة الاسم المحمي تلقائياً
👑 الاسم المحمي: ${protectedName}
⚡ نظام الحماية نشط`;

        await api.sendMessage(warningMessage, threadID);
        
        console.log(`تم حماية اسم الأدمن ${targetUserID} في المجموعة ${threadID}`);
        
    } catch (error) {
        console.error("خطأ في حماية اسم الأدمن:", error);
    }
};
