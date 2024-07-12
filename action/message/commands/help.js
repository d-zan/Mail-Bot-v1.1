
/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const {
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
  MessageButton,
} = require("discord.js");
const client = require("../../../JSON/client");
const { bot } = require("../../../JSON/config");
const prefix = bot.prefix;
const row = new MessageActionRow().addComponents(
  new MessageSelectMenu().setCustomId("example").setOptions([
    {
      label: "blacklist",
      description: "admin command",
      value: "blacklist",
      emoji: "🚫",
    },
    {
      label: "remove-blacklist",
      description: "admin command",
      value: "remove_blacklist",
      emoji: "⭕",
    },
    {
      label: "scan",
      description: "admin command",
      value: "scan",
      emoji: "🔎",
    },
    {
      label: "search",
      description: "admin command",
      value: "search",
      emoji: "🔎",
    },
    {
      label: "mail",
      description: "member command",
      value: "mail",
      emoji: "✉",
    },
    {
      label: "mails-box",
      description: "member command",
      value: "mails_box",
      emoji: "📮",
    },
    {
      label: "Developer - المطور",
      description: "حقوق المطور",
      value: "developer",
      emoji: "👨‍💻",
    },
    {
      label: " فلسطين - Palestine",
      description: "FREE",
      value: "palestine",
      emoji: "📌",
    },
  ])
);

