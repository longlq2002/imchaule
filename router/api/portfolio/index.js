const portfolioRouter = require("express").Router();
const fs = require("fs");
const slugify = require("slugify");

portfolioRouter.get("/", (req, res) => {
    const page = Number(req.query.page);

    try {
        const json = fs.readFileSync("portfolio.json");
        const portfolio = JSON.parse(json);

        const pagination = {
            allowPrevious: page > 1,
            allowNext: page < Math.ceil(portfolio.length / 10),
        };

        const firstTenWorks = page ? portfolio.splice((page - 1) * 10, 10) : portfolio;

        res.json({ portfolio: firstTenWorks, pagination });
    } catch (err) {
        console.log(err);
    }
});

portfolioRouter.get("/:id", (req, res) => {
    try {
        const json = fs.readFileSync("portfolio.json");
        const portfolio = JSON.parse(json);

        console.log(portfolio);

        const work = portfolio.find(work => work.id === Number(req.params.id));

        res.json({ work });
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

portfolioRouter.patch("/:id", (req, res) => {
    try {
        const json = fs.readFileSync("portfolio.json");
        const works = JSON.parse(json);

        const workIndex = works.findIndex(work => work.id === Number(req.params.id));

        works[workIndex].title = req.body.title;
        works[workIndex].image = req.body.image;

        fs.writeFileSync("portfolio.json", JSON.stringify(works));

        res.json({ work: works[workIndex] });
    } catch (err) {
        console.log(err);
    }
});

portfolioRouter.delete("/:id", (req, res) => {
    try {
        const json = fs.readFileSync("portfolio.json");
        const works = JSON.parse(json);

        works.splice(works.findIndex(work => work.id === Number(req.params.id)), 1);

        fs.writeFileSync("portfolio.json", JSON.stringify(works));

        res.json({ portfolio: works });
    } catch (err) {
        console.log(err);
    }
});

module.exports = portfolioRouter;
