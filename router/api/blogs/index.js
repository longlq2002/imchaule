const blogsRouter = require("express").Router();
const fs = require("fs");
const slugify = require("slugify");

blogsRouter.get("/", (req, res) => {
    try {
        const json = fs.readFileSync("blogs.json");
        const blogs = JSON.parse(json);

        res.json({ blogs: blogs });
    } catch (err) {
        console.log(err);
    }
});

blogsRouter.get("/:slug", (req, res) => {
    try {
        const json = fs.readFileSync("blogs.json");
        const blogs = JSON.parse(json);

        const blog = blogs.find(blog => blog.slug === req.params.slug);

        res.json({ blog: blog });
    } catch (err) {
        console.log(err);
    }
});

blogsRouter.post("/", (req, res) => {
    try {
        const blog = {
            id: Date.now(),
            title: req.body.title,
            slug: slugify(req.body.title, { lower: true }),
            article: req.body.article,
            bannerImage: req.body.bannerImage,
            publishedAt: Date.now()
        };

        const json = fs.readFileSync("blogs.json");
        let blogs = JSON.parse(json);

        blogs = [ blog, ...blogs ];

        fs.writeFileSync("blogs.json", JSON.stringify(blogs));

        res.json({ blog: blog });
    } catch (err) {
        console.log(err);
    }
});

module.exports = blogsRouter;