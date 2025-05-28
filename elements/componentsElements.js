
///Thanks DevXor-Team
/**
 * @typedef {Object} ComponentsElement
 * @property {string} customId - The key of components
 * @property {boolean} [isSM] - If it's SelectMenu
 * @property {boolean} [isModal] - If it's Modal
 * @property {boolean} [isButton] - If it's Button
 * @property {function(import('discord.js').Interaction,string)} execute - Action of the components 
 */
/**
 * Prefix command element template.
 * @type {ComponentsElement}
 */
module.exports = {
    customId:'',
    isButton:false,
    isModal:false,
    isSM:false,
    execute(interaction,value) {}
};