const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User.js");
const AppError = require("../utils/AppError.js");

const authenticateUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({username});
    if (!user) throw new AppError("Invalid credentials");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new AppError("Invalid credentials");

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );

    res.json({token})
}

module.exports = {
    authenticateUser
}