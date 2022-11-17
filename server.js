const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const { PORT = 8081 } = process.env;

// const { getImages } = require("./db");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/api/images", (req, res) => {
    console.log("this seems to listen");
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
