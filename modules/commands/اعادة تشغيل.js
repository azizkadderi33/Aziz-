module.exports.config = {
	name: "restart",
	version: "1.0.0",
	hasPermssion: 1,
	credits: "manhIT",
	description: "Restart the Bot",
	commandCategory: "system",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
	const { threadID, messageID } = event;
	return api.sendMessage(`𝙍𝙀𝙎𝙏𝘼𝙍𝙏𝙄𝙉𝙂...\nIt takes a 30seconds to restart.`, threadID, () => process.exit(1));
}