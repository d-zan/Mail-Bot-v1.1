const { MessageEmbed } = require("discord.js");
const db = require("../../../database/database");
const client = require("../../../JSON/client");

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId === "report") {
    const data = db.get(interaction.user.id);
    if (data) {
      await interaction.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("How can report?")
            .setDescription(
              `     
المفتاح ده هتديه ل احد الطاقم الخاص ب الدعم الفني وتديه اسكرين شوت ل الرساله المراد البلاغ عنها.
وهنتكفل ب الباقي.   
في حاله كنت تريد معرفه الشخص ف هذا لا يحق لك ان تفتح تكت دعم فني ل هذا الشي لانن نحمي خصوصيه المرسل هذا اذا كان ف حاله ان الرساله سليمه           
            `
            )
            .addField(
              "KEY:",
`          
${data}            
 `
            ),
        ],
      });
    }
  }
});

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/