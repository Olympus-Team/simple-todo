import Tasks from '../models/tasks';
import Op from 'sequelize';
import {OK, INTERNAL_SERVER_ERROR, ACCEPTED} from 'http-status-codes';
import errorHandle from '../libs/ErrorHandler';
import constants from '../constants/index';

/**
 * Author: Quang
 * Create and Save a new Tasks
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.create = (req, res) => {
   // Create a Tasks
   const task = {
      user_id: req.body.user_id,
      taskName: req.body.taskName,
      taskDescriptionl: req.body.taskDescriptionl,
      dueDate: req.body.dueDate
   };
   Tasks.create(task)
      .then(data => {
         return errorHandle.getErrorCode(res, OK, data);
      })
      .catch(err => {
         return errorHandle.getErrorCode(res, INTERNAL_SERVER_ERROR, { message: err.message });
      });
};

/**
 * Author: Quang
 * Retrieve all Tasks from the database.
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.findAll = (req, res) => {
   const taskName = req.query.taskName;
   var condition = taskName ? { taskName: { [Op.like]: `%${taskName}%` } } : null;
   Tasks.findAll({ where: condition })
      .then(data => {
         return res.status(OK).json(data);
      })
      .catch(err => {
         return errorHandle.getErrorCode(res, INTERNAL_SERVER_ERROR, { message: err.message });
      });
};

/**
 * Author: Quang
 * Find a single Tasks with an id
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.findOne = (req, res) => {
   const id = req.params.id;
   Tasks.findByPk(id)
      .then(data => {
         return res.status(OK).json(data);
      })
      .catch((err) => {
         return errorHandle.getErrorCode(res, INTERNAL_SERVER_ERROR, { message: err.message });
      });
};

/**
 * Author: Quang
 * Update a Tasks by the id in the request
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.update = (req, res) => {
   const taskName = req.params.taskName;

   Tasks.update(req.body, {
      where: { taskName: taskName }
   })
      .then(num => {
         if (num == 1) {
            return res.status(OK).json({ message: constants.SEND_SUCCESSFULLY });
         } else {
            return res.status(ACCEPTED).json({ message: constants.SEND_ERROR});
         }
      })
      .catch((err) => {
         errorHandle.getErrorCode(res, INTERNAL_SERVER_ERROR, {message: err.message});
      });
};

/**
 * Author: Quang
 * Delete a Tasks with the specified id in the request
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.delete = (req, res) => {
   const taskName = req.params.taskName;

   Tasks.destroy({
      where: { taskName: taskName }
   })
      .then(num => {
         if (num == 1) {
            return res.status(OK).json({ message: constants.SEND_SUCCESSFULLY });
         } else {
            return res.status(ACCEPTED).json({ message: constants.SEND_ERROR});
         }
      })
      .catch((err) => {
         errorHandle.getErrorCode(res, INTERNAL_SERVER_ERROR, {message: err.message});
      });
};

/**
 * Author: Quang
 * Delete all Tasks from the database.
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
module.exports.deleteAll = (req, res) => {
   Tasks.destroy({
      where: {},
      truncate: false
   })
      .then(() => {
         return res.status(OK).json({ message: constants.SEND_SUCCESSFULLY });
      })
      .catch(err => {
         errorHandle.getErrorCode(res, INTERNAL_SERVER_ERROR, {message: err.message});
      });
};