/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio
*/

const { Modal, TextInputComponent, showModal } = require("discord-modals");
const client = require("../../JS/client");

module.exports = {
  isButton:true,
  customId: "modmail_send",
  /**
   * @param {import("discord.js").ButtonInteraction} interaction 
   */
  async execute(interaction) {
    const modal_modmail = new Modal().setTitle("Send message to user")
    .setCustomId("modal_modmail")
    .setComponents(
      new TextInputComponent()
        .setCustomId("message")
        .setLabel("Message")
        .setStyle("LONG")
        .setMinLength(1)
        .setMaxLength(3000)
        .setPlaceholder("Add some text here :)")
        .setRequired(true)
    );
    
    showModal(modal_modmail, {
      client: client,
      interaction: interaction,
    });
  }
}


/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/