client.on("messageCreate", async (message) => {
     const embed = new MessageEmbed()
      .setTitle("Example")
      .setDescription("لروية شرح مفصل عن الاوامر الاداريه وامر البريد");
  //if (!message.author.bot) return;
  if (message.content === prefix + "example" ) {
  
  
    // if(message.channel.type ==='GUILD_TEXT' && 'DM') {

    message.reply({ embeds: [embed], components: [row] }); 
   } else if (message.content === `<@${client.user.id}>`) {
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

  if (interaction.customId === "example") {
    const selectedValue = interaction.values[0];
   
    const blacklist_embed = new MessageEmbed()
    .setTitle("blacklist command")
    .setDescription(
      `
Slash Command       
لم العضو ال يتحط ف القائمه السوداء     
ويجرب يشغل الامر "mail" يهظهر له ايمبد يحتوي علي
الشخص ال اداه البلاك ليست و رقم البلاغ ومتي تم اعطاه بلاك ليست.    
        `
    )
    .setFields([
      {
        name: "</blacklist:0>",
        value: "الامر المخصص ل وضع المخالفين ف القائمه السوداء",
      },
      {
        name: "id",
        value: "الاختيار الذي يوضع فيه ايدي الشخص المخالف",
        inline: true,
      },
      {
        name: "reason",
        value: "الاختيار المخصص ل وضع السبب البلاك ليست",
        inline: true,
      },
      {
        name: "reporter",
        value: "الاختيار المخصص لوضع صاحب البلاغ",
        inline: true,
      },
    ]);

    const remove_blacklist_embed = new MessageEmbed()
    .setTitle("remove-blacklist command")
    .setDescription(
      `
Slash Command 
الامر المخصص ل اذالت العضو من القائمه السوداء دون الحاجه للذهاب لخيار الحذف اليدوي 
        `
    )
    .setFields([
      {
        name: "</remove-blacklist:0>",
        value: "الامر المخصص لحذف المخالفين ف القائمه السوداء",
      },
      {
        name: "id",
        value: "الاختيار الذي يوضع فيه ايدي الشخص المخالف",
        inline: true,
      },

    ]);



  const scan_embed = new MessageEmbed()
    .setTitle("scan command")
    .setDescription(
      `
Slash Command       
الامر ده بيبحث عن رقم البلاغ ولاكن يجب ان تضع ايدي مع رقم البلاغ الشخص ال واخد البلاك ليست  
  بعد ما يبحث هتظهر رسالتين واحد مخيفه والتانيه ظاهره

  المخفيه بتحتوي علي الشخص ال عمل البلاغ عشان يكون في سري تامه من التطفل او التنمر الاكتروني
  
  **الاخره تحتوي علي سبب ب تكون ظاهره**

و ب كده هنكون حافظنا علي سريه ال شخص البلغ.
  `
    )
    .setFields([
      {
        name: "</scan:0>",
        value: "الامر المخصص ل وضع المخالفين ف القائمه السوداء",
      },
      {
        name: "id",
        value: "الاختيار الذي يوضع فيه ايدي الشخص المخالف",
        inline: true,
      },
      {
        name: "report_number",
        value: "الاختيار المخصص ل وضع رقم البلاغ",
        inline: true,
      },
    ]);

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
  const search_embed = new MessageEmbed()
    .setTitle("search Commands")
    .setDescription(
      `
Slash Command      
الامر ده بيبحث عن الشخص ال بعت الرساله عن طريق مفتاح سري ال بيكون عند المستلم 
بعد ما يبحث الاداري هتظهر رساله تحتوي علي تفاصيل والتي هي المرسل و الرساله ب الكامل.
  `
    )
    .setFields([
      {
        name: "</scan:0>",
        value: "الامر المخصص ل وضع المخالفين ف القائمه السوداء",
      },
      {
        name: "id",
        value: "الاختيار الذي يوضع فيه ايدي الشخص المخالف",
        inline: true,
      },
      {
        name: "report_number",
        value: "الاختيار المخصص ل وضع رقم البلاغ",
        inline: true,
      },
    ]);
  const mail_embed = new MessageEmbed()
    .setTitle("mail Commands")
    .setDescription(
      `
Slash Command    
ارسال البريد بواسطه هذا الامر سهل جدا و سري وامان تماما.
ولاكن هذا لايعني ان تسب او تهين العضو ف هناك  طرق  ليجادك كم لحمايتك.
ف حالة كنت في القائمه السوداء ف لا تستطيع استقبال او ارسال اي بريد.

  `
    )
    .setFields([
      {
        name: "/mail",
        value: "الامر المخصص ل ارسال البريد",
      },
      {
        name: "**`type`**",
        value: "الاختيار المخصص ل اختيار شكل البريد بين رساله عادي او في هيئه ايمبد.",
        inline: true,
      },
      {
        name: "**`user`**",
        value: "الاختيار المخصص لوضع المستخدم ال هيتم ارسال له الرساله.",
        inline: true,
      },
      {
        name: "**`language`**",
        value: "الاختيار المخصص لوضع لغة الرساله يكي تناسب الرساله التي يتم كتابته بواسطه المستخدم",
        inline: true,
      },
      {
        name: "**`send_by`**",
        value: "الاختيار المخصص لوضع طريقه الاشاره لك في الرساله",
        inline: true,
      },
    ]);
  const developer_embed = new MessageEmbed()
    .setTitle("About Developer")
    .setDescription(
      `
حسابات المطور دزان
**Discord**: \`dz0.\`
**X**: \`_dz4n\`
**Github**: \`d-zan\`
**npm**: \`dzan\`
      `
    );
  const palestine_embed = new MessageEmbed()
    .setTitle("Palestine")
    .setDescription(
      `
Prefix Command 
\`!palestine\`
Just use it <3
      `
    );

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
  const mails_box_embed = new MessageEmbed()
    .setTitle("mails-box example")
    .setDescription(
      `
عشان تشوف جميع رسايل البريد بتاعك ب الكامل
  `
    )
    .setFields([
      {
        name: "/mails-box",
        value: "الامر المخصص ل ارسال البريد",
      }
    ]);

    switch (selectedValue) {
      case "remove_blacklist":
        interaction.update({
          components: [row],
          embeds: [remove_blacklist_embed],
        });
        break;
      case "blacklist":
        interaction.update({
          components: [row],
          embeds: [blacklist_embed],
        });
        break;
      case "scan":
        interaction.update({
          components: [row],
          embeds: [scan_embed],
        });
        break;
      case "search":
        interaction.update({
          components: [row],
          embeds: [search_embed],
        });
        break;
      case "mail":
        interaction.update({
          components: [row],
          embeds: [mail_embed],
        });
        break;
      case "mails_box":
        interaction.update({
          components: [row],
          embeds: [mails_box_embed],
        });
        break;
      case "developer":
        interaction.update({
          components: [row],
          embeds: [developer_embed],
        });
        break;
      case "palestine":
        interaction.update({
          components: [row],
          embeds: [palestine_embed],
        });
        break;
    }
  }
});


/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/