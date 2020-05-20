/* eslint-disable no-undef */
import dotenv from 'dotenv';

dotenv.config();

const accessEnv = (key) => {
	if (process.env[key] === undefined) {
		throw new Error(`${key} do not exist in env file !!!`);
	}
	return process.env[key];
};

export default accessEnv;