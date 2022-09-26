const blogsRouter = require("express").Router();

blogsRouter.get("/:slug", (req, res) => {
    res.sendFile("pages/blog.html", { root: "public" });
})

module.exports = blogsRouter;