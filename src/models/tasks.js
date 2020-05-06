const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

module.exports = sequelize.define("Tasks", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: { allowNull: false, type: Sequelize.INTEGER },
  taskName: { type: Sequelize.STRING },
  taskDescription: { type: Sequelize.STRING },
  dueDate: { type: Sequelize.DATE },
});
