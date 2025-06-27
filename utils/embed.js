const { EmbedBuilder } = require('discord.js');
const { embedColor, footerText } = require('../config.json');

/**
 * Creates a formatted embed for consistent messaging
 * @param {string} type - Type of embed (INFO, SUCCESS, WARNING, ERROR)
 * @param {string} description - Main content of the embed
 * @param {object} options - Additional embed options
 * @returns {EmbedBuilder} - Formatted embed
 */
function createEmbed(type, description, options = {}) {
  // Define colors for different embed types
  const colors = {
    INFO: '#3498db',
    SUCCESS: '#2ecc71',
    WARNING: '#f1c40f',
    ERROR: '#e74c3c',
  };

  // Set emoji for different embed types
  const emoji = {
    INFO: 'ℹ️',
    SUCCESS: '✅',
    WARNING: '⚠️',
    ERROR: '❌',
  };

  // Create the embed
  const embed = new EmbedBuilder()
    .setColor(colors[type] || embedColor)
    .setDescription(`${emoji[type] || ''} ${description}`)
    .setFooter({ text: options.footer || footerText })
    .setTimestamp();

  // Add optional title
  if (options.title) {
    embed.setTitle(options.title);
  }

  // Add optional thumbnail
  if (options.thumbnail) {
    embed.setThumbnail(options.thumbnail);
  }

  // Add optional fields
  if (options.fields && Array.isArray(options.fields)) {
    embed.addFields(options.fields);
  }

  // Add optional image
  if (options.image) {
    embed.setImage(options.image);
  }

  // Add optional author
  if (options.author) {
    embed.setAuthor(options.author);
  }

  return embed;
}

module.exports = { createEmbed };
