const { failResponse } = require("../utils/response.js");

const errorHandler = (err, req, res, next) => {
    console.error({
        message: err.message,
        ...(process.env.NODE_ENV === "development" && {stack: err.stack}),
    });    

    const code = err.statusCode || 500;

    const message = process.env.NODE_ENV === "development" ? err.message : code >= 500 ? "Internal server error" : err.message;
    
    failResponse(res, code, message);
};

module.exports = { errorHandler };