const {
    MessageActionRow,
    MessageSelectMenu,
    MessageEmbed
  } = require("discord.js");

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
 * @type {import("../../../elements/prefixElements.js").PrefixElement}
 */
module.exports = {
  name: "example",
  description: "Are you lost?",
  short: ["help"],
  category:"Main",
  async execute(message) {
    const embed = new MessageEmbed()
    .setAuthor(message.author.tag,message.author.avatarURL({dynamic:true}))
    .setDescription("**جميع الاوامر الاساسيه و الاداريه والعامه سلاش كومند.**")
    .setColor(message.member.displayHexColor)
    message.reply({ embeds: [embed], components: [row] }); 
  },
};
