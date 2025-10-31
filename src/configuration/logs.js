const { EmbedBuilder } = require('discord.js');
const DiscordConfigs = require('./discordConfigs');
const { client } = require('./bot');

const sendEmbedMessage = async (channelId, title, description, color) => {
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(color);
  try {
    // Ensure channelId is not null or undefined
    if (!channelId) {
      console.error('Channel ID is null or undefined');
      return;
    }

    let channel = client.channels.cache.get(channelId);
    if (!channel) {
      channel = await client.channels.fetch(channelId).catch(err => {
        console.error(`Failed to fetch channel: ${err}`);
        return null;
      });
      if (!channel) return;
    }
    await channel.send({ embeds: [embed] });
  } catch (error) {
    console.error(`An error occurred while sending the message: ${error}`);
  }
}

const sendCustomEmbeds = async (channelId, message, embeds) => {
  try {
    // Ensure channelId is not null or undefined
    if (!channelId) {
      console.error('Channel ID is null or undefined');
      return;
    }

    let channel = client.channels.cache.get(channelId);
    if (!channel) {
      channel = await client.channels.fetch(channelId).catch(err => {
        console.error(`Failed to fetch channel: ${err}`);
        return null;
      });
      if (!channel) return;
    }
    
    if (message && embeds) {
      await channel.send({ content: message, embeds: embeds });
    } else if (embeds) {
      await channel.send({ embeds: embeds });
    } else if (message) {
      await channel.send({ content: message });
    }
  } catch (error) {
    console.error(`An error occurred while sending the message: ${error}`);
  }
}
const sendEmbedMessageFields = async (channelId, title, fields, color) => {
    const embed = {
      title: title,
      fields: fields,
      color: parseInt(color.replace('#', '0x'), 16),
      timestamp: new Date().toISOString(),
    }
  try {
    // Ensure channelId is not null or undefined
    if (!channelId) {
      console.error('Channel ID is null or undefined');
      return;
    }
    
    let channel = client.channels.cache.get(channelId);
    // If the channel wasn't found in the cache, try fetching directly
    if (!channel) {
      channel = await client.channels.fetch(channelId).catch(err => {
        console.error(`Failed to fetch channel: ${err}`);
        return null; // Ensure null is returned to prevent further execution
      });
      if (!channel) return; // Exit if channel is still not found
    }
    await channel.send({ embeds: [embed] });
  } catch (error) {
    console.error(`An error occurred while sending the message: ${error}`);
  }
}
const Logger = {
    log: (message, logChannelId = DiscordConfigs.allLogChannel, customEmbeds = null) => {
      // Ensure channel ID is valid
      const channelId = logChannelId || DiscordConfigs.allLogChannel;
      
      if (customEmbeds) {
        sendCustomEmbeds(channelId, message, customEmbeds);
      } else {
        sendEmbedMessage(channelId, 'Log', message, DiscordConfigs.colors.log);
      }
    },
    logFields: (message, logChannelId = DiscordConfigs.allLogChannel) => {
      sendEmbedMessageFields(logChannelId, 'Log', message, DiscordConfigs.colors.log);
    },
    error: async (message, logChannelId = DiscordConfigs.allLogChannel) => {
      const channelId = logChannelId ?? DiscordConfigs.allLogChannel;
      await sendEmbedMessage(channelId, 'Error', message, DiscordConfigs.colors.error);
    },
    info: async (message, logChannelId = DiscordConfigs.allLogChannel) => {
      const channelId = logChannelId ?? DiscordConfigs.allLogChannel;
      await sendEmbedMessage(channelId, 'Info', message, DiscordConfigs.colors.info);
    },
}
module.exports = Logger
