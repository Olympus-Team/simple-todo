const jwt = require('jsonwebtoken');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports.checkAuthorize = (req, res, next) => {
  if (req.token) {
    next();
  }
  res.sendStatus(401);
}