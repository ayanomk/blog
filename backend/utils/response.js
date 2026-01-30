// response helpers
const successResponse = (res, message, data) => {
    res.status(200).json({
        status: 'success',
        message,
        data
    })
};

const failResponse = (res, code = 500, message, data = null) => {
    res.status(code).json({
        status: 'fail',
        message,
        data
    })
};

module.exports = { successResponse, failResponse };