const Tasks = require("../models/tasks");

const Op = require('sequelize').Op;

// Create and Save a new Tasks
exports.create = (req, res) => {
    if (!req.body.taskName) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
    }
    // Create a Tasks
    const task = {
        user_id: req.body.user_id,
        taskName: req.body.taskName,
        taskDescription: req.body.taskDescription,
        dueDate: req.body.dueDate
    };
    Tasks.create(task)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tasks."
      });
    });
};

// Retrieve all Tasks from the database.
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
            err.message || "Some error occurred while retrieving tasks."
        });
      });
};

// Find a single Tasks with an id
exports.findOne = (req, res) => {
    exports.findOne = (req, res) => {
        const id = req.params.id;
        Tasks.findByPk(id)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message: "Error retrieving Tasks with id=" + id
            });
          });
      };
};

// Update a Tasks by the id in the request
exports.update = (req, res) => {
    const taskName = req.params.taskName;

    Tasks.update(req.body, {
      where: { taskName: taskName }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tasks was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tasks with name=${taskName}. Maybe Tasks was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tasks with name=" + taskName
        });
      });
};

// Delete a Tasks with the specified id in the request
exports.delete = (req, res) => {
    const taskName = req.params.taskName;

    Tasks.destroy({
      where: { taskName: taskName }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tasks was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tasks with name=${taskName}. Maybe Tasks was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tasks with name=" + taskName
        });
      });
};

// Delete all Tasks from the database.
exports.deleteAll = (req, res) => {
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
              err.message || "Some error occurred while removing all tasks."
          });
        });
};

// Find all published Tasks
// exports.findAllPublished = (req, res) => {
//     Tasks.findAll({ where: { active: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tasks."
//       });
//     });
// };