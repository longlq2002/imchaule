const appRouter = require("express").Router();
const basicAuth = require("express-basic-auth");

const apiRouter = require("./api");
const adminRouter = require("./admin");
const blogsRouter = require("./blogs");

const auth = basicAuth({
    users: {
        "admin": "Lycheeteanosugar2008!"
    },
    challenge: true
});

appRouter.use("/api", apiRouter);
appRouter.use("/admin", auth, adminRouter);
appRouter.use("/blogs", blogsRouter);

appRouter.get("/", (req, res) => {
    res.sendFile("pages/index.html", { root: "public" });
});

module.exports = appRouter;