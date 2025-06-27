const { ActivityType } = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    
    // Set bot activity and status
    client.user.setPresence({
      activities: [{ name: config.activity, type: ActivityType.Watching }],
      status: config.status,
    });

    // Log guild count
    console.log(`Bot is in ${client.guilds.cache.size} servers`);
  },
};
