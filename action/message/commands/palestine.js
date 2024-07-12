const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const client = require("../../../JSON/client");
const { bot } = require("../../../JSON/config");
 const prefix = bot.prefix;
 const menu = new MessageSelectMenu()
      .setCustomId("menu")
      .setPlaceholder("اختار")
      .addOptions([
        {
          label: "فيديوهات عن القضيه",
          value: "video",
          description: "عشان تشوف فيديوهات عن القضيه الفلسطيني",
          emoji: "🎞",
        },
        {
          label: "تاريخ الارض",
          value: "history",
          description: "لمعرفة تاريخ الارض بعض المعلومات عن تاريخ الارض.",
          emoji: "📜",
        },
        {
          label: "التبرع",
          value: "donation",
          description: "للتبرع ل اهلانا في فلسطين",
          emoji: "📦",
        },
      ]);
    
/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const row = new MessageActionRow().addComponents(menu);/* 
client.on("interactionCreate",async (interaction) =>{
if (!interaction.isCommand()) return;
if(interaction.commandName === 'palestine') {


   

    const row = new MessageActionRow().addComponents(menu);

    await interaction.reply({ embeds: [embed], components: [row] });

}
});
*/ 

client.on("messageCreate", async (message) => {
  if (message.content === prefix + "palestine") {
  // if(message.channel.type ==='GUILD_TEXT' && 'DM') {
    const embed = new MessageEmbed()
    .setTitle("**🇵🇸فلســــطين-Palestine**")
    .setDescription(`**بعض المعلومات التي ربما ترغب ب معرفته عن فلسطين.**`)
    .setColor("RED");
    
    message.reply({ embeds: [embed], components: [row] }); 
   }
  //}
});


/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isSelectMenu()) return;

  if (interaction.customId === "menu") {
    const selectedValue = interaction.values[0];
    //embed for videos
    const vembed = new MessageEmbed()
      .setTitle(`فيديوهات عن القضيه وقنوات تحدثت عنها`)
      .addFields([
        {
          name: "ممتع",
          value: `1- [Mahmoud IsmailTV | لازم نتكلم عن فلسطين ](<https://youtu.be/hrBBGMDBp1M?si=A7cHPV3X-2EbMWDc>)
      
       2- [BarryTube | فلسطين](<https://youtu.be/Jz3T33QBbBk?si=wOTFO-0GJOZ9z8OG>)`,
        }, //ممتع
        {
          name: "وثائقي",
          value: `1- [دحيح- فلسطين حكاية الارض](<https://youtu.be/f0oy-NicIgE?si=ADvsJPpqLBuKM0kj>)
      
      2- [Joe HaTTab | اكبر سجن بالعالم..غزه](<https://youtu.be/LLqx10b1nTQ?si=BFdicDRcS9tkxpf0>)`,
        }, //وثائقي
        {
          name: "كوميدي",
          value: `[جنازير-طحالب](<https://youtube.com/@janazeermedia2?si=xpBMvb8wi9nDKMsY>) : [شعب بلا ارض](<https://youtu.be/27MdUzPtPz4?si=cqOLhPOH3-h9i5O6>) ، [براءة من يعقوب عليه السلام](<https://youtu.be/ZK5xHRBcjeU?si=qr13p-epelbfyWpn>)`,
        }, //كوميدي
        {
          name: "ناشط",
          value: ` 
      [المواطن سعيد](<https://youtube.com/@Ahmed_Said?si=g8ggu9VdhqOdEBVo>) ، [قناة الجزيرة الاخباريه](<https://youtube.com/@aljazeera?si=tks334mHJW4qOgZI>)`,
        }, //ناشط
      ]).setFooter("ادعي لهم لو ما تقدر تسوي شي.")
      .setColor("RED");

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
    const hembed = new MessageEmbed()
      .setTitle("تاريخ الارض الفلسطيني")
      .addFields([
        {
          name: "فلسطين 1517-1917",
          value: `
      **بدأ حكم العثمانيين في القدس مع دخول السلطان سليم الأول فلسطين ، واستمر حكمهم في المدينة نحو أربعمئة عام، وهي بذلك تعد من أكثر الحضارات التي حكمت القدس واستقرت بها.**`,
        },
        {
          name: "** **",
          value: "** **",
        }, //فاصل
        {
          name: "فلسطين اثناء الاحتلال البريطاني",
          value: `**كان هدف الاحتلال بكل اختصار هو الوفاء ب وعد بلفورد وهو وعد ينص علي قيام وطن قومي لليهود في فلسطين.**`,
        },
        {
          name: "** **",
          value: "** **",
        }, //فاصل
        {
          name: "فلسطين - اتفاقية سايكس بيكو",
          value: `**بعد ان خسرة الدولة العثمانية الحرب العالمية الأولى قسمت اراضيه بين دول الحلفاء (المنتصرون في الحرب)ومن دول الحلفاء بريطانيا
      بعده قامت بريطانيا وفرنسا ب اتفاقيه سايكس بيكو**`,
        },
        {
          name: "** **",
          value: "** **",
        }, //فاصل
        {
          name: "ماهي اتفاقية سايكس بيكو؟",
          value: `**اتفاقيه سريه بين بريطانيا وفرنسا ل تقسيم منطقة الشام و منه فلسطين الذي اخذته بريطانيا**`,
        },
      ]).setFooter("ادعي لهم لو ما تقدر تسوي شي.")
      .setColor("RED");

    const dembed = new MessageEmbed()
      .setTitle("للتبرع ل اهلينا في فلسطين")
      .setDescription(
        `طرق التبرع كثير ولاكن هذا ما وجدته من البحث القليل الذي قمت به`
      )
      .addFields([
        {
          name: "**الهلال الاحمر**",
          value: `**جمعيات الهلال الاحمر المنتشره في الوطن العربي 
      **`,
        },
        {
          name: "** **",
          value: "** **",
        }, //فاصل
        {
          name: "**الهيئة الخيرية الإسلامية العربية**",
          value: `يمكنك التبرع للفلسطينين والمصابين في غزة من خلال التبرع للهيئة الخيرية الإسلامية العربية، عن طريق الاتصال الان 9651808300+ أو اتصل بنا على donation@iico.org.`,
        },
        {
          name: "** **",
          value: "**بنك الطعام المصري**",
        },
      ])
      .setFooter("ادعي لهم لو ما تقدر تسوي شي.")
      .setColor("RED");

    switch (selectedValue) {
      case "video":
        interaction.update({ embeds: [vembed],components:[row] });
        break;

      case "history":
        interaction.update({ embeds: [hembed], components:[row] });
        break;

      case "donation":
        interaction.update({ embeds: [dembed], components:[row] });
        break;
    }
  }
});

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/