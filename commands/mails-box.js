
/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const db = require("../database/database");
const client = require("../JSON/client");
const box = require("../database/box");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("mails-box")
    .setDescription("see your mail"),
  async execute(interaction) {
    const embed = new MessageEmbed().setTitle('Your Box:').setFooter(interaction.guild.name,interaction.guild.iconURL());

    await box.values().forEach(element =>{
    if (box.startsWith(interaction.user.id)) {
    
/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
embed.addField("** **",`
message:${element.message}      
time:${element.time}      
          `)
    } else {
       embed.setDescription("I can't find any mail for you");
    }
    })
    //console.log(mail)
    
    await interaction.reply({embeds:[embed]})

  },
};

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/