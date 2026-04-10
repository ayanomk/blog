const { failResponse } = require("../utils/response.js");

const errorHandler = (err, req, res, next) => {
    console.error({
        message: err.message,
        ...(process.env.NODE_ENV === "development" && {stack: err.stack}),
    });

    if (err.name === "ValidationError") {
        const msg = Object.values(err.errors).map(val => val.message);
        return failResponse(res, 400, msg);
    }
    if (err.name === "CastError") {
        return failResponse(res, 400, "Invalid ID");
    }

    const code = err.statusCode || 500;

    const message = process.env.NODE_ENV === "development" ? err.message : code >= 500 ? "Internal server error" : err.message;
    
    failResponse(res, code, message);
};

module.exports = { errorHandler };