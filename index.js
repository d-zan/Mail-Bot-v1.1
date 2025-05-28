
/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
//const { Collection } = require("discord.js");
require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
//const chalk = require("chalk");
const client = require("./JS/client.js");
const discordModals = require("discord-modals");
//Loaders
const slashLoader = require("./handler/slash.js");
const prefixLoader = require("./handler/prefix.js");
const SMloader = require("./handler/selectMenu.js");
const modalLoader = require("./handler/modal.js");
const buttonLoader = require("./handler/button.js");
const eventsLoader = require("./handler/events.js");
//const { bot } = require("./JS/config.js");
discordModals(client);
//client.commands = new Collection();

slashLoader();
prefixLoader();
SMloader();
modalLoader();
buttonLoader();
eventsLoader();


client.login(process.env.TOKEN);