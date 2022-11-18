const path = require("path");
const express = require("express");
const multer = require("multer");
const uidSafe = require("uid-safe");

const app = express();
require("dotenv").config();
const { PORT = 8080 } = process.env;
const { getImages } = require("./db");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "uploads"));
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/images", async (req, res) => {
    // console.log("this is getting called");
    const images = await getImages();
    // console.log("images", images);
    res.json(images);
});

app.post("/upload", uploader.single("file"), (req, res) => {
    console.log("req.body", res.body);
    console.log("req.file", res.file);
    if (req.file) {
        res.json({
            success: true,
        });
    } else {
        res.json({
            success: false,
        });
    }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
