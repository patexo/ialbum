const Sequelize = require("sequelize");
const {models} = require("../models");

// Autoload el sticker asociado a :stickerId
exports.load = async (req, res, next, stickerId) => {

    try {
        const sticker = await models.Sticker.findByPk(stickerId);
        if (sticker) {
            req.load = {...req.load, sticker};
            next();
        } else {
            throw new Error('There is no sticker with id=' + stickerId);
        }
    } catch (error) {
        next(error);
    }
};


// GET /stickers
exports.index = async (req, res, next) => {

    try {
        const stickers = await models.Sticker.findAll();
        res.render('stickers/index.ejs', {stickers});
    } catch (error) {
        next(error);
    }
};


// GET /stickers/:stickerId
exports.show = (req, res, next) => {

    const {sticker} = req.load;

    res.render('stickers/show', {sticker});
};


// GET /stickers/new
exports.new = (req, res, next) => {

    const sticker = {
        title: "",
        description: ""
    };

    res.render('stickers/new', {sticker});
};

// POST /stickers/create
exports.create = async (req, res, next) => {

    const {title, description} = req.body;

    let sticker = models.Sticker.build({
        title,
        description
    });

    try {
        // Saves only the fields titles and description into the DDBB
        sticker = await sticker.save({fields: ["title", "description"]});
        res.redirect('/stickers/' + sticker.id);
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            console.log('There are errors in the form:');
            error.errors.forEach(({message}) => console.log(message));
            res.render('stickers/new', {sticker});
        } else {
            next(error);
        }
    }
};


// GET /stickers/:stickerId/edit
exports.edit = (req, res, next) => {

    const {sticker} = req.load;

    res.render('stickers/edit', {sticker});
};


// PUT /stickers/:stickerId
exports.update = async (req, res, next) => {

    const {body} = req;
    const {sticker} = req.load;

    sticker.title = body.title;
    sticker.description = body.description;

    try {
        await sticker.save({fields: ["title", "description"]});
        res.redirect('/stickers/' + sticker.id);
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            console.log('There are errors in the form:');
            error.errors.forEach(({message}) => console.log(message));
            res.render('stickers/edit', {sticker});
        } else {
            next(error);
        }
    }
};


// DELETE /stickers/:stickerId
exports.destroy = async (req, res, next) => {

    try {
        await req.load.sticker.destroy();
        res.redirect('/stickers');
    } catch (error) {
        next(error);
    }
};
