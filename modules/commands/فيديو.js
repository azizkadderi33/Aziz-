module.exports.config = {
    name: "فاك",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "aziz",
    description: "War In Chatbox",
    commandCategory: "wargroup",
    usages: "[fyter]",
    cooldowns: 7,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
}

module.exports.run = async function({ api, args, Users, event}) {
    var mention = Object.keys(event.mentions)[0];

    if (!mention) {
        return api.sendMessage("   طاغي لي حاب تنيكو🗿💘!", event.threadID);
    }

    let name = event.mentions[mention];
    var arraytag = [];
    arraytag.push({id: mention});
    var a = function (msg) { api.sendMessage(msg, event.threadID); }

    a("");
    setTimeout(() => {a({body: "ريكو جا يا عطايين"})}, 1000);
    setTimeout(() => {a({body: "ريكو جا ينيكلك يماك"})}, 2000);
    setTimeout(() => {a({body: "جميع نقش ولقحبة يدكم في زب عزيز"})}, 3000);
    setTimeout(() => {a({body: "ويبقى عزيز شيكوركم حلمكم. تلحسو زبو"})}, 4000);
    setTimeout(() => {a({body: "نكسوتعمو جميع نقش هنا"})}, 5000);
    setTimeout(() => {a({body: "مكعبات"})}, 6000);
    setTimeout(() => {a({body: "نقوشا"})}, 7000);
    setTimeout(() => {a({body: "قحاب"})}, 8000);
    setTimeout(() => {a({body: "معمر اشكال كي زبيش"})}, 9000);
    setTimeout(() => {a({body: "تبقاو حياتكم كل عطايين تموتو على زب"})}, 10000);
    setTimeout(() => {a({body: "كلاب مواقع"})}, 12000);
    setTimeout(() => {a({body: "😹🖕🏻🙎🏻‍♀️حلمكم نقيموكم"})}, 14000);
    setTimeout(() => {a({body: "مهم نا تعبت منزيدش نطيح"})}, 16000);
    setTimeout(() => {a({body: "مهم عزيز ميساج ذا مهوش عليك"})}, 18000);
    setTimeout(() => {a({body: "سامي ثاني مشي عليك"})}, 20000);
    setTimeout(() => {a({body: "معاذ مشي عليك"})}, 22000);
    setTimeout(() => {a({body: "حسن مشي عليك"})}, 25000);
    setTimeout(() => {a({body: "رامي مش عليك"})}, 27000);
    setTimeout(() => {a({body: "ني نحكي علي لكلاب لي يعرفو رواحهم🙆🏻‍♀️"})}, 30000);
    setTimeout(() => {a({body: "مهم نكمو لي يزيد ينبح على زبنا"})}, 36000);
    setTimeout(() => {a({body: "مهم مراحش نزيد نطيح تهلاو"})}, 38000);
    setTimeout(() => {a({body: "ههه منيتكم صدقتو جاري اعادة تشغيل امر تشريد"})}, 40000);
    setTimeout(() => {a({body: "نضحك برك"})}, 43000);
    setTimeout(() => {a({body: "مهم كنا نقصرو معاكم😹🥺🙆🏻‍♀️"})}, 46000);
    setTimeout(() => {a({body: "نحبكم🥺🙆🏻‍♀️"})}, 48000);
    setTimeout(() => {a({body: "😂😂"})}, 49900);
    setTimeout(() => {a({body: "تهلاو"})}, 50500);
    setTimeout(() => {a({body: "باي باي😹🙆🏻‍♀️🙋🏻‍♀️"})}, 51000);
}