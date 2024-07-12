
/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const blacklist = require("../database/blacklist");
const mail = require("../database/mail");
const client = require("../JSON/client");
const { Modal, TextInputComponent, showModal } = require("discord-modals");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("mail")
    .setDescription("send message to any user")
    //.setDMPermission(true)
    .addStringOption((dzan) =>
      dzan
        .setName("type")
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
  async execute(interaction) {

    const language = interaction.options.getString("language"); //r
    const type = interaction.options.getString("type"); //r
    const User = interaction.options.getUser("user"); //r
    const who_send = interaction.options.getString("send_by"); //r
    const user = client.users.cache.get(User.id);
    const fromBlacklist = await blacklist.get(interaction.user.id);
    const toBlacklist = await blacklist.get(User.id);


    if (fromBlacklist === true) {
      let blacklistembed = new MessageEmbed()
        .setTitle("Blacklist")
        .setDescription(
          "انت ف القائمه السوداء.  لايمكنك ارسال او استقبال رسايل بريديه."
        )
        .setFooter(
          "لطلب ازالتك من القائمه السوداء خذ رقم البلاغ ل فحصه , انتظر الرد"
        );
      const block = await blacklist.get(`block:${interaction.user.id}`);

      blacklistembed
        .addField(`Admin:`,`<@${block.admin}>`)
        .addField("Report number:", `\`\`\`${block.number}\`\`\``)
        .addField("When did you get blacklisted?", `${block.time}`);
      interaction.reply({ embeds: [blacklistembed] });
      return;
    } else {
      blacklist.set(interaction.user.id, false);
    }
    if (toBlacklist === true) {
      return interaction.reply({
        content:
          "هذا العضو ف القائمه السوداء لا يمكنه استقبال رسالتك. او ارسال رساله لك.",
      });
    }

    if (interaction.user.id === User.id) {
      await interaction.reply({
        content: "لا يمكنك ارسال رساله لنفسك",
        ephemeral: true,
      });
      return;
    }
    if (User.bot) {
      await interaction.reply({
        content: "لا يمكنك ارسال رساله لنفسك",
        ephemeral: true,
      });
      return;
    }

    mail.set(interaction.user.id, {
      language: language,
      to: user.id,
      whosend: who_send,
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

    const message_modal_nickname = new Modal()
      .setTitle("Send By Message")
      .setCustomId("message_modal_nickname")
      .setComponents(
        new TextInputComponent()
          .setCustomId("message")
          .setLabel("Message")
          .setStyle("LONG")
          .setMinLength(1)
          .setMaxLength(4000)
          .setPlaceholder("add some text here :)")
          .setRequired(true),
        new TextInputComponent()
          .setCustomId("nickname")
          .setLabel("اسم مستعار")
          .setStyle("SHORT")
          .setMinLength(1)
          .setMaxLength(100)
          .setPlaceholder("add any nickname")
          .setRequired(true)
      );

    const embed_modal_nickname = new Modal()
      .setTitle("Send By Embed")
      .setCustomId("embed_modal_nickname")
      .setComponents(
        new TextInputComponent()
          .setCustomId("description")
          .setLabel("Description")
          .setStyle("LONG")
          .setMinLength(1)
          .setMaxLength(4000)
          .setPlaceholder("add some text here :)")
          .setRequired(true),
        new TextInputComponent()
          .setCustomId("nickname")
          .setLabel("اسم مستعار")
          .setStyle("SHORT")
          .setMinLength(1)
          .setMaxLength(100)
          .setPlaceholder("add any nickname")
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

    if (type === "message") {
      if (who_send === "nickname") {
        showModal(message_modal_nickname, {
          client: client,
          interaction: interaction,
        });
      }
      showModal(message_modal, {
        client: client,
        interaction: interaction,
      });
    } else if (type === "embed") {
      if (who_send === "nickname") {
        showModal(embed_modal_nickname, {
          client: client,
          interaction: interaction,
        });
      }
      showModal(embed_modal, {
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