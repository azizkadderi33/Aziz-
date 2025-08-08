module.exports.config = {
	name: "uptime",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Kiểm tra thời gian bot đã online",
	commandCategory: "𝔻𝔼𝕍𝔼𝕃𝕆ℙ𝔼ℝ",
	cooldowns: 5,
	dependencies: {
		"pidusage": ""
	}
};

function byte2mb(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(bytes, 10) || 0;
	while (n >= 1024 && ++l) n = n / 1024;
	return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

module.exports.languages = {
	"vi": {
		"returnResult": "Bot đã hoạt động được %1 giờ %2 phút %3 giây.\n\n❯ Tổng người dùng: %4\n❯ Tổng Nhóm: %5\n❯ Cpu đang sử dụng: %6%\n❯ Ram đang sử dụng: %7\n❯ Ping: %8ms\n\n=== This bot was made by CatalizCS and SpermLord ==="
	},
	"en": {
		"العودة": "يعمل البوت لصالح %1 ساعة(s) %2 دقيقة(s) %3 ثانية(s).\n\n❯ Tإجمالي المستخدمين: %4\n❯ مجموع المواضيع: %5\n❯  CPU: %6%\n❯ RAM: %7\n❯ Ping: %8ms\n\n=== تم صنع هذا الروبوت بواسطة benzo ==="
	}
}

module.exports.run = async ({ api, event, getText }) => {
	const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);

	const pidusage = await global.nodemodule["pidusage"](process.pid);

	const timeStart = Date.now();
	return api.sendMessage("", event.threadID, () => api.sendMessage(getText("returnResult", hours, minutes, seconds, global.data.allUserID.length, global.data.allThreadID.length, pidusage.cpu.toFixed(1), byte2mb(pidusage.memory), Date.now() - timeStart), event.threadID, event.messageID));
}