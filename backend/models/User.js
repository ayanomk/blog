const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: { type: String, require: true, unique: true},
    password: { type: String, rquire: true }
});

module.exports = mongoose.model("User", userSchema);