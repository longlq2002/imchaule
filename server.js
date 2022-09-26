const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");

const appRouter = require("./router");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload());

app.use("/", appRouter);

app.use((req, res) => {
    res.json("404");
});

app.listen("3000", () => {
    console.log("listening......");
});