
/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const wait = require("node:timers/promises").setTimeout;
const client = require("../JSON/client");
const { MessageEmbed } = require("discord.js");
const blacklist = require("../database/blacklist");
const { generateSecretKey } = require("generate-8");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove-blacklist")
    .setDescription("remove member from blacklist.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles) //لازم الاداري يكون معاه رتبه ب تدير الرتب
    //.setDMPermission(true)
    .addStringOption((dzan) =>
      dzan.setName("id").setDescription("ايدي المخالف هنا").setRequired(true)
    ),

  async execute(interaction) {
    const id = interaction.options.getString("id");

    await interaction.reply("الصبر مفتاح الفرج..........");
    wait(10000);
    await interaction.editReply("تم حذف العضو من  القائمه السوداء");

    try {
      blacklist.delete(id);
      blacklist.delete(`block:${id}`);
    } catch (error) {
      interaction.editReply("حدث خطأ ما");
      console.log(error);
      return;
    }

  },
};

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/