const db = require('./connection');
const { User } = require('../models');

db.once('open', async () => {

  console.log('categories seeded');

  process.exit();
});
