const fs = require("fs");
const path = require("path");
const { slashCommands } = require("../JS/commands");

function slashLoader() {
    const prefixFolders1Path = path.join(__dirname, "../commands/slash");
    fs.readdirSync(prefixFolders1Path).forEach((folder) => {
        const prefixFolders2Path = path.join(prefixFolders1Path, folder);
        fs.readdirSync(prefixFolders2Path)
            .filter(file => file.endsWith(".js"))
            .forEach((file) => {
                const filePath = path.join(prefixFolders2Path, file);
                const command = require(filePath);
                if (command.data.name && command.execute && command.data) {
                    slashCommands.set(command.data.name, command);
                } else {
                    console.log(
                        `Error loading command ${file}: data or name or execute function is missing.`
                    );
                }
            });
    })
}
module.exports = slashLoader;