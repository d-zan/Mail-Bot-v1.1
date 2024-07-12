
/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

const client = require("../../../JSON/client.js");
const db = require("../../../database/database.js");
const mail = require("../../../database/mail.js");
//const { generateKey } = require("crypto");
//const blacklist = require("../../../database/blacklist.js")
const { generateSecretKey } = require("generate-8");
const box = require("../../../database/box.js");


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

client.on("modalSubmit", async (modal) => {
  const ValueUser = await mail.get(modal.user.id);
  const userid = ValueUser.to;
  const User = client.users.cache.get(userid);
  const user = User;
  const language = ValueUser.language;
  const whosend = ValueUser.whosend;
  //const blacklistt = await blacklist.get(modal.user.id).blacklist;
  try {
 if (modal.customId === "message_modal_nickname") {
      const message = modal.getTextInputValue("message");
      const nickname = modal.getTextInputValue("nickname");
      if (language === "ar") {
        if (whosend === "nickname") {
          await modal.reply({
            content: "تم ارسال الرساله بنجاح",
            embeds: [wrong],
            ephemeral: true,
          });

          await user.send({
            content: `
  # مرحبا. هناك رساله جديده
  
  المرسل: ${nickname}  
  الرساله: ${message}
  `,
            components: [row],
          }).then(
            (react) => {
              react.react("❕");
              react.react("🆕");
            }
          );
          const data = new Date();
          const Timestamp = Math.floor(data.getTime() / 1000);
         const time = `<t:${Timestamp}:R>`;
          const key = generateSecretKey(8, {
            uppercase: true,
            split: {
              split: false,
              separator: "/",
              splitLength: 4,
            },
          });

          db.set(User.id, key);

          db.set(key, {
            to: user.id,
            from: modal.user.id,
            message: message,
            time:time
          });
        }
      } else if (language === "en") {
        if (whosend === "nickname") {
          await modal.reply({
            content: "Done send message.",
            embeds: [wrong],
            ephemeral: true,
          });

          await user.send({
            content: `
  # Hey. you have new message  
  
  From: ${nickname}  
  Message: ${message}
  `,
            components: [row],
          }).then(
            (react) => {
              react.react("❕");
              react.react("🆕");
            }
          );

          const data = new Date();
          const Timestamp = Math.floor(data.getTime() / 1000);
         const time = `<t:${Timestamp}:R>`;
          const key = generateSecretKey(8, {
            uppercase: true,
            split: {
              split: false,
              separator: "/",
              splitLength: 4,
            },
          });

          db.set(User.id, key);

          db.set(key, {
            to: user.id,
            from: modal.user.id,
            message: message,
            time:time
          });
        }
      }
    }
  } catch (error) {
    if (error.code === 50007) {
      await modal.reply({
        content: "I can't send message to user.",
        ephemeral: true,
      });
      return;
    } else {
      console.error(error);
    }
  }
});


/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/