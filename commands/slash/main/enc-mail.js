const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("../../../database/database");
const crypto = require("crypto");
const { MessageEmbed } = require("discord.js");
/**
 * @type {import("../../../elements/slashElements").SlashElement}
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("enc-mail")
    .setDescription("Send an encrypted message to a user")
    .addUserOption((dzan) =>
      dzan
        .setName("user")
        .setDescription("Select the user to send the encrypted message to")
        .setRequired(true)
    )
    .addStringOption((dzan) =>
      dzan
        .setName("message")
        .setDescription("The message will encryption.")
        .setRequired(true)
    )
    .addIntegerOption((dzan) =>
      dzan
        .setName("number")
        .setDescription("Add the number will use in encryption")
        .setRequired(true)
    )    
    .addStringOption((dzan) =>
      dzan
        .setName("math_sign")
        .setDescription("Select the math sign to use in encryption (duf: ضرب)")
        .setChoices(
          { name: "ضرب", value: "one" },
          { name: "قسمه", value: "two" }
        )
    ),

  category: "Main",
  async execute(interaction) {
    let characters = "0123456789";
    const mail = await db.table("mail");
    const enc = await db.table("enc");
    const blacklist = await db.table("blacklist");

    let password = "";
    for (let i = 0; i < 12; i++) {
      const index = crypto.randomInt(0, characters.length);
      password += characters.charAt(index);
    }
    const user = interaction.options.getUser("user", true);
    const member = interaction.guild.members.cache.get(user.id);
    const number = interaction.options.getInteger("number", true);
    const message = interaction.options.getString("message", true);
    const math_sign = interaction.options.getString("math_sign");
    const fromBlacklist = await blacklist.get(interaction.user.id);
    const toBlacklist = await blacklist.get(user.id);
    const key1 = parseInt(password);
    let sign = "one";
    if (math_sign) sign = math_sign;
    const enc_data = {
      'one': key1 * number, // '/' - encr
      'two': key1 / number, // 'x' - encr
    };
    const encrypted = enc_data[sign]; //The code
    
    if (fromBlacklist === true) {
      let blacklistembed = new MessageEmbed()
        .setTitle("Blacklist")
        .setDescription(
          "انت فـ القائمه السوداء.  لايمكنك ارسال او استقبال رسايل بريديه."
        )
        .setFooter(
          "لطلب ازالتك من القائمه السوداء خذ رقم البلاغ لـ فحصه , انتظر الرد"
        );
      const block = await blacklist.get(`block:${interaction.user.id}`);

      blacklistembed
        .addField(`Admin:`, `<@${block.admin}>`)
        .addField("Report number:", `\`\`\`${block.number}\`\`\``)
        .addField("When did you get blacklisted?", `${block.time}`);

      return await interaction.reply({ embeds: [blacklistembed] });
    }
    if (toBlacklist === true) {
      return interaction.reply({
        content:
          "هذا العضو ف القائمه السوداء لا يمكنه استقبال رسالتك. او ارسال رساله لك.",
      });
    }
    if (interaction.user.id === user.id) {
      await interaction.reply({
        content: "لا يمكنك ارسال رساله لنفسك",
        ephemeral: true,
      });
      return;
    }
    if (user.bot) {
      await interaction.reply({
        content: "لا يمكنك ارسال رساله لبوت",
        ephemeral: true,
      });
      return;
    }
    
    
    const embed = new MessageEmbed()
    .setAuthor(interaction.user.tag,interaction.user.avatarURL({dynamic:true}))
    .setTitle('New Mail')
    .setDescription(`${encrypted}`)
    .setFooter(interaction.guild.name,interaction.guild.iconURL({dynamic:true}))
    enc.set(`${key1}`, message);
    member.send({embeds:[embed]})
  },
};
