/**
 * Author: Quang
 * return a error code
 * 
 * @param {import('express').Response} res
 */
exports.getErrorCode = (res, code, data)=> {
    return res.status(code).json(data); 
};