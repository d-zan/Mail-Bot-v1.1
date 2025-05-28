
/**
 * @typedef {'Main' | 'Admin' | 'Public'} categorys
 */

const { SlashCommandBuilder } = require('@discordjs/builders');
///Thanks DevXor-Team
/**
 * @typedef {Object} SlashElement
 * @property {} data - The data of the command
 * @property {categorys} category - The category of the command
 * @property {function(import('discord.js').CommandInteraction)} execute - Action of the command 
 */
/**
 * Prefix command element template.
 * @type {SlashElement}
 */
module.exports = {
    data: new SlashCommandBuilder(),
    category:'',
    execute(interaction) {}
};