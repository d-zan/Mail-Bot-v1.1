
/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const wait = require("node:timers/promises").setTimeout;
const client = require("../../../JS/client");
const { MessageEmbed } = require("discord.js");
const db = require("../../../database/database");
//const blacklist = require("../../../database/blacklist");
//const { generateSecretKey } = require("generate-8");
 /**
 * @type {import("../../../elements/slashElements").SlashElement}
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove-blacklist")
    .setDescription("Remove member from blacklist.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles) //لازم الاداري يكون معاه رتبه ب تدير الرتب
    //.setDMPermission(true)
    .addStringOption((dzan) =>
      dzan.setName("id").setDescription("ايدي المخالف هنا").setRequired(true)
    ),
category:'Admin',
  async execute(interaction) {
    const id = interaction.options.getString("id");
    const blacklist = await db.table("blacklist");
    await interaction.reply("الصبر مفتاح الفرج..........");
    wait(10000);
    
    try {
      blacklist.delete(id);
      blacklist.delete(`block:${id}`);
      await interaction.editReply("تم حذف العضو من  القائمه السوداء");
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