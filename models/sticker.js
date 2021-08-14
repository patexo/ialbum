const {Model} = require('sequelize');

// Definition of the Sticker model:

module.exports = (sequelize, DataTypes) => {

    class Sticker extends Model {}

    Sticker.init({
            title: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Title must not be empty"}}
            },
            description: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Description must not be empty"}}
            }
        }, {
            sequelize
        }
    );

    return Sticker;
};