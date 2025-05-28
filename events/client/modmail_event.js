const { MessageEmbed,MessageButton,MessageActionRow } = require("discord.js");
const db = require("../../database/database");
const client = require("../../JS/client");
const rod = db;
module.exports = {
  name: "messageCreate",
  once: false,
  /**
   * @param {import("discord.js").Message} message
   */
  async execute(message) {
   // if (message.author.bot) return;
   
   const modmaila = await rod.table("modmail");
   const modmail = modmaila.get("modmail");
   if (message.author.bot) return;
   if (message.channel.type !== "DM") return;
   
   if (modmail) {
  const modmailV = await modmaila.values();
  if (modmailV.includes(message.author.id)) {
return message.reply('**تمتلك modmail بالفعل يرجاء انتظر الرد عليه ثم ارسل واحد اخر.**');
  }
      const channelId = modmaila.get("modmail_channel");
      const channel = client.channels.cache.get(channelId);
      if (!channel) return;
      if (channel.type !== 'GUILD_TEXT') return
        const row = new MessageActionRow().setComponents(new MessageButton().setCustomId('modmail_send').setLabel("Send").setStyle('SECONDARY'))
        const messag2 = await channel.send({
        embeds:[
            new MessageEmbed()
            .setAuthor(message.author.tag,message.author.displayAvatarURL({dynamic:true}))
            .setTitle("New Mail")
            .setDescription(message.content)
            .addField('Author',`${message.author}`)
            .setColor("BLUE")
        ],
        components:[row]
    });
    
    modmaila.set(messag2.id,message.author.id);
    }
     
  },
};
