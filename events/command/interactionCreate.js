const { slashCommands } = require("../../JS/commands");
const client = require("../../JS/client");


module.exports = {
  name: "interactionCreate",
  /**
   * @param {import('discord.js').Interaction} interaction 
   * @returns 
   */
async execute(interaction) {
    if (!interaction.isCommand()) return;
    const command = slashCommands.get(interaction.commandName);
    if (!command) return;
   if (!interaction.guild.me.permissions.has("SEND_MESSAGES" || "VIEW_CHANNEL" || "ADD_REACTIONS" || "EMBED_LINKS")) {
    await interaction.reply({
      content: "لا امتلك الصلاحيات الكافية.",
      ephemeral: true,
    });
    return;

  }
    try {
      await command.execute(interaction);
    } catch (error) {
      await interaction.reply({
        content: "خطأ في تنفيذ الأمر.",
        ephemeral: true,
      });
      console.error(`Error: [CMD_NAME:${interaction.commandName}]: `+error);
    }
  },
};