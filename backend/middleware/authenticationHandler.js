const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError.js");

const authenticationHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new AppError("No token", 401);

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "thereIsNoSecretIngredient");
        req.user = decoded;
        next();
    } catch (err) {
        throw new AppError("Invalid token", 401)
    }
};

module.exports = authenticationHandler;