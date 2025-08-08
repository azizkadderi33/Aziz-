
module.exports.config = {
    name: "clearcommands",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Admin",
    description: "حذف جميع ملفات الأوامر من مجلد commands",
    commandCategory: "Admin",
    usages: "clearcommands",
    cooldowns: 5,
    dependencies: {}
};

module.exports.run = async function({ api, event, args }) {
    const fs = require('fs-extra');
    const path = require('path');
    
    const { threadID, messageID, senderID } = event;
    
    // التحقق من أن المستخدم هو أدمن
    if (!global.config.ADMINBOT.includes(senderID)) {
        return api.sendMessage("❌ ليس لديك صلاحية لاستخدام هذا الأمر!", threadID, messageID);
    }
    
    try {
        const commandsPath = path.join(__dirname, './');
        
        // قراءة جميع الملفات في مجلد commands
        const files = await fs.readdir(commandsPath);
        
        // فلترة الملفات لحذف ملفات .js فقط (ما عدا هذا الملف)
        const jsFiles = files.filter(file => 
            file.endsWith('.js') && 
            file !== 'clearcommands.js' &&
            !file.startsWith('.')
        );
        
        if (jsFiles.length === 0) {
            return api.sendMessage("🤷‍♂️ لا توجد ملفات أوامر للحذف!", threadID, messageID);
        }
        
        // رسالة تأكيد
        const confirmMsg = `⚠️ هل أنت متأكد من حذف ${jsFiles.length} ملف أمر؟\n\n📝 الملفات التي سيتم حذفها:\n${jsFiles.slice(0, 10).join(', ')}${jsFiles.length > 10 ? `\n... و ${jsFiles.length - 10} ملف آخر` : ''}\n\n✅ رد بـ "نعم" للتأكيد\n❌ رد بـ "لا" للإلغاء`;
        
        return api.sendMessage(confirmMsg, threadID, (error, info) => {
            if (error) return;
            
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: senderID,
                files: jsFiles,
                commandsPath: commandsPath
            });
        }, messageID);
        
    } catch (error) {
        console.error(error);
        return api.sendMessage(`❌ حدث خطأ: ${error.message}`, threadID, messageID);
    }
};

module.exports.handleReply = async function({ api, event, handleReply }) {
    const { threadID, messageID, senderID, body } = event;
    
    if (senderID !== handleReply.author) return;
    
    try {
        const response = body.toLowerCase().trim();
        
        if (response === "نعم" || response === "yes") {
            let deletedCount = 0;
            let failedFiles = [];
            
            // حذف الملفات واحد تلو الآخر
            for (const file of handleReply.files) {
                try {
                    const filePath = path.join(handleReply.commandsPath, file);
                    await fs.unlink(filePath);
                    
                    // إزالة الأمر من الذاكرة إذا كان محمل
                    const commandName = file.replace('.js', '');
                    if (global.client.commands.has(commandName)) {
                        global.client.commands.delete(commandName);
                    }
                    
                    deletedCount++;
                } catch (err) {
                    failedFiles.push(file);
                    console.error(`Failed to delete ${file}:`, err);
                }
            }
            
            let resultMsg = `✅ تم حذف ${deletedCount} ملف أمر بنجاح!`;
            
            if (failedFiles.length > 0) {
                resultMsg += `\n\n❌ فشل في حذف ${failedFiles.length} ملف:\n${failedFiles.join(', ')}`;
            }
            
            resultMsg += "\n\n🔄 يُنصح بإعادة تشغيل البوت لتطبيق التغييرات بشكل كامل.";
            
            api.sendMessage(resultMsg, threadID, messageID);
            
        } else if (response === "لا" || response === "no") {
            api.sendMessage("❌ تم إلغاء عملية الحذف.", threadID, messageID);
        } else {
            api.sendMessage("⚠️ يرجى الرد بـ 'نعم' أو 'لا' فقط.", threadID, messageID);
            return;
        }
        
        // إزالة handleReply
        const index = global.client.handleReply.findIndex(reply => reply.messageID === handleReply.messageID);
        if (index !== -1) {
            global.client.handleReply.splice(index, 1);
        }
        
    } catch (error) {
        console.error(error);
        api.sendMessage(`❌ حدث خطأ: ${error.message}`, threadID, messageID);
    }
};
