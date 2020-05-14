
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
  app.post('/api/v1/user', controller.createUser);
  app.post('/api/v1/user/update', controller.updateUserById);
  app.delete('/api/v1/user/delete/:userId', controller.deleteUser);
  // Create a new Task
  app.post('/api/tasks', tasks.create);
  
  // Retrieve all Tasks
  app.get('/api/tasks', tasks.findAll);

  // Retrieve a single Tasks with id
  app.get('/api/task/:id', tasks.findOne);

  // Update a Tasks with id
  app.put('/api/task/:id', tasks.update);

  // Delete a Tasks with id
  app.delete('/api/task/:id', tasks.delete);

  // Delete all Tasks
  app.delete('/api/tasks', tasks.deleteAll);

};
