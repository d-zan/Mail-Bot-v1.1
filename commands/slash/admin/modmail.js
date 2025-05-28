const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const db = require("../../../database/database");
 /**
 * @type {import("../../../elements/slashElements").SlashElement}
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("modmail")
    .setDescription("Enable it and add the channel for reports messages")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((dzan) =>
      dzan
        .setName("channel")
        .setDescription("Choice channel must be text channel")
        .setRequired(true)
    ),
    category:'Admin',
  async execute(interaction) {
    const modmail = await db.table("modmail");
    const channel = interaction.options.getChannel("channel", true);
    if (channel.type !== "GUILD_TEXT") {
      return interaction.reply({content:"Channel must be text",ephemeral:true});
    }
    channel.send('test').then((m)=>{
        modmail.set('modmail',true);
        modmail.set('modmail_channel',channel.id);
        m.delete();
      return interaction.reply({content:"Modmail is enabled.",ephemeral:false});
    }).catch(()=>{
        return interaction.reply({content:"I can't send message.",ephemeral:true});
    })
  },
};
