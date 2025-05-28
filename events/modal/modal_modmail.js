/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const { MessageEmbed } = require("discord.js");
const client = require("../../JS/client");
const db = require("../../database/database");
const rod = db;
/**
 * @type {import("../../elements/componentsElements").ComponentsElement}
 */
module.exports = {
  isModal: true,
  customId: "modal_modmail",
  /**
   * @param {import("discord.js").ModalSubmitInteraction} modal
   */
  async execute(modal) {
    const db = await rod.table("modmail");
    const userid = db.get(modal.message.id);
    const user = client.users.cache.get(userid);
    const data = new Date();
    const Timestamp = Math.floor(data.getTime() / 1000);
    const time = `<t:${Timestamp}:R>`;
    const message = modal.getTextInputValue("message");
    if (!user) return modal.reply("NO USER")
    user.send({embeds:[new MessageEmbed().setTitle("You have a respone").setDescription(message)]}).then(()=>{
      modal.reply({content:'تم ارسال الرد',ephemeral:true});
      db.delete(modal.message.id)
      modal.message.edit({
        content:`**تم الرد بواسطة ${modal.user} منذ ${time}**`,
        components:[]
      });
    }).catch(()=>{
      modal.reply("لا استطيع ارسال لهذا المستخدم")
    })
  },
};

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
