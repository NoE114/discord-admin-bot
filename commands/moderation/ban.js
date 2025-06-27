const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { embedColor } = require('../../config.json');
const { createEmbed } = require('../../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a member from the server')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The member to ban')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for banning'))
    .addIntegerOption(option =>
      option.setName('days')
        .setDescription('Number of days of messages to delete (0-7)')
        .setMinValue(0)
        .setMaxValue(7))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    // Check permissions
    if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      return interaction.reply({ 
        embeds: [createEmbed('ERROR', 'You do not have permission to ban members.')], 
        ephemeral: true 
      });
    }

    const target = interaction.options.getMember('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const days = interaction.options.getInteger('days') || 0;

    // Check if target is valid
    if (!target) {
      return interaction.reply({
        embeds: [createEmbed('ERROR', 'Could not find that member.')],
        ephemeral: true
      });
    }

    // Check if the bot can ban the target
    if (!target.bannable) {
      return interaction.reply({
        embeds: [createEmbed('ERROR', 'I cannot ban this member. They may have higher permissions than me.')],
        ephemeral: true
      });
    }

    // Check if the user is trying to ban someone with higher roles
    if (interaction.member.roles.highest.position <= target.roles.highest.position) {
      return interaction.reply({
        embeds: [createEmbed('ERROR', 'You cannot ban someone with the same or higher role than you.')],
        ephemeral: true
      });
    }

    try {
      await target.send({
        embeds: [createEmbed('WARNING', `You have been banned from ${interaction.guild.name}.\nReason: ${reason}`)]
      }).catch(error => {
        // Ignore errors if DM fails (e.g., user has DMs closed)
      });

      await target.ban({ deleteMessageDays: days, reason: `${reason} | Banned by ${interaction.user.tag}` });

      await interaction.reply({
        embeds: [createEmbed('SUCCESS', `Successfully banned ${target.user.tag}\nReason: ${reason}`)]
      });
    } catch (error) {
      console.error('Error banning member:', error);
      await interaction.reply({
        embeds: [createEmbed('ERROR', `Failed to ban member: ${error.message}`)],
        ephemeral: true
      });
    }
  },
};
