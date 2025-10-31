/**
 * Safely replies to a Discord interaction, handling any potential expiry errors
 * @param {Object} interaction - The Discord interaction object
 * @param {Object} options - The reply options
 * @param {boolean} isEdit - Whether this is an edit to an existing reply
 */
async function safeInteractionReply(interaction, options, isEdit = false) {
    try {
        if (!interaction) return;

        const method = isEdit ? 'editReply' : (interaction.deferred ? 'editReply' : 'reply');

        if (typeof interaction[method] === 'function') {
            await interaction[method](options).catch(err => {
                if (err.code !== 10062) {  // Ignore unknown interaction errors
                    console.error(`Error in ${method}:`, err);
                }
            });
        }
    } catch (error) {
        if (error.code !== 10062) {  // Ignore unknown interaction errors
            console.error(`Safe interaction reply error:`, error);
        }
    }
}

module.exports = safeInteractionReply;
