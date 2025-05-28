const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("../../../database/database.js");
const { MessageEmbed } = require("discord.js");

/**
 * @type {import("../../../elements/slashElements.js").SlashElement}
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("see-enc")
    .setDescription("To decrypt a message")
    .addStringOption((dzan) =>
      dzan
        .setName("enc_key")
        .setDescription("The key sent to you")
        .setRequired(true)
    )
    .addIntegerOption((dzan) =>
      dzan
        .setName("number")
        .setDescription("Enter the number used in encryption")
        .setRequired(true)
    )
    .addStringOption((dzan) =>
      dzan
        .setName("math_sign")
        .setDescription("Select the math sign used in encryption")
        .setChoices(
          { name: "ضرب", value: "one" },
          { name: "قسمه", value: "two" }
        )
    ),
  category: "Public",
  async execute(interaction) {
    const enc_key = interaction.options.getString("enc_key", true);
    const number = interaction.options.getInteger("number", true);
    const math_sign = interaction.options.getString("math_sign");
    const key1 = parseInt(enc_key);
    let sign = "one";
    if (math_sign) sign = math_sign;
    const enc_data = {
      one: key1 / number, // '/' - encr
      two: key1 * number, // 'x' - encr
    };
    const dencrypted = enc_data[sign]; //The code
    const enc = await db.table("enc");
    const message = await enc.get(dencrypted.toString());

    if (!message) {
      return interaction.reply({
        content: "The key you entered is incorrect or the message has expired.",
        ephemeral: true,
      });
    }
    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Decrypted Message")
      .setDescription(message)
      .setFooter("You can't use this key agian. This key is one time use only.")
      .setTimestamp();

     interaction.reply({ embeds: [embed],ephemeral: true });
     enc.delete(dencrypted.toString()); 
  },
};
