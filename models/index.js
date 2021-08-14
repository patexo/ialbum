const path = require('path');

// Load ORM
const Sequelize = require('sequelize');


// Environment variable to define the URL of the data base to use.
// To use SQLite data base:
//    DATABASE_URL = sqlite:sticker.sqlite
// To use  Heroku Postgres data base:
//    DATABASE_URL = postgres://user:passwd@host:port/database
const url = process.env.DATABASE_URL || "sqlite:sticker.sqlite";

const sequelize = new Sequelize(url);

// Import the definition of the Sticker Table from sticker.js
sequelize.import(path.join(__dirname, 'sticker'));

module.exports = sequelize;