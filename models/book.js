// requirements
'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Book extends Sequelize.Model {}
    Book.init({
        title: {
            type: Sequelize.STRING,
            validate: {
                allowNull: false
            }
        },
        author: {
            type: Sequelize.STRING,
            validate: {
                allowNull: false
            }
        },
        year: Sequelize.INTEGER
    }, { sequelize });

    return Book;

}