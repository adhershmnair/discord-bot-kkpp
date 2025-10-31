const getEventTypeFromPath = require('./getEventTypeFromPath');

module.exports = {
  getEventTypeFromPath,
  // Add a debug utility
  debugEvents: function(events) {
    console.log('===== EVENT LOADING DEBUG =====');
    console.log('All event types:', Object.keys(events));
    Object.entries(events).forEach(([type, handlers]) => {
      console.log(`${type}: ${handlers.length} handlers`);
      handlers.forEach((h, i) => console.log(`  ${i}: ${h.name || 'anonymous'}`));
    });
    console.log('===============================');
  }
};
