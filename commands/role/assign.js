const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('assign-role')
    .setDescription('Assign a role to a member')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The member to assign the role to')
        .setRequired(true))
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('The role to assign')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for assigning the role'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    // Check permissions
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
      return interaction.reply({ 
        embeds: [createEmbed('ERROR', 'You do not have permission to manage roles.')], 
        ephemeral: true 
      });
    }

    const target = interaction.options.getMember('target');
    const role = interaction.options.getRole('role');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    // Check if target is valid
    if (!target) {
      return interaction.reply({
        embeds: [createEmbed('ERROR', 'Could not find that member.')],
        ephemeral: true
      });
    }

    // Check if role is valid
    if (!role) {
      return interaction.reply({
        embeds: [createEmbed('ERROR', 'Could not find that role.')],
        ephemeral: true
      });
    }

    // Check if the role is manageable by the bot
    if (!role.editable) {
      return interaction.reply({
        embeds: [createEmbed('ERROR', 'I cannot assign this role. It may be higher than my highest role.')],
        ephemeral: true
      });
    }

    // Check if the user is trying to assign a role higher than their highest role
    if (interaction.member.roles.highest.position <= role.position) {
      return interaction.reply({
        embeds: [createEmbed('ERROR', 'You cannot assign a role that is the same or higher than your highest role.')],
        ephemeral: true
      });
    }

    try {
      // Check if the member already has the role
      if (target.roles.cache.has(role.id)) {
        return interaction.reply({
          embeds: [createEmbed('INFO', `${target.user.tag} already has the ${role.name} role.`)],
          ephemeral: true
        });
      }

      // Assign the role
      await target.roles.add(role, `Role assigned by ${interaction.user.tag} | ${reason}`);

      await interaction.reply({
        embeds: [createEmbed('SUCCESS', `Successfully assigned the ${role.name} role to ${target.user.tag}.\nReason: ${reason}`)]
      });
    } catch (error) {
      console.error('Error assigning role:', error);
      await interaction.reply({
        embeds: [createEmbed('ERROR', `Failed to assign role: ${error.message}`)],
        ephemeral: true
      });
    }
  },
};
