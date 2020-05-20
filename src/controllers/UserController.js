import User from '../models/users';
import constants from '../constants/index';
import {OK, INTERNAL_SERVER_ERROR} from 'http-status-codes';
import errorHandle from '../libs/ErrorHandler';

/**
 * Author: DucPV
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const createUser = (req, res) => {
  let { name, email } = req.body;

  return User.create({ name, email })
    .then((data) => {
      return res.status(OK).json(data);
    })
    .catch((err) => {
      return errorHandle.getErrorCode(res, INTERNAL_SERVER_ERROR, {message: err.message});
    });
};

/**
 * Author: DucPV
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getListUser = async (req, res) => {
  return User.findAll()
    .then((data) => {
      return res.status(OK).json(data);
    })
    .catch((err) => {
      return errorHandle.getErrorCode(res, INTERNAL_SERVER_ERROR, {message: err.message});
    });
};

/**
 * Author: DucPV
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getUserById = async (req, res) => {
  let userId = req.params.userId;
  return User.findOne({ where: { id: userId } })
    .then((data) => {
      return res.status(OK).json(data);
    })
    .catch((err) => {
      return errorHandle.getErrorCode(res, INTERNAL_SERVER_ERROR, {message: err.message});
    });
};

/**
 * Author: DucPV
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const updateUserById = async (req, res) => {
  let userId = req.body.user_id;
  let name = req.body.name;
  return User.findAll({ where: { id: userId } })
    .then((user) => {
      if (user) {
        return User.update({ name: name }, { where: { id: userId } })
          .then((data) => {
            return res.status(OK).json(data);
          })
          .catch((err) => {
            return errorHandle.getErrorCode(res, OK, {message: err.message});
          });
      }
      return errorHandle.getErrorCode(res, OK, {message: constants.DATA_NOT_EXIST});
    })
    .catch((err) => {
      return errorHandle.getErrorCode(res, INTERNAL_SERVER_ERROR, {message: err.message});
    });
};

/**
 * Author: DucPV
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const deleteUser = async (req, res) => {
  let userId = req.params.userId;
  return User.destroy({ where: { id: userId } })
    .then((data) => {
      return res.status(OK).json(data);
    })
    .catch((err) => {
      return errorHandle.getErrorCode(res, INTERNAL_SERVER_ERROR, {message: err.message});
    });
};
