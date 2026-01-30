// response helpers
const response = (res, code, status, message, data) => {
    res.status(code).json({
        status,
        message,
        data
    })
};

module.exports = { response };