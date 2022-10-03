const blogsRouter = require("express").Router();
const fs = require("fs");
const slugify = require("slugify");

blogsRouter.get("/", (req, res) => {
    const page = Number(req.query.page);

    try {
        const json = fs.readFileSync("blogs.json");
        const blogs = JSON.parse(json);

        const pagination = {
            allowPrevious: page > 1,
            allowNext: page < Math.ceil(blogs.length / 10),
        };

        const firstTenBlogs = page ? blogs.splice((page - 1) * 10, 10) : blogs;

        res.json({ blogs: firstTenBlogs, pagination });
    } catch (err) {
        console.log(err);
    }
});

blogsRouter.get("/:id", (req, res, next) => {
    if (isNaN(req.params.id)) {
        next();
        return;
    }

    try {
        const json = fs.readFileSync("blogs.json");
        const blogs = JSON.parse(json);

        const blog = blogs.find(blog => blog.id === Number(req.params.id));

        res.json({ blog });
    } catch (err) {
        console.log(err);
    }
});

blogsRouter.get("/:slug", (req, res) => {
    try {
        const json = fs.readFileSync("blogs.json");
        const blogs = JSON.parse(json);

        const blog = blogs.find(blog => blog.slug === req.params.slug);

        res.json({ blog });
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

        res.json({ blog });
    } catch (err) {
        console.log(err);
    }
});

blogsRouter.patch("/:id", (req, res) => {
    try {
        const json = fs.readFileSync("blogs.json");
        const blogs = JSON.parse(json);

        const blogIndex = blogs.findIndex(blog => blog.id === Number(req.params.id));

        blogs[blogIndex].title = req.body.title;
        blogs[blogIndex].slug = slugify(req.body.title, { lower: true });
        blogs[blogIndex].article = req.body.article;
        blogs[blogIndex].bannerImage = req.body.bannerImage;

        fs.writeFileSync("blogs.json", JSON.stringify(blogs));

        res.json({ blog: blogs[blogIndex] });
    } catch (err) {
        console.log(err);
    }
});

blogsRouter.delete("/:id", (req, res) => {
    try {
        const json = fs.readFileSync("blogs.json");
        const blogs = JSON.parse(json);

        blogs.splice(blogs.findIndex(work => work.id === Number(req.params.id)), 1);

        fs.writeFileSync("blogs.json", JSON.stringify(blogs));

        res.json({ blogs });
    } catch (err) {
        console.log(err);
    }
});

module.exports = blogsRouter;