const bannedDiscords = require('../../configuration/bannedDiscords');

/**
 * Handler for detecting mentions of banned Discord users and sending notification
 * @param {Object} message - The message object
 * @param {String} action - The message action (create, update, delete, etc.)
 */
module.exports = async (message, action) => {
  // Only check for new messages or edited messages
  if (action !== 'create' && action !== 'update') return;
  
  // Ignore bot messages
  if (message.author?.bot) return;
  
  // Check if message has mentions
  if (!message.mentions?.users?.size) return;
  
  // Check if we should monitor this channel
  const channelId = message.channel.id;
  const monitoredChannels = bannedDiscords.channels || [];
  
  // If channels list is not empty and the current channel is not in the list, skip
  if (monitoredChannels.length > 0 && !monitoredChannels.includes(channelId)) {
    return;
  }
  
  // Check if any mentioned user is in the banned list
  const bannedUsers = bannedDiscords.users || [];
  const mentionedBannedUsers = message.mentions.users.filter(user => 
    bannedUsers.includes(user.id)
  );
  
  // If there are any banned users mentioned
  if (mentionedBannedUsers.size > 0) {
    try {
      // Create a comma-separated list of banned users
      const bannedUsersList = Array.from(mentionedBannedUsers.values())
        .map(user => `${user.tag} (<@${user.id}>)`)
        .join(', ');
      
      // Create the appropriate message based on how many users are banned
      const banMessage = mentionedBannedUsers.size === 1 
        ? `⚠️ ${bannedUsersList} has a PVP ban on FiveM community.` 
        : `⚠️ The following users have PVP bans on FiveM community: ${bannedUsersList}`;

      // Send a single message with all banned users
      await message.channel.send(banMessage);
    } catch (error) {
      console.error('Error sending banned user notification:', error);
    }
  }
};
