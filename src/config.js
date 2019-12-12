const dotenv = require('dotenv');

dotenv.config();

const config = {
  db: {
    url: process.env.DB_URL || '',
  },
  admin: {
    name: process.env.NAME,
    password: process.env.PASS,
  },
  sKey: process.env.S_KEY,
  fe: process.env.FE_HOST,
};

module.exports = config;
