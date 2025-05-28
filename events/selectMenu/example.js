const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");
const path = require("path");
const fs = require("fs");
const { bot } = require("../../JS/config");
let main = [];
let admin = [];
let public = [];
const path1 = path.join(__dirname, "../../commands");
fs.readdirSync(path1).forEach((mainfolder) => {
  const path2 = path.join(path1, mainfolder);
  fs.readdirSync(path2).forEach((folder) => {
    const path3 = path.join(path2, folder);
    fs.readdirSync(path3)
      .filter((file) => file.endsWith(".js"))
      .forEach((file) => {
        const filePath = path.join(path3, file);
        const command = require(filePath);
        if (command.data) {
          if (command.category === "Main") {
            main.push({
              name: "/" + command.data.name,
              description: command.data.description,
            });
          } else if (command.category === "Admin") {
            admin.push({
              name: "/" + command.data.name,
              description: command.data.description,
            });
          } else if (command.category === "Public") {
            public.push({
              name: "/" + command.data.name,
              description: command.data.description,
            });
          }
        } else if (command.name) {
          if (command.category === "Main") {
            main.push({
              name: bot.prefix + command.name,
              description: command.description,
            });
          } else if (command.category === "Admin") {
            admin.push({
              name: bot.prefix + command.name,
              description: command.description,
            });
          } else if (command.category === "Public") {
            public.push({
              name: bot.prefix + command.name,
              description: command.description,
            });
          }
        }
      });
  });
});
const mainCommand = main.map((data, index) => `${1 + index}- **${data.name}** => \`${data.description}\``).join("\n");
const adminCommand = admin.map((data, index) => `${1 + index}- **${data.name}** => \`${data.description}\``).join("\n");
const publicCommand = public.map((data, index) => `${1 + index}- **${data.name}** => \`${data.description}\``).join("\n");
/**
 * @type {import("../../elements/componentsElements").ComponentsElement}
 */
module.exports = {
  isSM: true,
  customId: "example",
  async execute(interaction, value) {
    if (!interaction.isSelectMenu()) return;
    const embed = new MessageEmbed()
      .setAuthor(
        interaction.user.tag,
        interaction.user.avatarURL({ dynamic: true })
      )
      .setColor(interaction.member.displayHexColor);
    if (value === "main") {
      embed.setDescription(mainCommand);
    } else if (value === "admin") {
      embed.setDescription(adminCommand);
    } else if (value === "public") {
      embed.setDescription(publicCommand);
    }
    await interaction.update({ embeds: [embed] });
  },
};
