const fs = require("fs");
const path = require("path");
const client = require("../JS/client");

function modalLoader() {
  const eventsFolders1Path = path.join(__dirname, "../events");
  fs.readdirSync(eventsFolders1Path).forEach((folder) => {
    const eventsFolders2Path = path.join(eventsFolders1Path, folder);
    fs.readdirSync(eventsFolders2Path)
      .filter((file) => file.endsWith(".js"))
      .forEach((file) => {
        const filePath = path.join(eventsFolders2Path, file);
        const event = require(filePath);
        if (event.isModal) {
          client.on("modalSubmit", async (modal) => {
            if (!event.customId) return console.log(`Error: [NO_CUSTOM_ID] ${file}`);
            if (modal.customId === event.customId) {
              try {
               await event.execute(modal);
              } catch (error) {
                console.log(`Error: [EXECUTE_MODAL] customId:${event.customId}: ` + error);
                
              }
            }
          });
        }
      });
  });
}
module.exports = modalLoader;
