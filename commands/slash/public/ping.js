 const { SlashCommandBuilder } = require("@discordjs/builders");
 /**
 * @type {import("../../../elements/slashElements.js").SlashElement}
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("pong!"),
  category:"Main",
  async execute(interaction) {
    interaction.reply(`Pong 🏓 ${interaction.client.ws.ping}ms`)
  },
};