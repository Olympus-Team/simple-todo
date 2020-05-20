import Sequelize from 'sequelize';
import accessEnv from '../helpers/AccessEnv';

const sequelize = new Sequelize(
  accessEnv('MYSQL_DATABASE_NAME'),
  accessEnv('MYSQL_USER_ROOT'), 
  accessEnv('MYSQL_ROOT_PASSWORD'), {
    host: accessEnv('MYSQL_HOST'),
    dialect: 'mysql',
    operatorsAliases: false,
  });
module.exports = sequelize;
