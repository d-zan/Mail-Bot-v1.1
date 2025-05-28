const fs = require("fs");
const path = require("path");
const { prefixCommands } = require("../JS/commands");

function prefixLoader() {
    const prefixFolders1Path = path.join(__dirname, "../commands/prefix");
    fs.readdirSync(prefixFolders1Path).forEach((folder) => {
        const prefixFolders2Path = path.join(prefixFolders1Path, folder);
        fs.readdirSync(prefixFolders2Path)
            .filter(file => file.endsWith(".js"))
            .forEach((file) => {
                const filePath = path.join(prefixFolders2Path, file);
                const command = require(filePath);
                if (command.name && command.execute) {
                    prefixCommands.set(command.name, command);
                } else {
                    console.log(
                        `Error loading command ${file}: name or execute function is missing.`
                    );
                }
            });
    })
}
module.exports = prefixLoader;