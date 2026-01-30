const { response } = require("../utils/response.js");

const errorHandler = (err, req, res, next) => {
    console.error(err);

    const code = err.statusCode || 500;
    
    response(res, code, 'error', err.message || "Internal server error", err.data || null);
};

module.exports = { errorHandler };