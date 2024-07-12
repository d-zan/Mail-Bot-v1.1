const { Collection } = require("discord.js");
const client = require("../JSON/client");
client.commands = new Collection();

module.exports = {
  name: "interactionCreate",
  execute() {
//......
  },
};