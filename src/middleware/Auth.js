const jwt = require("jsonwebtoken");
const constanst = require("../constants/index");

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports.checkAuthorize = (req, res, next) => {
  let bearer = req.get("Authorization");
  if (bearer) {
    let token = bearer.split(" ")[1];
    let payload = jwt.verify(token, constanst.SECRET_KEY);
    req.current_user = payload.email;
    next();
  }
  return res.status(401).json({ message: constanst.AUTHORIZATION });
};
