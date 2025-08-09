module.exports.config = {
  name: "هلب",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "『 العـمـل الأسـطـوري ╰⊱ عـبـد الـعـزيـز ⊱╯』",
  description: "『 📜 قـائـمـة أوامـر الـبـوت ╰⊱ تـانـجـيـرو ⊱╯』",
  commandCategory: "『 ⚔ خـدمـات ╰⊱ تـانـجـيـرو ⊱╯』",
  usages: "⫷ ⚡ [ دليـل الإستخـدام ] ⚡ ⫸",
  cooldowns: 1,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 300
  }
};

module.exports.languages = {
  "en": {
    "moduleInfo": `
╔═══❖•ೋ° °ೋ•❖═══╗
   『 ⚔ %1 ⚔ 』
❖ 📝 الوصف: %2
❖ 💡 الاستعمال: %3
❖ 🗂 التصنيف: %4
❖ ⏳ التوقيت: %5 ثواني
❖ 👑 الصلاحية: %6
❖ 🛠 المطور: %7
╚═══❖•ೋ° °ೋ•❖═══╝`,
    "helpList": `
╔═⟪『 ⚡ تـانـجـيـرو ⚡ 』⟫═╗
✦ 🔥 يوجد %1 أمـر فـي البـوت.
✦ 📜 استخدم: 「 %2هلب اسم_الأمر 」لمعرفة التفاصيل.
╚═════════════════╝`,
    "user": "✦ 🌍 الكـل ✦",
    "adminGroup": "✦ 🛡 مسؤل القـروب ✦",
    "adminBot": "✦ 👑 مـطـور الـبـوت ✦"
  }
};

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || !body.startsWith("اوامر")) return;
  const splitBody = body.trim().split(/\s+/);
  if (splitBody.length === 1 || !commands.has(splitBody[1].toLowerCase())) return;

  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = threadSetting.PREFIX || global.config.PREFIX;

  return api.sendMessage(
    getText(
      "moduleInfo",
      command.config.name,
      command.config.description,
      `${prefix}${command.config.name} ${(command.config.usages || "")}`,
      command.config.commandCategory,
      command.config.cooldowns,
      (command.config.hasPermssion == 0) ? getText("user") :
      (command.config.hasPermssion == 1) ? getText("adminGroup") :
      getText("adminBot"),
      command.config.credits
    ),
    threadID,
    messageID
  );
};

module.exports.run = async function ({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = threadSetting.PREFIX || global.config.PREFIX;

  if (!command) {
    const allCommands = Array.from(commands.keys()).sort();
    const page = parseInt(args[0]) || 1;
    const itemsPerPage = 20;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedCommands = allCommands.slice(start, end);

    let msg = `
╔═══『 ⚔ قـائـمـة أوامـر ⚡ تـانـجـيـرو ⚔ 』═══╗\n`;

    paginatedCommands.forEach((cmd, index) => {
      msg += `✧ ${start + index + 1}. ⟪ ${prefix}${cmd} ⟫\n`;
    });

    msg += `
╚═══════ ⊹✧⊹ ═══════╝
↯ 📄 الصفحة (${page}/${Math.ceil(allCommands.length / itemsPerPage)})
↯ 📌 استخدم: ${prefix}هلب [اسم الأمر] لمزيد من المعلومات.`;

    return api.sendMessage(msg, threadID, async (error, info) => {
      if (autoUnsend) {
        await new Promise(resolve => setTimeout(resolve, delayUnsend * 1000));
        return api.unsendMessage(info.messageID);
      }
    }, messageID);
  }

  return api.sendMessage(
    getText(
      "moduleInfo",
      command.config.name,
      command.config.description,
      `${prefix}${command.config.name} ${(command.config.usages || "")}`,
      command.config.commandCategory,
      command.config.cooldowns,
      (command.config.hasPermssion == 0) ? getText("user") :
      (command.config.hasPermssion == 1) ? getText("adminGroup") :
      getText("adminBot"),
      command.config.credits
    ),
    threadID,
    messageID
  );
};