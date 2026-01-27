const express = require("express");
const cors = require("cors");
const posts = require("./data/mockData.json");

const app = express();

app.use(cors());
app.use(express.json());

// GET all posts
app.get("/api/blogs", (req, res) => {
    res.json(posts);
});

// GET single post by id
app.get("/api/blogs/:id", (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    if (!post) {
        return res.status(404).json({ error: "Blog not found" });
    }
    res.json(post);
})

app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
})