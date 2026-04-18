const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError.js");

const authenticationHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new AppError("No token", 401);

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (req.user.role !== 'Admin') {
            throw new AppError("Forbidden", 403);
        }

        next();
    } catch (err) {
        throw new AppError(err.message || "Invalid token", err.statusCode || 401)
    }
};

module.exports = authenticationHandler;