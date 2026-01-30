const express = require("express");
const cors = require("cors");

const { errorHandler } = require("./middleware/errorHandler.js");

const app = express();

app.use(cors());
app.use(express.json());
app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
})

// BLOG
const blogRoutes = require("./routes/blogRoutes.js");
app.use('/api/blogs', blogRoutes);

// ERROR
app.use(errorHandler);
