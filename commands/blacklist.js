
/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const blacklist = require("../database/blacklist");
const db = require("../database/database");
const mail = require("../database/mail");
const wait = require("node:timers/promises").setTimeout;
const client = require("../JSON/client");
const { MessageEmbed } = require("discord.js");
const { generateSecretKey } = require("generate-8");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("add-blacklist")
    .setDescription("add user to blacklist")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) //لازم الاداري يكون معاه رتبه ب تدير الرتب
    //.setDMPermission(true)
    .addStringOption((dzan) =>
      dzan.setName("id").setDescription("ايدي المخالف هنا").setRequired(true)
    )
    .addStringOption((dzan) =>
      dzan.setName("reason").setDescription("سبب البلاك ليست").setRequired(true)
    )
    .addUserOption((dzan) =>
      dzan.setName("reporter").setDescription("منشن المبلغ").setRequired(true)
    ),
  async execute(interaction) {
    const id = interaction.options.getString("id",true);
    const reason = interaction.options.getString("reason",true);
    const user = interaction.options.getUser("reporter",true);
    const ISblacklist = blacklist.get(id);
    if (user.bot) {
      await interaction.reply("How reporter is bot?");
      return;
    }
    if(interaction.user.id === id) {
      await interaction.reply("You can't give yourself");
      return;
    }
if (ISblacklist === true) {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setColor("000000")
            .setDescription("العضو في القائمه السوداء باللفعل."),
        ],
      });
      return;
} else {
 blacklist.set(id, true);

      await interaction.reply({
        embeds: [
          new MessageEmbed()
            .setColor("DARK_GREEN")
            .setDescription("الصبر مفتاح الفرج......."),
        ],
      });

      wait(9000);

      await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor("GREEN")
            .setDescription("تم وضع العضو ف القائمه السوداء"),
        ],
      });
      const data = new Date();
      const Timestamp = Math.floor(data.getTime() / 1000);
     const time = `<t:${Timestamp}:R>`;
      const skey = generateSecretKey(8, {
        uppercase: true,
        split: {
            split: true,
            separator: '/',
            splitLength: 4,
            
        },
    });
      
      blacklist.set(`block:${id}`, {
        reason: reason,
        reporter: user.id,
        admin: interaction.user.id,
        time: time,
        number:skey
      });
    }


  },
};

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/