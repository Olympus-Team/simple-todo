const Sequelize = require('sequelize');
// const dbconfig = require('./dbconfig');

const sequelize = new Sequelize(
    'todos', 'root', '123456',
    {host : 'localhost', dialect : 'mysql', operatorsAliases : false});
module.exports = sequelize;