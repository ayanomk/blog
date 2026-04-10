const mongoose = require("mongoose");
const Post = require("../models/Post.js");

const User = require("../models/User.js");
const { createUser } = require("../controllers/authenticationController.js");

const { connectDB } =require("../config/db.js");

const seed = async () => {
    try {
        await connectDB();
        await Post.deleteMany({});

        await User.deleteMany({});
        await createUser("ayano", "icecreammonster");

        console.log("Seeded");
    } catch (err) {
        console.log(err);
    } finally {
        mongoose.connection.close();
    }
}

seed();