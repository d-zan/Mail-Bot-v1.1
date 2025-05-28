const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("../../../database/database");
/**
 * @type {import("../../../elements/slashElements").SlashElement}
 */
module.exports = {
  data: new SlashCommandBuilder()    
    .setName("enc-mail")
    .setDescription("Send an encrypted message to a user")
    .addUserOption((dzan) =>
      dzan
        .setName("user")
        .setDescription("Select the user to send the encrypted message to")
        .setRequired(true)
    )

    .addIntegerOption((dzan) =>
      dzan
        .setName("number")
        .setDescription("Add the number will use in encryption")
        .setRequired(true)
    ).addStringOption((dzan) =>
      dzan
        .setName("math_sign")
        .setDescription("Select the math sign to use in encryption")
        .setChoices(
          { name: "جمع", value: "one" },
          { name: "ضرب", value: "two" },
          { name: "قسمه", value: "three" },
          { name: "طرح", value: "four" },
        )
    )

,
  category: "Main",
  async execute(interaction) {
    ///on work
  },
};
