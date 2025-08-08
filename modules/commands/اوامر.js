module.exports.config = {
  name: "help",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "عزيز",
  description: "قائمة الأوامر مع الخدمة تاع كل واحد",
  commandCategory: "النِظَام",
  usages: "[اسم الأمر]",
  cooldowns: 2,
};

module.exports.run = function({ api, event, args }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;

  const prefix = global.config.PREFIX || "!";

  if (!args[0]) {
    // قائمة الأوامر الكاملة
    let msg = `
╭───────⭓ 『 𝓜𝓘𝓚𝓐𝓢𝓐 』 ⭓───────╮
┃ ⚡️ الـقـائـمـة الـكـامـلـة للأوامـر ⚡️
┃ مطـوّر الـبـوت: عزيز — عمّك وعمّ الكل
╰──────────────╯\n\n`;

    let i = 1;
    for (let [name, cmd] of commands) {
      const desc = cmd.config.description || "↯ مافيهاش شرح";
      msg += `『 ${i++} 』✦ ${prefix}${name}\n⇨ ${desc}\n━━━━━━━━━━━━━━\n`;
    }

    msg += `\n⌯ تستعمل: ${prefix}help [اسم الأمر] تعرف الخدمة تاوعو`;
    return api.sendMessage(msg, threadID, messageID);
  }

  // وصف أمر معيّن
  const name = args[0].toLowerCase();
  const command = commands.get(name);

  if (!command) return api.sendMessage("❌ هاد الأمر ما تعرفوش ميكاسا.", threadID, messageID);

  return api.sendMessage(
    `╭── ⭓『 معلومات الأمر 』⭓ ──╮\n` +
    `✦ الاسم: ${command.config.name}\n` +
    `✦ الشرح: ${command.config.description || "↯ ما فيهاش شرح"}\n` +
    `✦ الصنف: ${command.config.commandCategory || "غير مصنف"}\n` +
    `✦ يستعمل بـ: ${prefix}${command.config.name} ${command.config.usages || ""}\n` +
    `✦ مطوّر هاد الأمر: عزيز — عمّك وعمّ الكل\n` +
    `╰────────────╯`,
    threadID,
    messageID
  );
};