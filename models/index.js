const path = require('path');

// Load ORM
const Sequelize = require('sequelize');

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Environment variable to define the URL of the data base to use.
// To use SQLite data base:
//    DATABASE_URL = sqlite:sticker.sqlite
// To use  Heroku Postgres data base:
//    DATABASE_URL = postgres://user:passwd@host:port/database
// const url = process.env.DATABASE_URL || "sqlite:sticker.sqlite";
const url = process.env.DATABASE_URL || "sqlite:sticker.sqlite";

const sequelize = new Sequelize(url, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    }
});

// Import the definition of the Sticker Table from sticker.js
sequelize.import(path.join(__dirname, 'sticker'));

module.exports = sequelize;