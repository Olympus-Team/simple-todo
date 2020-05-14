const controller = require('../controllers/UserController');
const auth = require('../controllers/AuthController');
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
};
