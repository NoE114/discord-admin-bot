# Discord Admin Bot

A powerful Discord bot with administrative capabilities for server management and moderation.

## Features

- **Channel Management**
  - Create, delete, and modify channels
  - Set channel permissions and categories

- **User Moderation**
  - Kick, ban, and timeout users
  - Warning system with escalating consequences
  - View user infraction history

- **Role Management**
  - Create, modify, and delete roles
  - Assign/remove roles from users

- **Server Management**
  - Change server settings
  - Manage server integrations

- **Message Management**
  - Delete messages (individual or bulk)
  - Pin important messages
  - Log deleted messages

## Setup Instructions

### Prerequisites

- Node.js 16.9.0 or higher
- A Discord Bot token ([Discord Developer Portal](https://discord.com/developers/applications))
- Required permissions for your bot

### Installation

1. Clone this repository
```bash
git clone https://github.com/NoE114/discord-admin-bot.git
cd discord-admin-bot
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
   - Rename `.env.example` to `.env`
   - Fill in your Discord bot token

4. Configure the bot
   - Open `config.json` and update with your preferred settings
   - Make sure to update the `clientId` with your bot's application ID

5. Start the bot
```bash
npm start
```

### Bot Permissions

The bot requires the following permissions to function properly:

- Administrator (or individually):
  - Manage Server
  - Manage Roles
  - Manage Channels
  - Kick Members
  - Ban Members
  - Manage Messages
  - Mention Everyone
  - Manage Nicknames
  - Manage Webhooks
  - Manage Emojis and Stickers
  - Moderate Members (Timeout)

### Inviting the Bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your application
3. Go to the "OAuth2" tab
4. In the "OAuth2 URL Generator", select:
   - Scopes: `bot`, `applications.commands`
   - Bot Permissions: Select the permissions listed above
5. Copy and open the generated URL to invite the bot to your server

## Usage

The bot uses Discord's slash commands. Type `/` in any channel to see available commands.

### Commands

#### Channel Commands
- `/create-channel` - Create a new channel
- `/delete-channel` - Delete a channel
- `/modify-channel` - Modify a channel's settings

#### Moderation Commands
- `/ban` - Ban a member
- `/kick` - Kick a member
- `/timeout` - Timeout a member
- `/warn` - Warn a member

#### Role Commands
- `/create-role` - Create a new role
- `/assign-role` - Assign a role to a member
- `/remove-role` - Remove a role from a member

#### Server Commands
- `/settings` - View and modify server settings

#### Message Commands
- `/delete` - Delete a message
- `/pin` - Pin a message
- `/purge` - Delete multiple messages

## License

This project is licensed under the MIT License - see the LICENSE file for details.
