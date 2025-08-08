module.exports.config = {
    name: "بونوي",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "HTHB",
    description: "بدون علامه",
    commandCategory: "𝔼ℕ𝕁𝕆𝕐",
    usages: "",
    cooldowns: 0,
    denpendencies: {
        "fs": "",
        "request": ""
    }
};
module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "ngủ.gif")) request("https://i.pinimg.com/originals/0f/e1/16/0fe1161b019a6d11f39d267c284ec67d.gif").pipe(fs.createWriteStream(dirMaterial + "ngủ.gif"));
}
module.exports.handleEvent = async ({ event, api, Currencies,Users, args, utils, global, client }) => {
    const fs = require("fs");
    let name = await Users.getNameUser(event.senderID)
    var msg = {
                body: `عـينيا ${name} بـونوي غدوةة ان شاء الله 😿‼️تهلالي فترمتك`,
                attachment: fs.createReadStream(__dirname + `/noprefix/ngủ.gif`)
            }
    if (event.body.toLowerCase() == "نروح نرقد"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
    if (event.body.toLowerCase() == "باي"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
    if (event.body.toLowerCase() == "بونوي"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
    if (event.body.toLowerCase() == "تصبحو بخير"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
    if (event.body.toLowerCase() == "ملقات الخير"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
        };
module.exports.run = async ({ event, api, Currencies, args, utils }) => {
return api.sendMessage("تهلاو",event.threadID)
}