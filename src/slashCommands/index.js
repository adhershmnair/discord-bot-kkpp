// ** Prepares commands in this directory for deployment. DO NOT MODIFY! **

const fs = require('fs');
const path = require('path');

const commands = [];

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
console.log(`Found ${files.length} slash commands`);

files.forEach(function(file) {
  try {
    const command = require(file);
    commands.push(command);
    console.log(`Loaded slash command: ${command.name || path.basename(file).replace('.js', '')}`);
  } catch (error) {
    console.error(`Error loading slash command from ${file}:`, error);
  }
});

module.exports = commands;
