const jwt = require('jsonwebtoken');
const constants = require('../constants/index');
const User = require('../models/users');

/**
 * Author: DucPV
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports.login = (req, res, next) => {
  let {email, password} = req.body;
  return User.findOne({ where: { email: email, password: password } })
    .then((user) => {
      if (user) {
        let token = jwt.sign(user.toJSON(), constants.SECRET_KEY, {expiresIn: 24 * 60 * 60});
        return res.status(200).json({
          token: `Bearer ${token}`,
          user: user
        });
      }
      return res.status(constants.STATUS_CODE_200).json({
        message: constants.EMAIL_PASSWORD_INCORRECT
      });
    })
    .catch((err) => {
      next(err);
    });
};