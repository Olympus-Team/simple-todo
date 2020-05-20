import {DataTypes, Model} from 'sequelize';
import sequelize from '../database/connection';

class Tasks extends Model {}
Tasks.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    taskName: {
        type: DataTypes.STRING
    },
    taskDescriptionl: {
        type: DataTypes.STRING
    },
    dueDate: {
        type: DataTypes.DATE
    }
}, {sequelize});
export default Tasks;