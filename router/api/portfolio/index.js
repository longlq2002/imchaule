const portfolioRouter = require("express").Router();
const fs = require("fs");
const slugify = require("slugify");

portfolioRouter.get("/", (req, res) => {
    try {
        const json = fs.readFileSync("portfolio.json");
        const portfolio = JSON.parse(json);

        res.json({ portfolio: portfolio });
    } catch (err) {
        console.log(err);
    }
});

portfolioRouter.post("/", (req, res) => {
    try {
        const work = {
            id: Date.now(),
            title: req.body.title,
            image: req.body.image,
            publishedAt: Date.now()
        };

        const json = fs.readFileSync("portfolio.json");
        let works = JSON.parse(json);

        works = [ work, ...works ];

        fs.writeFileSync("portfolio.json", JSON.stringify(works));

        res.json({ portfolio: works });
    } catch (err) {
        console.log(err);
    }
});

module.exports = portfolioRouter;
