const Sequelize = require('sequelize');
const dbconfig = require('./dbconfig');

const sequelize = new Sequelize( dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, 
    { 
        host: dbconfig.HOST, dialect: dbconfig.dialect, operatorsAliases: false, pool: dbconfig.pool
    });

module.exports = sequelize;