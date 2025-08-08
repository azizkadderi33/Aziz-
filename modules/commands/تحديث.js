module.exports.config = {
  name: "تحديث",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "𝐊𝐈𝐓𝐄 凧",
  description: "refresh appstate.json",
  commandCategory: "Admin",
  usages: "appstate",
  cooldowns: 5,
  dependencies: {
  }
};

module.exports.run = async function ({ api, event, args }) {
  const fs = require("fs-extra");
  const permission = [`593785946`,``];
  if (!permission.includes(event.senderID)) return api.sendMessage("متـقدࢪش  .\nفقط ❆『 خليل جلفاوي ➹ 』😻🌿", event.threadID, event.messageID);
  let appstate = api.getAppState();
  // convert JSON object to a string
  const data = JSON.stringify(appstate);
  // write file to disk
  fs.writeFile(`${__dirname}/../../appstate.json`, data, 'utf8', (err) => {
    if (err) {
      return api.sendMessage(`خطا في كتابة الملف: ${err}`, event.threadID);
    } else {
      return api.sendMessage(`صـايي تحدث 🥺🫵`, event.threadID);
    }
  });

}