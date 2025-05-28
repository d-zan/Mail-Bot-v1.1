//const { name } = require("../../../JS/prefixElement.js");
//Thx: DevXor-Team
/**
 * @type {import("../../../elements/prefixElements.js").PrefixElement}
 */
module.exports = {
    name:'ping',
    description:'Pong!!',
    short:["p"],
    category:"Public",
  async execute(message) {
message.reply(`Pong 🏓 ${message.client.ws.ping}ms`)
    }
}