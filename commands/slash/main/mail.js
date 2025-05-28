/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio
*/
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
//const blacklist = require("../../../database/blacklist");
const db = require("../../../database/database");
const client = require("../../../JS/client");
const { Modal, TextInputComponent, showModal } = require("discord-modals");

 /**
 * @type {import("../../../elements/slashElements.js").SlashElement}
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("mail")
    .setDescription("Send message to any user")
    .addStringOption((dzan) =>
      dzan
        .setName("type_message")
        .setDescription("اختر نوع الرساله")
        .setChoices(
          { name: "Message", value: "message" },
          { name: "Embed", value: "embed" }
        )
        .setRequired(true)
    )
    .addUserOption((dzan) =>
      dzan
        .setName("user")
        .setDescription("اختر العضو الذي سيتم ارسال له الرساله.")
        .setRequired(true)
    )
    .addStringOption((dzan) =>
      dzan
        .setName("language")
        .setDescription("اختر لغه الرساله التي سوف يتم ارساله للعضو")
        .setChoices(
          { name: "عربي", value: "ar" },
          { name: "English", value: "en" }
        )
        .setRequired(true)
    )
    .addStringOption((dzan) =>
      dzan
        .setName("send_by")
        .setDescription("اختر من المرسل")
        .setChoices(
          {
            name: "بواسطه مجهول",
            value: "unknown",
          },
          {
            name: "بواسطه اسم مستعار",
            value: "nickname",
          },
          {
            name: "بواسطك",
            value: "user",
          }
        )
        .setRequired(true)
    ),
    category:'Main',
  async execute(interaction) {
    const mail = await db.table("mail");
    const blacklist = await db.table("blacklist");

    const language = interaction.options.getString("language", true);
    const type_message = interaction.options.getString("type_message", true);
    const User = interaction.options.getUser("user", true);
    const who_send = interaction.options.getString("send_by", true);
    const user = client.users.cache.get(User.id);
    const fromBlacklist = await blacklist.get(interaction.user.id);
    const toBlacklist = await blacklist.get(User.id);
    //await interaction.deferReply({ ephemeral: true });

    if (fromBlacklist=== true) {
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
    if (toBlacklist=== true) {
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
    if (User.bot) {
      await interaction.reply({
        content: "لا يمكنك ارسال رساله لبوت",
        ephemeral: true,
      });
      return;
    }

    //await interaction.editReply({content:'loading...'});
    mail.set(interaction.user.id, {
      language: language,
      to: user.id,
      whosend: who_send,
      //mt: mail_type,
      //number: number
    });

    const message_modal = new Modal()
      .setTitle("Send By Message")
      .setCustomId("message_modal")
      .setComponents(
        new TextInputComponent()
          .setCustomId("message")
          .setLabel("Message")
          .setStyle("LONG")
          .setMinLength(1)
          .setMaxLength(4000)
          .setPlaceholder("add some text here :)")
          .setRequired(true)
      );

    const embed_modal = new Modal()
      .setTitle("Send By Embed")
      .setCustomId("embed_modal")
      .setComponents(
        new TextInputComponent()
          .setCustomId("description")
          .setLabel("Description")
          .setStyle("LONG")
          .setMinLength(1)
          .setMaxLength(4000)
          .setPlaceholder("add some text here :)")
          .setRequired(true)
      );
    if (who_send === "nickname") {
      message_modal.addComponents(
        new TextInputComponent()
          .setCustomId("nickname")
          .setLabel("اسم مستعار")
          .setStyle("SHORT")
          .setMinLength(1)
          .setMaxLength(100)
          .setPlaceholder("add any nickname")
          .setRequired(true)
      );
      embed_modal.addComponents(
        new TextInputComponent()
          .setCustomId("nickname")
          .setLabel("اسم مستعار")
          .setStyle("SHORT")
          .setMinLength(1)
          .setMaxLength(100)
          .setPlaceholder("add any nickname")
          .setRequired(true)
      );
    }
    if (type_message === "message") {
      await showModal(message_modal, {
        client: client,
        interaction: interaction,
      });
    } else if (type_message === "embed") {
      await showModal(embed_modal, {
        client: client,
        interaction: interaction,
      });
    }
  },
};

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
