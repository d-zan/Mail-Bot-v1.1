/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const client = require("../../JS/client.js");
const db = require("../../database/database.js");
//const mail = require("../../database/mail.js");
//const { generateKey } = require("crypto");
//const blacklist = require("../../../database/blacklist.js")
const gen = require("generater.js");

const wrong = new MessageEmbed().setTitle("⚠ تحذير").setColor("YELLOW")
  .setDescription(`
  هذا التحذير سوف يظهر لك فقط.
  **اذا كانت رسالتك تحتوي علي سب او اهانه للعضو سوف يتم وضعك ف القائمه السوداء**
                  `);
const row = new MessageActionRow().addComponents(
  new MessageButton()
    .setCustomId("report")
    .setLabel("Report")
    .setStyle("SECONDARY")
);
/**
 * @type {import("../../elements/componentsElements").ComponentsElement}
 */
module.exports = {
  isModal: true,
  customId: "message_modal",
  /**
   * @param {import("discord.js").ModalSubmitInteraction} modal
   */
  async execute(modal) {
    const mail = await db.table('mail');
    const box = await db.table('mailbox');

    const ValueUser = await mail.get(modal.user.id);
    const userid = ValueUser.to;
    const User = client.users.cache.get(userid);
    const user = User;
    const language = ValueUser.language;
    const key = gen.keyGenerater(25, { bigWords: true });
    const whosend = ValueUser.whosend;
    const data = new Date();
    const Timestamp = Math.floor(data.getTime() / 1000);
    const time = `<t:${Timestamp}:R>`;
    const message = modal.getTextInputValue("message");
    const nickname = modal.getTextInputValue("nickname");
    const userBox = await box.table(modal.user.id);

    function rom(language, whosen) {
      if (language === "ar") {
        if (whosen === "user") {
          return {
            message: `\n # مرحبا. لديك رساله جديده\n**المرسل**: ${modal.user}  \n**الرساله**: ${message}`,
            succM: "تم الارسال بـ نجاح",
          };
        } else if (whosen === "unknown") {
          return {
            message: `\n # مرحبا. لديك رساله جديده\n**المرسل**: مجهول  \n**الرساله**: ${message}`,
            succM: "تم الارسال بـ نجاح",
          };
        } else if (nickname && whosend === 'nickname') {
          return {
            message: `\n # مرحبا. لديك رساله جديده\n**المرسل**: ${nickname}  \n**الرساله**: ${message}`,
            succM: "تم الارسال بـ نجاح",
          };
        }
      } else if (language === "en") {
        if (whosen === "user") {
          return {
            message: `\n# Hey. you have new message  \n**From**: ${modal.user} \n**Message**: ${message}`,
            succM: "Done send message to user",
          };
        } else if (whosen === "unknown") {
          return {
            message: `\n# Hey. you have new message  \n**From**: Unknown \n**Message**: ${message}`,
            succM: "Done send message to user",
          };
        } else if (nickname && whosend === 'nickname') {
          return {
            message: `\n# Hey. you have new message  \n**From**: ${nickname} \n**Message**: ${message}`,
            succM: "Done send message to user",
          };
        }
      }
    }
    const roms = rom(language, whosend);
    try {
      await modal.reply({
        content: roms.succM,
        embeds: [wrong],
        ephemeral: true,
      });

      const msg = await user.send({content:roms.message,components:[row]});
      msg.react("🆕");
      db.set(msg.id, key);
      mail.delete(modal.user.id)
      userBox.set(key, {
        message: message,
        time: time,
      });

      db.set(key, {
        to: user.id,
        from: modal.user.id,
        message: message,
        time: time,
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
