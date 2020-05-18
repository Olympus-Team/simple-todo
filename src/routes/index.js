
const controller = require('../controllers/UserController');
const auth = require('../controllers/AuthController');
const tasks = require('../controllers/TaskController.js');

/**
 * @param {import('express').Express} app
 */
module.exports.setupRoutes = (app) => {
  app.post('/login', auth.login);

  // api v1 for user
  app.get('/api/v1/users', controller.getListUser);
  app.get('/api/v1/users/:userId', controller.getUserById);
  app.post('/api/v1/users', controller.createUser);
  app.put('/api/v1/users', controller.updateUserById);
  app.delete('/api/v1/user/:userId', controller.deleteUser);

  // Create a new Task
  app.post('/api/v1/tasks', tasks.create);

  // Retrieve all Tasks
  app.get('/api/v1/tasks', tasks.findAll);

  // Retrieve a single Tasks with id
  app.get('/api/v1/task/:id', tasks.findOne);

  // Update a Tasks with id
  app.put('/api/v1/task/:id', tasks.update);

  // Delete a Tasks with id
  app.delete('/api/v1/task/:id', tasks.delete);

  // Delete all Tasks
  app.delete('/api/v1/tasks', tasks.deleteAll);
};
