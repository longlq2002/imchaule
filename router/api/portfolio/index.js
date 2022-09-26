const portfolioRouter = require("express").Router();
const fs = require("fs");

portfolioRouter.get("/portfolio", (req, res) => {
    try {
        const json = fs.readFileSync("portfolio.json");
        const portfolio = JSON.parse(json);

        res.json({ portfolio: portfolio });
    } catch (err) {
        console.log(err);
    }
});

module.exports = portfolioRouter;
