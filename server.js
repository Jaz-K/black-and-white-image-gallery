const path = require("path");
const express = require("express");
const multer = require("multer");
const uidSafe = require("uid-safe");
require("dotenv").config();
// const uploader = require("./api/upload");
const { AWS_BUCKET } = process.env;
const { s3upload, s3delete } = require("./s3");

const app = express();

const { PORT = 8080 } = process.env;
const {
    getImages,
    addImage,
    getImageById,
    getCommentsById,
    addComment,
    loadImagesByClick,
    deleteImage,
    deleteComments,
} = require("./db");

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
    const images = await getImages();
    res.json(images);
});

app.post(
    "/api/upload",
    uploader.single("image"),
    s3upload,
    async (req, res) => {
        const url = `https://s3.amazonaws.com/${AWS_BUCKET}/${req.file.filename}`;
        const image = await addImage({ url, ...req.body });

        if (req.file) {
            res.json(image);
        } else {
            res.json({
                success: false,
            });
        }
    }
);

// images by ID
app.get("/api/:id", async (req, res) => {
    const id = req.params.id;
    const image = await getImageById(id);
    res.json(image);
});

// comments by ID
app.get("/api/comments/:id", async (req, res) => {
    const id = req.params.id;
    const comments = await getCommentsById(id);
    res.json(comments);
});

// add comment
app.post("/api/comment", async (req, res) => {
    const newComment = await addComment({ ...req.body });
    res.json(newComment);
});

//pagination
app.get("/api/loadImages/:lastImageId", async (req, res) => {
    const id = req.params.lastImageId;
    const images = await loadImagesByClick(id);
    res.json(images);
});

// DELETE from AWS

app.post("/api/delete", async (req, res) => {
    try {
        const { fileName, image_id } = req.body;
        await deleteImage(image_id);
        await deleteComments(image_id);
        await s3delete(fileName);
        res.status(200).end();
    } catch (error) {
        console.log("Something went wrong while delete", error);
    }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
