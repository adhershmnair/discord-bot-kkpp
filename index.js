require('dotenv').config();
require('isomorphic-fetch');
const InitializeBot = require('./src/configuration/initialize');
const PORT = process.env.PORT || 3000;

const express = require('express');

const app = express();

console.log('Mounting Discord bot...');

(async () => {
  try {
    await InitializeBot();

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
      console.log('Bot is ready to receive commands!');
    });
  } catch (err) {
    console.error('Failed to initialize bot:', err);
    process.exit(1); // Important: ensures nodemon detects the crash and can restart
  }
})();

process.on('uncaughtException', err => {
  console.error('Unhandled Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
