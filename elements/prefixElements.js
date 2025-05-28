/**
 * @typedef {'Main' | 'Admin' | 'Public'} categorys
 */

/**
 * @typedef {Object} PrefixElement
 * @property {string} name - The name of the command
 * @property {string} description - The description of the command
 * @property {string[]} [short] - Shortcuts for the command
 * @property {categorys} category - The category of the command
 * @property {function(import('discord.js').Message,string[])} execute - Action of the command
 */
/**
 * Prefix command element template.
 * @type {PrefixElement}
 */
module.exports = {
  name: "",
  description: "",
  short: [""],
  category: "",
  execute(message, args) {},
};
