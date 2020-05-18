const Tasks = require('../models/tasks');
const Op = require('sequelize').Op;
const statusCode = require('http-status-codes');
const errorHandle = require('../libs/ErrorHandler');

/**
 * Author: Quang
 * Create and Save a new Tasks
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
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
      return errorHandle.getErrorCode(res, statusCode.OK, data);
    })
    .catch(err => {
      return errorHandle.getErrorCode(res, statusCode.INTERNAL_SERVER_ERROR, {message: err.message});
    });
};

/**
 * Author: Quang
 * Retrieve all Tasks from the database.
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.findAll = (req, res) => {
    const taskName = req.query.taskName;
    var condition = taskName ? { taskName: { [Op.like]: `%${taskName}%` } } : null;
  
    Tasks.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving tasks.'
        });
      });
};

/**
 * Author: Quang
 * Find a single Tasks with an id
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.findOne = (req, res) => {
    const id = req.params.id;
        Tasks.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(() => {
            res.status(500).send({
            message: 'Error retrieving Tasks with id=' + id
        });
    });
};

/**
 * Author: Quang
 * Update a Tasks by the id in the request
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.update = (req, res) => {
    const taskName = req.params.taskName;

    Tasks.update(req.body, {
      where: { taskName: taskName }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: 'Tasks was updated successfully.'
          });
        } else {
          res.send({
            message: `Cannot update Tasks with name=${taskName}. Maybe Tasks was not found or req.body is empty!`
          });
        }
      })
      .catch(() => {
        res.status(500).send({
          message: 'Error updating Tasks with name=' + taskName
        });
      });
};

/**
 * Author: Quang
 * Delete a Tasks with the specified id in the request
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.delete = (req, res) => {
    const taskName = req.params.taskName;

    Tasks.destroy({
      where: { taskName: taskName }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: 'Tasks was deleted successfully!'
          });
        } else {
          res.send({
            message: `Cannot delete Tasks with name=${taskName}. Maybe Tasks was not found!`
          });
        }
      })
      .catch(() => {
        res.status(500).send({
          message: 'Could not delete Tasks with name=' + taskName
        });
      });
};

/**
 * Author: Quang
 * Delete all Tasks from the database.
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports.deleteAll = (req, res) => {
    Tasks.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Tasks were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while removing all tasks.'
          });
        });
};