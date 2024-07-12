const { REST } = require('@discordjs/rest');

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const { Routes } = require('discord-api-types/v9');

//const { clientId , guildId } = require('./config.json');

require('dotenv').config();

const chalk = require("chalk");

const fs = require('node:fs');

const path = require('node:path');
const { bot } = require('../JSON/config');


const commands = [];
const commandsPath = path.join(__dirname, '../commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data);
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
( async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(bot.Id, bot.guildId),
            { body: commands },
        );
        console.log(chalk.yellow.bold('Successfully registered slash command.'));
    } catch (error) {
        console.error(error);
    }
})();

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/