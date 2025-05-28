
/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const db = require("../../../database/database");
const { MessageEmbed } = require("discord.js");
 /**
 * @type {import("../../../elements/slashElements").SlashElement}
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDescription("Search about message data")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages) // ادارة الرسايل
    //.setDMPermission(true)
    .addStringOption((dzan) =>
      dzan.setName("key").setDescription("ضع المفتاح هنا").setRequired(true)
    ),
    category:'Admin',

  async execute(interaction) {
    const key = interaction.options.getString("key");
    const data = await db.get(key);
    if (!data) {
      await interaction.reply("حدث مشكله ف البحث عن المعلومات.");
      return;
    }
    await interaction.channel.send({
      embeds: [
        new MessageEmbed().setColor("RED").addFields([
          
          {
            name: `مستلم الرساله:`,
            value: `<@${data.to}>`,
          },
          {
            name: `الرساله:`,
            value: `${data.message}`,
          },
          {
            name: `متي تم الارسال`,
            value: `${data.time}`,
          },
        ]),
      ],
    });
interaction.reply(`المرسل:<@${data.from}>`);
  },
};

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/