const uploadRouter = require("express").Router();

uploadRouter.get("/", (req, res) => {
    const file = req.files.image;
    const date = new Date();

    const imageName = date.getDate() + date.getTime() + file.name;
    const imagePath = "public/uploads/" + imageName;

    file.mv(imagePath, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.json(`uploads/${imageName}`);
        }
    });
});

module.exports = uploadRouter;
