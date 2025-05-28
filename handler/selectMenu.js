const fs = require("fs");
const path = require("path");
const client = require("../JS/client");

function SMloader() {
  const eventsFolders1Path = path.join(__dirname, "../events");
  fs.readdirSync(eventsFolders1Path).forEach((folder) => {
    const eventsFolders2Path = path.join(eventsFolders1Path, folder);
    fs.readdirSync(eventsFolders2Path)
      .filter((file) => file.endsWith(".js"))
      .forEach((file) => {
        const filePath = path.join(eventsFolders2Path, file);
        const event = require(filePath);
        if (event.isSM) {
          client.on("interactionCreate", async (interaction) => {
            if (!interaction.isSelectMenu()) return;
            if (!event.customId) return console.log(`Error: [NO_CUSTOM_ID] ${file}`);
            if (interaction.customId === event.customId) {
              const value = interaction.values[0];
              try {
               await event.execute(interaction,value);
              } catch (error) {
                console.log(`Error: [EXECUTE_SELECT_MENU] customId:${event.customId}: ` + error);
              }
            }
          });
        }
      });
  });
}
module.exports = SMloader;
