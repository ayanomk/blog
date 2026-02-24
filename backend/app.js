const express = require("express");
const cors = require("cors");

const { connectDB } =require("./config/db.js");

const { errorHandler } = require("./middleware/errorHandler.js");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
})

// BLOG
const blogRoutes = require("./routes/blogRoutes.js");
app.use('/api/blogs', blogRoutes);
// ADMIN BLOG
const adminRoutes = require("./routes/adminRoutes.js");
app.use('/api/admin/blogs', adminRoutes);

// ERROR
app.use(errorHandler);
