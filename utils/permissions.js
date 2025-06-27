const { PermissionFlagsBits } = require('discord.js');

/**
 * Checks if the member has the required permissions
 * @param {GuildMember} member - The member to check permissions for
 * @param {Array<PermissionResolvable>} requiredPermissions - The required permissions
 * @returns {boolean} - Whether the member has all required permissions
 */
function hasPermissions(member, requiredPermissions) {
  return member.permissions.has(requiredPermissions);
}

/**
 * Checks if the bot has the required permissions
 * @param {GuildMember} botMember - The client's member object
 * @param {Array<PermissionResolvable>} requiredPermissions - The required permissions
 * @returns {boolean} - Whether the bot has all required permissions
 */
function botHasPermissions(botMember, requiredPermissions) {
  return botMember.permissions.has(requiredPermissions);
}

/**
 * Returns a list of missing permissions
 * @param {GuildMember} member - The member to check permissions for
 * @param {Array<PermissionResolvable>} requiredPermissions - The required permissions
 * @returns {Array<string>} - List of missing permission names
 */
function getMissingPermissions(member, requiredPermissions) {
  const missingPermissions = [];
  for (const permission of requiredPermissions) {
    if (!member.permissions.has(permission)) {
      missingPermissions.push(getPermissionName(permission));
    }
  }
  return missingPermissions;
}

/**
 * Converts permission flag to readable name
 * @param {PermissionResolvable} permission - The permission flag
 * @returns {string} - Readable permission name
 */
function getPermissionName(permission) {
  // This maps Discord.js permission flags to human-readable names
  const permissionNames = {
    [PermissionFlagsBits.Administrator]: 'Administrator',
    [PermissionFlagsBits.ManageGuild]: 'Manage Server',
    [PermissionFlagsBits.ManageRoles]: 'Manage Roles',
    [PermissionFlagsBits.ManageChannels]: 'Manage Channels',
    [PermissionFlagsBits.KickMembers]: 'Kick Members',
    [PermissionFlagsBits.BanMembers]: 'Ban Members',
    [PermissionFlagsBits.ManageMessages]: 'Manage Messages',
    [PermissionFlagsBits.MentionEveryone]: 'Mention Everyone',
    [PermissionFlagsBits.MuteMembers]: 'Mute Members',
    [PermissionFlagsBits.ManageNicknames]: 'Manage Nicknames',
    [PermissionFlagsBits.ManageWebhooks]: 'Manage Webhooks',
    [PermissionFlagsBits.ManageEmojisAndStickers]: 'Manage Emojis and Stickers',
    [PermissionFlagsBits.ModerateMembers]: 'Timeout Members',
  };

  return permissionNames[permission] || 'Unknown Permission';
}

module.exports = {
  hasPermissions,
  botHasPermissions,
  getMissingPermissions,
  getPermissionName
};
