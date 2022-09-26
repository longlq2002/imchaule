const adminRouter = require("express").Router();

const adminBlogsRouter = require("./blogs");
const adminPortfolioRouter = require("./portfolio");

adminRouter.use("/blogs", adminBlogsRouter);
adminRouter.use("/portfolio", adminPortfolioRouter);

adminRouter.get("/", (req, res) => {
    res.sendFile("pages/admin/index.html", { root: "public" });
});


module.exports = adminRouter;