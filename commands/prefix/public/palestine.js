const {
    MessageActionRow,
    MessageSelectMenu,
    MessageEmbed,
    MessageButton,
  } = require("discord.js");

  const menu = new MessageSelectMenu()
      .setCustomId("palestine")
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
      const row = new MessageActionRow().addComponents(menu);
module.exports = {
  name: "palestine",
  description: "Info about Palestine",
  short: ["فلسطين"],
  async execute(message) {
const embed = new MessageEmbed()
    .setTitle("**🇵🇸فلســــطين-Palestine**")
    .setDescription(`**بعض المعلومات التي ربما ترغب ب معرفته عن فلسطين. تاريخ التحرير 2023 "الامر قديم"**`)
    .setColor("RED");
    
    message.reply({ embeds: [embed], components: [row] }); 
  },
};
