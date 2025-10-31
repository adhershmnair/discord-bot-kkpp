// ** Prepares events in this directory for deployment. DO NOT MODIFY! **

const fs = require('fs');
const path = require('path');
const { getEventTypeFromPath, debugEvents } = require('../utilities');

const events = {};

// Function to recursively get all JS files
function getAllJsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      // Recurse into subdirectories
      results = results.concat(getAllJsFiles(filePath));
    } else if (path.extname(file) === '.js' && file !== 'index.js') {
      // Add JS files that aren't index.js
      results.push(filePath);
    }
  });

  return results;
}

// Get all JS files recursively
const files = getAllJsFiles(__dirname);

files.forEach(function(file) {
  if (file.indexOf('index.js') === -1) {
    try {
      const eventType = getEventTypeFromPath(file, __dirname);

      if (!events[eventType]) events[eventType] = [];

      const handler = require(file);
      events[eventType].push(handler);
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
});

// Debug the events object
debugEvents(events);

module.exports = events;
