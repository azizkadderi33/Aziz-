module.exports.config = {
name: "اطردني",
version: "1.0.0",
hasPermssion: 0,
credits: "D-Jukie",
description: "يطردك من المجموعة",
commandCategory: "𝔾ℝ𝕆𝕌ℙ",
usages: "  اذا انت ادمن ومتريد الامر يشتغل ببساطه نزل البوت من الادمن",
cooldowns: 3
}; 

module.exports.run = async function({ api, event, args }) {
var info = await api.getThreadInfo(event.threadID);
if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage('لازم نڪون ادمن تناكت (•﹏•) ', event.threadID, event.messageID);
var threadInfo = await api.getThreadInfo(event.threadID)
    {
    
   api.removeUserFromGroup(event.senderID, event.threadID)
    }
api.sendMessage(`تم ايا نك سوتك لبࢪ`, event.threadID);
}