const { failResponse } = require("../utils/response.js");

const errorHandler = (err, req, res, next) => {
    console.error({
        message: err.message,
        ...(process.env.NODE_ENV === "development" && {stack: err.stack}),
    });

    if (err.name === "ValidationError") {
        const errors = {};

        Object.values(err.errors).forEach(val => {
            errors[val.path] = val.message;
        })

        return failResponse(res, 400, "Validation failed", errors);
    }
    if (err.name === "CastError") {
        const errors = {};
        errors[err.path] = "Invalid value";
        return failResponse(res, 400, "Invalid request data", errors);
    }

    const code = err.statusCode || 500;

    const message = process.env.NODE_ENV === "development" ? err.message : code >= 500 ? "Internal server error" : err.message;
    
    failResponse(res, code, message, err.errors || {});
};

module.exports = { errorHandler };