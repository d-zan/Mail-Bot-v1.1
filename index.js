
/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const { Collection } = require("discord.js");
require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const chalk = require("chalk");
const client = require("./JSON/client.js");
const discordModals = require("discord-modals");
const { bot } = require("./JSON/config.js");
discordModals(client);
client.commands = new Collection();

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const handlerPath = path.join(__dirname, "handler");
const handlerFiles = fs
  .readdirSync(handlerPath)
  .filter((file) => file.endsWith(".js"));

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
//const handlerFolder = ['handler']
handlerFiles.forEach(() => {
  // const nestedFolderPath = path.join(subfolderPath, nestedFolder);
  fs.readdir(handlerPath, (err, files) => {
    if (err) {
      return console.error(`error : ${handlerPath}: ${err.message}`);
    }
    const jsFiles = files.filter((file) => path.extname(file) === ".js");
    jsFiles.forEach((file) => {
      const filePath = path.join(handlerPath, file);
      require(filePath);
    });
  });
});

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const actionFolderPath = path.join(__dirname, "action");
const subfolders = ["interaction", "message"];

subfolders.forEach((subfolder) => {
  const subfolderPath = path.join(actionFolderPath, subfolder);

  const nestedFolders = ["events","commands"];

  nestedFolders.forEach((nestedFolder) => {
    const nestedFolderPath = path.join(subfolderPath, nestedFolder);
    fs.readdir(nestedFolderPath, (err, files) => {
      if (err) {
        return console.error(`error : ${nestedFolderPath}: ${err.message}`);
      }
      const jsFiles = files.filter((file) => path.extname(file) === ".js");
      jsFiles.forEach((file) => {
        const filePath = path.join(nestedFolderPath, file);
        require(filePath);
      });
    });
  });
});





/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/


client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});






/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
//Bot event
client.login(process.env.TOKEN);