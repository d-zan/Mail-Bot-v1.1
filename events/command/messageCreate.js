
const { prefixCommands:prefixcommand } = require("../../JS/commands");
const client = require("../../JS/client");
const { bot } = require("../../JS/config");

module.exports = {
  name: "messageCreate",
  once: false,
  /**
   * @param {import("discord.js").Message} message
   */
  async execute(message) {
    if (message.author.bot) return;
    let Prefix = bot.prefix;
 
    //const guild = client.guilds.cache.get(message.guild.id);
    //const member = guild.members.cache.get(message.author.id);
    const args = message.content.slice(Prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    if (!message.content.startsWith(Prefix)) return;

    const command = prefixcommand.get(commandName) ||
    prefixcommand.find((cmd) => cmd.short && cmd.short.includes(commandName));;
    if (!command) return;
    if (!message.guild.me.permissions.has("SEND_MESSAGES" || "VIEW_CHANNEL" || "ADD_REACTIONS" || "EMBED_LINKS")) {
      await message.reply({
        content: "لا امتلك الصلاحيات الكافية."
      });
      return;
  
    }
   

    try {
      await command.execute(message, args, client);
    } catch (error) {
      console.log(`Error in CMD ${commandName}: \n${error}`);
      message.reply("حدث خطأ اثناء تنفيذ الامر.");
    }
  },
};
