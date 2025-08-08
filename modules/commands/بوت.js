const fs = require("fs");
module.exports.config = {
	name: "بوت",
    version: "1.0.0",
	hasPermssion: 0,
	credits: "FOYSAL HOSEN", 
	description: "فقط رد",
	commandCategory: "النظام",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	let react = event.body.toLowerCase();
	if(react.includes("بوت") ||
     react.includes("بوت") || 
react.includes("Bot") || 
react.includes("bot") || 
react.includes("bott") || 
react.includes("বট") ||
react.includes("রোবট")) {
		var msg = {
				body: "❤️أهلا أنا إسمي ميدوريا البوت !!",
				attachment: fs.createReadStream(__dirname + `/cache/Hinata.jpg`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😍", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
