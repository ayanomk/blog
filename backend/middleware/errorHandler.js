const { failResponse } = require("../utils/response.js");

const errorHandler = (err, req, res, next) => {
    console.error(err);

    const code = err.statusCode || 500;
    
    failResponse(res, code, err.message || "Internal server error", err.data);
};

module.exports = { errorHandler };