module.exports.config = {
  name: "الاوامر",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "أنس - تعديل زخرفة بواسطة ChatGPT",
  description: "قائمة الأوامر الكاملة",
  commandCategory: "⚙️ نظام",
  usages: "[اسم الأمر]",
  cooldowns: 5,
  envConfig: {
    autoUnsend: false,
    delayUnsend: 20
  }
};

module.exports.languages = {
  "en": {
    "moduleInfo": "『 %1 』\n%2\n\n⚙️ الاستخدام: %3\n🗂️ التصنيف: %4\n⏱️ الانتظار: %5 ثانية\n🔐 الصلاحيات: %6\n\n✨ كود بواسطة: %7 ✨",
    "helpList": "[ تحتوي البوتة على %1 أمرًا. اكتب: \"%2help اسم_الأمر\" لمعرفة طريقة الاستعمال. ]",
    "user": "مستخدم عادي",
    "adminGroup": "أدمن المجموعة",
    "adminBot": "أدمن البوت"
  }
};

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;
  if (!body || typeof body != "string" || !body.toLowerCase().startsWith("help")) return;

  const args = body.slice(4).trim().split(/\s+/);
  if (!args[0] || !commands.has(args[0].toLowerCase())) return;

  const command = commands.get(args[0].toLowerCase());
  const prefix = global.config.PREFIX;
  return api.sendMessage(
    getText("moduleInfo", command.config.name, command.config.description,
      `${prefix}${command.config.name} ${(command.config.usages) || ""}`,
      command.config.commandCategory, command.config.cooldowns,
      command.config.hasPermssion == 0 ? getText("user") : (command.config.hasPermssion == 1 ? getText("adminGroup") : getText("adminBot")),
      command.config.credits),
    threadID, messageID);
};

module.exports.run = function ({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());

  if (!command) {
    const listCommands = Array.from(commands.values());
    let msg = "╔═══════『 ⚔️ بوتـة مـيـكـاسـا ⚔️ 』═══════╗\n\n";
    listCommands.sort((a, b) => a.config.name.localeCompare(b.config.name));

    let count = 1;
    for (let cmd of listCommands) {
      msg += `『${count++}』🧩 ${cmd.config.name.toUpperCase()}\n📌 ${cmd.config.description}\n──────────────────────\n`;
    }

    msg += `\n╚══════════════════════════╝\n💡 للشرح: اكتب "help اسم_الأمر"\n🔢 عدد الأوامر: ${listCommands.length}`;
    return api.sendMessage(msg, threadID, messageID);
  }

  const prefix = global.config.PREFIX;
  return api.sendMessage(
    getText("moduleInfo", command.config.name, command.config.description,
      `${prefix}${command.config.name} ${(command.config.usages) || ""}`,
      command.config.commandCategory, command.config.cooldowns,
      command.config.hasPermssion == 0 ? getText("user") : (command.config.hasPermssion == 1 ? getText("adminGroup") : getText("adminBot")),
      command.config.credits),
    threadID, messageID);
};