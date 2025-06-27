const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Delete a specified number of messages')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Number of messages to delete (1-100)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100))
    .addUserOption(option =>
      option.setName('target')
        .setDescription('Only delete messages from this user'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    // Check permissions
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
      return interaction.reply({ 
        embeds: [createEmbed('ERROR', 'You do not have permission to manage messages.')], 
        ephemeral: true 
      });
    }

    const amount = interaction.options.getInteger('amount');
    const target = interaction.options.getUser('target');

    try {
      // Defer the reply to avoid timeout
      await interaction.deferReply({ ephemeral: true });

      // Get messages
      const messages = await interaction.channel.messages.fetch({ limit: 100 });

      // Filter messages if a target user is specified
      let filteredMessages;
      if (target) {
        filteredMessages = messages.filter(m => m.author.id === target.id)
          .first(amount);
      } else {
        filteredMessages = messages.first(amount);
      }

      // Check if we got any messages
      if (filteredMessages.length === 0) {
        return interaction.editReply({
          embeds: [createEmbed('INFO', 'No messages found matching the criteria.')],
          ephemeral: true
        });
      }

      // Check if messages are older than 14 days (Discord limitation)
      const twoWeeksAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
      const messagesToDelete = filteredMessages.filter(m => m.createdTimestamp > twoWeeksAgo);

      if (messagesToDelete.length === 0) {
        return interaction.editReply({
          embeds: [createEmbed('ERROR', 'Cannot delete messages older than 14 days due to Discord limitations.')],
          ephemeral: true
        });
      }

      // Delete messages
      const deletedCount = await interaction.channel.bulkDelete(messagesToDelete, true)
        .then(deleted => deleted.size);

      // Reply with result
      await interaction.editReply({
        embeds: [createEmbed('SUCCESS', `Successfully deleted ${deletedCount} message${deletedCount !== 1 ? 's' : ''}.${target ? ` From user: ${target.tag}` : ''}`)],
        ephemeral: true
      });
    } catch (error) {
      console.error('Error purging messages:', error);
      await interaction.editReply({
        embeds: [createEmbed('ERROR', `Failed to delete messages: ${error.message}`)],
        ephemeral: true
      });
    }
  },
};
