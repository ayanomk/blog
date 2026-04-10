// response helpers
const successResponse = (res, message, data) => {
    res.status(200).json({
        status: 'success',
        message,
        data
    })
};

const failResponse = (res, code = 500, message, errors = {}) => {
    res.status(code).json({
        status: 'fail',
        message,
        errors
    })
};

module.exports = { successResponse, failResponse };