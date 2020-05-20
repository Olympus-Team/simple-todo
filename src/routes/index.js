
import {
  createUser,
  getListUser,
  getUserById,
  deleteUser,
  updateUserById
} from '../controllers/UserController';
import login from '../controllers/AuthController';
import tasks from '../controllers/TaskController.js';

/**
 * @param {import('express').Express} app
 */
const setupRoutes =  (app) => {
  app.post('/login', login);
  
  // api v1 for user
  app.get('/api/v1/users', getListUser);
  app.get('/api/v1/users/:userId', getUserById);
  app.post('/api/v1/users', createUser);
  app.put('/api/v1/users', updateUserById);
  app.delete('/api/v1/user/:userId', deleteUser);

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

export default setupRoutes;