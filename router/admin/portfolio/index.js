const portfolioRouter = require("express").Router();

portfolioRouter.get("/", (req, res) => {
    res.sendFile("pages/admin/portfolio.html", { root: "public" });
});

portfolioRouter.get("/editor", (req, res) => {
    res.sendFile("pages/admin/portfolio-editor.html", { root: "public" });
});

module.exports = portfolioRouter;
