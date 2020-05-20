/**
 * Author: Quang
 * return a error code
 * 
 * @param {import('express').Response} res
 */
const getErrorCode = (res, code, data)=> {
    return res.status(code).json(data); 
};

export default getErrorCode;