
/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const blacklist = require("../database/blacklist");
const wait = require("node:timers/promises").setTimeout;
const client = require("../JSON/client");
const { MessageEmbed} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("scan")
    .setDescription("send message to any user")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages) // ادارة الرسايل
    //.setDMPermission(true)
    .addStringOption((dzan) =>
      dzan
        .setName("report_number")
        .setDescription("ضع رقم الشكويه هنا")
        .setRequired(true)
    )
    .addStringOption((dzan) =>
      dzan
        .setName("id")
        .setDescription("ضع ايدي الشخص ال واخد بلاك ليست")
        .setRequired(true)
    ),
  async execute(interaction) {


    const reportNumber = interaction.options.getString("report_number");
    const id = interaction.options.getString("id");
    const block = await blacklist.get(`block:${id}`);
if (!block) {
   await interaction.reply("حدث مشكله ف استخراج  رقم الشكوي من القائمه السوداء");
   return;
}
if (reportNumber === block.number) {
//await interaction.reply("جاري استخراج المعلومات......");
const admin = `<@${block.admin}>`;
const reason = block.reason;
const reporter = `<@${block.reporter}>`;
wait(10000)
const embed = new MessageEmbed()
.setTitle("Done scan")
.setDescription(`
Admin:${admin}    
Reason:${reason}

`)
.setTimestamp()
.setFooter("That for admin")
await interaction.channel.send({embeds:[embed]});
await interaction.reply({content:reporter,ephemeral:true});
}


  },
};

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/