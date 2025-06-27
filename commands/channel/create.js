const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const { embedColor } = require('../../config.json');
const { createEmbed } = require('../../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('create-channel')
    .setDescription('Create a new channel')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('The name of the channel')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('type')
        .setDescription('The type of channel')
        .setRequired(true)
        .addChoices(
          { name: 'Text', value: 'text' },
          { name: 'Voice', value: 'voice' },
          { name: 'Announcement', value: 'announcement' },
          { name: 'Stage', value: 'stage' },
          { name: 'Forum', value: 'forum' },
        ))
    .addStringOption(option =>
      option.setName('topic')
        .setDescription('The topic of the channel'))
    .addBooleanOption(option =>
      option.setName('nsfw')
        .setDescription('Whether the channel is NSFW'))
    .addChannelOption(option =>
      option.setName('category')
        .setDescription('The category to place the channel in')
        .addChannelTypes(ChannelType.GuildCategory))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const { guild } = interaction;
    
    // Check permissions
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
      return interaction.reply({ 
        embeds: [createEmbed('ERROR', 'You do not have permission to create channels.')],
        ephemeral: true 
      });
    }

    // Get options
    const name = interaction.options.getString('name');
    const type = interaction.options.getString('type');
    const topic = interaction.options.getString('topic');
    const nsfw = interaction.options.getBoolean('nsfw') || false;
    const category = interaction.options.getChannel('category');

    try {
      // Map string types to Discord.js channel types
      const channelTypes = {
        text: ChannelType.GuildText,
        voice: ChannelType.GuildVoice,
        announcement: ChannelType.GuildAnnouncement,
        stage: ChannelType.GuildStageVoice,
        forum: ChannelType.GuildForum
      };

      const channelType = channelTypes[type];
      
      // Create channel options
      const channelOptions = {
        name,
        type: channelType,
        nsfw,
        parent: category?.id
      };

      // Add topic for text channels
      if (type === 'text' || type === 'announcement') {
        channelOptions.topic = topic || '';
      }

      // Create the channel
      const channel = await guild.channels.create(channelOptions);

      await interaction.reply({
        embeds: [
          createEmbed('SUCCESS', `Channel ${channel} was created successfully!`)
        ]
      });
    } catch (error) {
      console.error('Error creating channel:', error);
      await interaction.reply({
        embeds: [createEmbed('ERROR', `Failed to create channel: ${error.message}`)],
        ephemeral: true
      });
    }
  },
};
