const NodeQB = require("nodeqb");
const db = new NodeQB({
  type: "mysql", //database type "mysql|mongo" 
  method: "pool", // preferred use pool method
  defaults: {   //optional
      orderColumn: "createdAt" //for default ordering column -> optional
  },
  config: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: process.env.DATABASE_PORT || 3306,
      database: process.env.DATABASE_NAME || 'db',
      user: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASS || 'root',
      connectionLimit: 10, //increase connection as per your application
  }
})

const dbConnect = {
  async testInsert() {
    const data = {
      discord_id: '123456789012345678',
      approved_by: '987654321098765432',
    }
    const leave = await db.table('tablename').insert(data, (err, results, fields) => {
      if (err) {
        console.error('Error inserting data:', err);
        return false;
      }
      if (results.insertId) {
        console.log('Data inserted successfully with ID:', results.insertId);
        return true;  
      }
    });
    return leave;
  }
};

module.exports = { dbConnect, db }
