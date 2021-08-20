const Sequelize = require("sequelize");
const {models} = require("../models");

const { Pool } = require ('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Autoload el cromo asociado a :cromoId
exports.load = async (req, res, next, cromoId) => {

    try {
        const client = await pool.connect();
        const cromo = await client.query('SELECT '+ cromoId+ ' FROM stickers');
        if (cromo) {
            req.load = {...req.load, cromo};
            next();
        } else {
            throw new Error('There is no cromo with id=' + cromoId);
        }
    } catch (error) {
        next(error);
    }
};


// GET /cromos
exports.index = async (req, res, next) => {

    try {
        const client = await pool.connect();
        const cromos = await client.query(('SELECT * FROM stickers'));
        res.render('cromos/index.ejs', cromos);
        client.release();
    } catch (error) {
        next(error);
    }
};

