const express = require("express");
const cors = require("cors");
const posts = require("./data/mockData.json");

const { errorHandler } = require("./middleware/errorHandler.js");
const { asyncWrapper } = require("./utils/asyncWrapper.js");
const { response } = require("./utils/response.js");

const app = express();

app.use(cors());
app.use(express.json());

// GET all posts
app.get("/api/blogs", asyncWrapper(async (req, res) => {
    // FIXME! switch after connecting to db
    // const data = await posts.findAll();
    const data = posts;
    // fail
    if (!data || data.length === 0) {
        const err = new Error("No blogs found");
        err.status = 404;
        throw err;
    }
    // success
    response(res, 200, 'success', `All blog fetched successfully`, data);
}));

// GET single post by id
app.get("/api/blogs/:id", asyncWrapper(async (req, res) => {
    // FIXME! switch after connecting to db
    // const data = await posts.findById(req.params.id);
    const data = posts.find(p => p.id == req.params.id);
    // fail
    if (!data) {
        const err = new Error(`Blog ID: ${req.params.id} not found`);
        err.status = 404;
        throw err;
    }
    //success
    response(res, 200, 'success', `Blog ID: ${req.params.id} fetched successfully`, data);
}))

// ERROR
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
})