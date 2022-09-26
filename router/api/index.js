const apiRouter = require("express").Router();

const apiUploadRouter = require("./upload");
const apiBlogsRouter = require("./blogs");
const apiPortfolioRouter = require("./portfolio");
const apiEmailRouter = require("./email");

apiRouter.use("/upload", apiUploadRouter);
apiRouter.use("/blogs", apiBlogsRouter);
apiRouter.use("/portfolio", apiPortfolioRouter);
apiRouter.use("/email", apiEmailRouter);

module.exports = apiRouter;