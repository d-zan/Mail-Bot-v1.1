
/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const blacklist = require("../database/blacklist");
const db = require("../database/database");
const wait = require("node:timers/promises").setTimeout;
const client = require("../JSON/client");
const { MessageEmbed } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDescription("searching....")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages) // ادارة الرسايل
    //.setDMPermission(true)
    .addStringOption((dzan) =>
      dzan.setName("key").setDescription("ضع المفتاح هنا").setRequired(true)
    ),
  async execute(interaction) {
    const KEY = interaction.options.getString("key");
    const key = await db.get(KEY);
    if (!key) {
      await interaction.reply("حدث مشكله ف البحث عن الشخص.");
      return;
    }
    await interaction.reply({
      embeds: [
        new MessageEmbed().setColor("RED").addFields([
          {
            name: `المرسل:`,
            value: `<@${key.from}>`,
          },
          {
            name: `مستلم الرساله:`,
            value: `<@${key.to}>`,
          },
          {
            name: `الرساله:`,
            value: `${key.message}`,
          },
          {
            name: `متي تم الارسال`,
            value: `${key.time}`,
          },
        ]),
      ],
    });

  },
};

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/