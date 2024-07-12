
/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const client = require("../../../JSON/client");
const db = require("../../../database/database");
const mail = require("../../../database/mail");
const blacklist = require("../../../database/blacklist");
const { generateSecretKey } = require("generate-8");
//const { generateKey } = require("crypto");
//const blacklist = require("../../../database/blacklist.js")
const box = require("../../../database/box");
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

client.on("modalSubmit", async (modal) => {
  const user = await mail.get(modal.user.id).to;

  const User = client.users.cache.get(user);

  const language = await mail.get(modal.user.id).language;

  const whosend = await mail.get(modal.user.id).whosend;

  let embeden = new MessageEmbed()
    .setColor("DARK_GOLD")
    //.setAuthor({ name: User.tag, iconURL: User.avatarURL() })
    .setTitle("New Mail")
    .setFooter({ text: modal.guild.name, iconURL: modal.guild.iconURL() });
  let embedar = new MessageEmbed()
    .setColor("DARK_GOLD")
    //.setAuthor({ name: User.tag, iconURL: User.avatarURL() })
    .setTitle("لديك بريد جديد")
    .setFooter({ text: modal.guild.name, iconURL: modal.guild.iconURL() });
  try {
 if (modal.customId === "embed_modal_nickname") {
      const description = modal.getTextInputValue("description");
      const nickname = modal.getTextInputValue("nickname");

      if (language === "ar") {
        if (whosend === "nickname") {
          embedar
            .setDescription(
              `
      المرسل: ${nickname}
      الرساله: ${description}
      `
            )
            .setAuthor({ name: nickname });
          await User.send({ embeds: [embedar], components: [row] }).then(
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
          box.set(`${User.id}:${key}`,{
            message:description,
            time:time
          })
          db.set(User.id, key);
          db.set(key, {
            to: User.id,
            from: modal.user.id,
            message: description,
            time:time
          });
          await modal.reply({
            content: "تم الارسال ب نجاح",
            embeds: [wrong],
            ephemeral: true,
          });
        }
      } else if (language === "en") {
        if (whosend === "nickname") {
          embeden
            .setDescription(
              `
          From: ${nickname}
          Message: ${description}
          `
            )
            .setAuthor({ name: nickname });

          await User.send({ embeds: [embeden], components: [row] }).then(
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
          box.set(`${User.id}:${key}`,{
            message:description,
            time:time
          })
          db.set(User.id, key);
          db.set(key, {
            to: User.id,
            from: modal.user.id,
            message: description,
            time:time
          });
          await modal.reply({
            content: "Done send message to user",
            embeds: [wrong],
            ephemeral: true,
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