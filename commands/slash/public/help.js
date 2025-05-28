const {
    MessageActionRow,
    MessageSelectMenu,
    MessageEmbed
  } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
  const row = new MessageActionRow().addComponents(
    new MessageSelectMenu().setCustomId("example").setOptions([
     {
      label:'Main',
      description:"See all main commands.",
      value:'main',
      emoji:'🔒'
     },
     {
      label:'Admin',
      description:"See all admin commands.",
      value:'admin',
      emoji:'🔑'
     },
     {
      label:'Public',
      description:"See all public commands.",
      value:'public',
      emoji:'🌍'
     },
    ])
  );
  /**
 * @type {import("../../../elements/slashElements.js").SlashElement}
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Are you lost?"),
  category:"Main",
  async execute(interaction) {
    const embed = new MessageEmbed()
    .setAuthor(interaction.user.tag,interaction.user.avatarURL({dynamic:true}))
    .setDescription("**جميع الاوامر الاساسيه و الاداريه والعامه سلاش كومند.**")
    .setColor(interaction.member.displayHexColor)
    interaction.reply({ embeds: [embed], components: [row] }); 
  },
};