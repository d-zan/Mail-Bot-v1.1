
const chalk = require("chalk");

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const { bot } = require("../JSON/config");
require('dotenv').config();
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        console.log(chalk.green.bold(` log in ✅ ${client.user.tag}`))

        setInterval(() => {
            const activity = bot.status[Math.floor(Math.random() * bot.status.length)];
            client.user.setStatus('dnd');  
            client.user.setActivity(activity,'PLAYING',);
          }, bot.timestamp);
	},
};

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/