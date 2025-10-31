const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const DiscordConfigs = require('../../configuration/discordConfigs');
const { log } = require('../../configuration/logs');

const allLogs = DiscordConfigs.allLogChannel;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rewrite')
        .setDescription('Rewrite a sentence with proper grammar')
        .addStringOption(option =>
            option.setName('sentence')
                .setDescription('The sentence to rewrite')
                .setRequired(true)),

    async execute(interaction) {        // Check if command is used in command channel
        if (interaction.channelId !== DiscordConfigs.commandChannel) {
            return interaction.reply({ 
                content: 'This command can only be used in the command channel.',
                ephemeral: true 
            });
        }

        await interaction.deferReply();

        const sentence = interaction.options.getString('sentence');
        const bardKey = process.env.BARDKEY;

        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${bardKey}`,
                {
                    contents: [{
                        parts: [{
                            text: "rewrite fixing grammer in the sentence following - " + sentence
                        }]
                    }]
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const rewrittenText = response.data.candidates[0].content.parts[0].text;
            
            // Send the response to the user
            await interaction.editReply({
                content: `\`\`\`\n${sentence}\n\`\`\`` + `\`\`\`\n${rewrittenText}\n\`\`\``
            });            // Log the rewrite action
            await log(`<@${interaction.member.id}> rewrote the text from "${sentence}" to "${rewrittenText}"`, allLogs);
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            await interaction.editReply('Sorry, there was an error processing your request.');
              // Log the error
            await log(`<@${interaction.member.id}> failed to rewrite text: ${error.message}`, allLogs);
        }
    },
};
