const express = require("express");
const cors = require("cors");
const posts = require("./data/mockData.json");

const app = express();

app.use(cors());
app.use(express.json());

// GET all posts
app.get("/api/blogs", (req, res) => {
    // fail
    if (!posts) return notFoundError(res, "No blogs found");
    //success
    return success(res, "All blogs fetched successfully", posts);
});

// GET single post by id
app.get("/api/blogs/:id", (req, res) => {
    // FIXME! == or ===
    const post = posts.find(p => p.id == req.params.id);
    // fail
    if (!post) return notFoundError(res, `Blog ID: ${req.params.id} not found`);
    // success
    return success(res, `Blog ID: ${req.params.id} fetched successfully`, post);
})

app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
})


// response helpers
const success = (res, message, data, code = 200) => {
    res.status(code).json({
        status: "success",
        message,
        data
    })
};
const notFoundError = (res, message, code = 404) => {
    res.status(code).json({
        status: "error",
        message,
        data: null
    })
};
const badRequestError = (res, message, code = 400) => {
    res.status(code).json({
        status: "error",
        message,
        data: null
    })
};