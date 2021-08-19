const Sequelize = require("sequelize");
const {models} = require("../models");

// Autoload el cromo asociado a :cromoId
exports.load = async (req, res, next, cromoId) => {

    try {
        const cromo = await models.Sticker.findByPk(cromoId);
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
        const cromos = await models.Sticker.findAll();
        res.render('cromos/index.ejs', {cromos});
    } catch (error) {
        next(error);
    }
};