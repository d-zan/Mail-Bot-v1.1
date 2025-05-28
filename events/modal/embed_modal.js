/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio
*/
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const client = require("../../JS/client");
const db = require("../../database/database");
const gen = require("generater.js");
const row = new MessageActionRow().addComponents(
  new MessageButton()
    .setCustomId("report")
    .setLabel("Report")
    .setStyle("SECONDARY")
);

const wrong = new MessageEmbed().setTitle("⚠ تحذير").setColor("YELLOW")
  .setDescription(`
  هذا التحذير سوف يظهر لك فقط.
  **اذا كانت رسالتك تحتوي علي سب او اهانه للعضو سوف يتم وضعك ف القائمه السوداء**
                  `);
/**
 * @type {import("../../elements/componentsElements").ComponentsElement}
 */
module.exports = {
  isModal: true,
  customId: "embed_modal",
/**
   * @param {import("discord.js").ModalSubmitInteraction} modal
   */
  async execute(modal) {
    const box = await db.table("mailbox");
    const mail = await db.table("mail");

    const user = await mail.get(modal.user.id).to;
    const User = client.users.cache.get(user);
    const language = await mail.get(modal.user.id).language;
    const whosend = await mail.get(modal.user.id).whosend;
    const data = new Date();
    const Timestamp = Math.floor(data.getTime() / 1000);
    const time = `<t:${Timestamp}:R>`;
    const description = modal.getTextInputValue("description");
    const nickname = modal.getTextInputValue("nickname");
    const key = gen.keyGenerater(25, { bigWords: true });
    const userBox = await box.table(modal.user.id);
    function rom(language, whosen) {
      if (language === "ar") {
        if (whosen === "user") {
          return {
            title: "لديك بريد جديد",
            message: `\n**المرسل**: ${modal.user} \n**الرساله**: ${description}`,
            author: modal.user.tag,
            succM: "تم الارسال بـ نجاح",
          };
        } else if (whosen === "unknown") {
          return {
            title: "لديك بريد جديد",
            message: `\n**المرسل**: مجهول \n**الرساله**: ${description}`,
            author: "مجهول",
            succM: "تم الارسال بـ نجاح",
          };
        } else if (nickname && whosend === "nickname") {
          return {
            title: "لديك بريد جديد",
            message: `\n**المرسل**: ${nickname} \n**الرساله**: ${description}`,
            author: nickname,
            succM: "تم الارسال بـ نجاح",
          };
        }
      } else if (language === "en") {
        if (whosen === "user") {
          return {
            title: "New Mail",
            message: `\n**From**: ${modal.user} \n**Message**: ${description}`,
            author: modal.user.tag,
            succM: "Done send message to user",
          };
        } else if (whosen === "unknown") {
          return {
            title: "New Mail",
            message: `\n**From**: UNKNOWN \n**Message**: ${description}`,
            author: "unknown",
            succM: "Done send message to user",
          };
        } else if (nickname) {
          return {
            title: "New Mail",
            message: `\n**From**: ${nickname} \n**Message**: ${description}`,
            author: nickname,
            succM: "Done send message to user",
          };
        }
      }
    }
    
    const roms = rom(language, whosend);
    let embed = new MessageEmbed()
      .setColor("DARK_GOLD")
      //.setAuthor({ name: User.tag, iconURL: User.avatarURL() })
      .setTitle(roms.title)
      .setFooter({ text: modal.guild.name, iconURL: modal.guild.iconURL() });

    try {
      embed.setDescription(roms.message).setAuthor(roms.author);

      const message = await User.send({ embeds: [embed],components:[row] });

      db.set(message.id, key);
      mail.delete(modal.user.id)
      userBox.set(key, {
        message: description,
        time: time,
      });
      db.set(key, {
        to: User.id,
        from: modal.user.id,
        message: description,
        time: time,
      });
      await modal.reply({
        content: roms.succM,
        embeds: [wrong],
        ephemeral: true,
      });
    } catch (error) {
      if (error.code === 50007) {
        await modal.reply({
          content: "I can't send message to user.",
          ephemeral: true,
        });
        return;
      } else {
        console.error(`Error: [Modal: ${this.customId}]: ` + error);
      }
    }
  },
};

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
