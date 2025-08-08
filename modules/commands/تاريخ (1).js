module.exports.config = {
	name: "تاريخ",
	version: "0.0.3",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "صور شخصيه كانا",
	commandCategory: "ℙℍ𝕆𝕋𝕆",
	usages: "كانا",
	cooldowns: 600
};

module.exports.run = async function({ api, event, args, Threads }) { 
  const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
  const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Baghdad").format("D/MM/YYYY || HH:mm:ss");
    var thu = moment.tz('Asia/Baghdad').format('dddd');
  if (thu == 'Sunday') thu = 'الاحد'
  if (thu == 'Monday') thu = 'الاثنين'
  if (thu == 'Tuesday') thu = 'الثلاثاء'
  if (thu == 'Wednesday') thu = 'الاربعاء'
  if (thu == "Thursday") thu = 'الخميس'
  if (thu == 'Friday') thu = 'الجمعه'
  if (thu == 'Saturday') thu = 'السبت'
const res = await axios.get("https://apikanna.ngochan6666.repl.co");
//lấy data trên web api
const data = res.data.data;
//tải ảnh xuống
let download = (await axios.get(data, {
			responseType: "stream"
		})).data;
	try {
		var all = (await Threads.getInfo(event.threadID)).participantIDs;
    all.splice(all.indexOf(api.getCurrentUserID()), 1);
	  all.splice(all.indexOf(event.senderID), 1);
		var body = (args.length != 0) ? args.join(" ") : " ", mentions = [], index = 0;
		
    for (let i = 0; i < all.length; i++) {
		    if (i == body.length) body += body.charAt(body.length );
		    mentions.push({
		  	  tag: body,
		  	  id: all[i],
		  	  fromIndex: i 
		    });
	    }

		return api.sendMessage({ body: `[⚜️]تاريخ اليوم هو : ${thu} || ${gio}\n\n${body}`, attachment: download, mentions }, event.threadID, event.messageID);

	}
	catch (e) { return console.log(e); }
}
