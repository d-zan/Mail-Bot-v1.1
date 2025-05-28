/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio
*/
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();
const chalk = require("chalk");
const fs = require("node:fs");
const path = require("node:path");
module.exports = {
  name: "ready",
  once: false,
  async execute(client) {
    const commands = [];
    const commandsPath = path.join(__dirname, "../../commands/slash");
    fs.readdirSync(commandsPath).forEach((folder) => {
      const filesPath = path.join(commandsPath, folder);
      fs.readdirSync(filesPath)
        .filter((file) => file.endsWith(".js"))
        .forEach((file) => {
          const filePath = path.join(filesPath, file);
          const command = require(filePath);
          if (command.data) {
            commands.push(command.data);
          }
        });
    });

    const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

    try {
      await rest.put(
        Routes.applicationCommands(client.user.id),
        {
          body: commands,
        }
      );
      console.log(chalk.yellow.bold("Successfully registered slash command."));
    } catch (error) {
      console.error(error);
    }
  },
};

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
