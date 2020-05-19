/* eslint-disable no-undef */
const dotenv = require('dotenv');

dotenv.config();

exports.accessEnv = (key) => {
  if (process.env[key] === undefined) {
    throw new Error(`${key} do not exist in env file !!!`);
  }
  return process.env[key];
};
