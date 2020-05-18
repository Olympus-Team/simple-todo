const User = require('../models/users');
const constants = require('../constants/index');
const statusCode = require('http-status-codes');
const errorHandle = require('../libs/ErrorHandler');

/**
 * Author: DucPV
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.createUser = (req, res, next) => {
  let { name, email } = req.body;

  return User.create({ name, email })
    .then((data) => {
      return errorHandle.getErrorCode(res, statusCode.OK, data);
    })
    .catch((err) => {
      next(err);
    });
};

/**
 * Author: DucPV
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getListUser = async (req, res) => {
  return User.findAll()
    .then((data) => {
      return res.statusCode(statusCode.OK).json(data);
    })
    .catch((err) => {
      return errorHandle.getErrorCode(res, statusCode.INTERNAL_SERVER_ERROR, {message: err.message});
    });
};

/**
 * Author: DucPV
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getUserById = async (req, res, next) => {
  let userId = req.params.userId;
  return User.findOne({ where: { id: userId } })
    .then((data) => {
      return res.statusCode(statusCode.OK).json(data);
    })
    .catch((err) => {
      next(err);
    });
};

/**
 * Author: DucPV
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.updateUserById = async (req, res, next) => {
  let userId = req.body.user_id;
  let name = req.body.name;
  return User.findAll({ where: { id: userId } })
    .then((user) => {
      if (user) {
        return User.update({ name: name }, { where: { id: userId } })
          .then((data) => {
            return res.statusCode(statusCode.OK).json(data);
          })
          .catch((err) => {
            next(err);
          });
      }
      return errorHandle.getErrorCode(res, statusCode.OK, {message: constants.DATA_NOT_EXIST});
    })
    .catch((err) => {
      next(err);
    });
};

/**
 * Author: DucPV
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.deleteUser = async (req, res, next) => {
  let userId = req.params.userId;
  return User.destroy({ where: { id: userId } })
    .then((data) => {
      return res.statusCode(statusCode.OK).json(data);
    })
    .catch((err) => {
      next(err);
    });
};
