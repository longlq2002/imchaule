const blogsRouter = require("express").Router();

blogsRouter.get("/", (req, res) => {
    res.sendFile("pages/admin/blogs.html", { root: "public" });
});

blogsRouter.get("/editor", (req, res) => {
    res.sendFile("pages/admin/blogs-editor.html", { root: "public" });
});

blogsRouter.get("/:id", (req, res) => {
    res.sendFile("pages/admin/blogs-editor-blog.html", { root: "public" });
});

module.exports = blogsRouter;
