/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const db = require("../../../database/database");
//const client = require("../../../JS/client");
//const box = require("../../../database/box");
 /**
 * @type {import("../../../elements/slashElements").SlashElement}
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("mails-box")
    .setDescription("See your mail"),
    category:'Main',
  async execute(interaction) {
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

    await interaction.reply({ embeds: [embed] });
  },
};

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
