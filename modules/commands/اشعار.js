const fs = require('fs');
const request = require('request');

module.exports.config = {
    name: "إشعار",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Allou",
    description: "",
    commandCategory: "𝔻𝔼𝕍𝔼𝕃𝕆ℙ𝔼ℝ",
    usages: "[الرسالة]",
    cooldowns: 5,
}

let atmDir = [];

const getAtm = (atm, body) => new Promise(async (resolve) => {
    let msg = {}, attachment = [];
    msg.body = body;
    for(let eachAtm of atm) {
        await new Promise(async (resolve) => {
            try {
                let response =  await request.get(eachAtm.url),
                    pathName = response.uri.pathname,
                    ext = pathName.substring(pathName.lastIndexOf(".") + 1),
                    path = __dirname + `/cache/${eachAtm.filename}.${ext}`
                response
                    .pipe(fs.createWriteStream(path))
                    .on("close", () => {
                        attachment.push(fs.createReadStream(path));
                        atmDir.push(path);
                        resolve();
                    })
            } catch(e) { console.log(e); }
        })
    }
    msg.attachment = attachment;
    resolve(msg);
})

module.exports.handleReply = async function ({ api, event, handleReply, Users, Threads }) {
    const { threadID, messageID, senderID, body } = event;
    let name = await Users.getNameUser(senderID);
    switch (handleReply.type) {
        case "sendnoti": {
            let text = `[رسالة من أدمن البوت] : ${body}\n\nمن ${name}  [مجموعة] ${(await Threads.getInfo(threadID)).threadName || "Unknow"}`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `[رسالة من أدمن البوت] : ${body}\n\nمن ${name} [مجموعة] ${(await Threads.getInfo(threadID)).threadName || "Unknow"}`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "reply",
                    messageID: info.messageID,
                    messID: messageID,
                    threadID
                })
            });
            break;
        }
        case "reply": {
            let text = `[رسالة من المطور] : ${body}\n\nمن ${name} \nا [حاب تقولو حاجةة  أكتب رد على هدا لمساج توصل ليه]`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `${body}\n\n [من قبل] ${name} مع وي عينيا!\n[رد على هذه الرسالة وسيصل الرد للمطور]`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "sendnoti",
                    messageID: info.messageID,
                    threadID
                })
            }, handleReply.messID);
            break;
        }
    }
}

module.exports.run = async function ({ api, event, args, Users }) {
    const { threadID, messageID, senderID, messageReply } = event;
    if (!args[0]) return api.sendMessage("طـو دࢪو", threadID);
    let allThread = global.data.allThreadID || [];
    let can = 0, canNot = 0;
    let text = `[إشــعاࢪ هـام 🥹‼️] : ${args.join(" ")}\n\n [من عـند] ${await Users.getNameUser(senderID)} \n[ࢪد على هذا لمساج باش يـࢪدلك لمطوࢪ خليل🌿💋 ]`;
    if(event.type == "message_reply") text = await getAtm(messageReply.attachments, `[إشـــعاࢪ هـام 🥹‼️] : ${args.join(" ")}\n\n[من عـند] ${await Users.getNameUser(senderID)}\n[ ࢪد على هذا لمساج باش يـࢪدلك لمطوࢪ خليل🌿💋 ]`);
    await new Promise(resolve => {
        allThread.forEach((each) => {
            try {
                api.sendMessage(text, each, (err, info) => {
                    if(err) { canNot++; }
                    else {
                        can++;
                        atmDir.forEach(each => fs.unlinkSync(each))
                        atmDir = [];
                        global.client.handleReply.push({
                            name: this.config.name,
                            type: "sendnoti",
                            messageID: info.messageID,
                            messID: messageID,
                            threadID
                        })
                        resolve();
                    }
                })
            } catch(e) { console.log(e) }
        })
    })
    api.sendMessage(`وصل إلى ${can} تعذر على  ${canNot} مجموعة`, threadID);
                }