/**
 * @type {import("../../../elements/prefixElements.js").PrefixElement}
 */
const { MessageEmbed } = require("discord.js");
const db = require("../../../database/database.js");
modeule.exports = {
  name: "mailbox",
  description: "See all your mails.",
  category: "Main",
  async execute(message) {
    const embed = new MessageEmbed()
      .setTitle("Your Box:")
      .setFooter(
        "Max: 21 " | interaction.guild.name,
        interaction.guild.iconURL()
      );
    const box = await db.table("mailbox");
    const mailll = await box.values();
    mailll.slice(0, 20).forEach((element) => {
      if (box.startsWith(interaction.user.id)) {
        embed.addField(
          "** **",
          `
      Message: ${element.message}      
      Time: ${element.time}      
                `
        );
      } else {
        embed.setDescription("I can't find any mail for you.");
      }
    });
    //console.log(mail)

    await message.reply({ embeds: [embed] });
  },
};
