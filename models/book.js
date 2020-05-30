// requirements
'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Book extends Sequelize.Model {}
    Book.init({
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                // tried variations of { msg: "title required" } but causes errors
            }
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        genre: Sequelize.STRING,
        year: Sequelize.INTEGER
    }, { sequelize });

    return Book;

};