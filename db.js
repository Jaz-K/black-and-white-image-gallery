const spicedPg = require("spiced-pg");

const { DATABASE_USERNAME, DATABASE_PASSWORD } = process.env;
const DATABASE_NAME = "imageboard";

const db = spicedPg(
    `postgres:${DATABASE_USERNAME}:${DATABASE_PASSWORD}@localhost:5432/${DATABASE_NAME}`
);

// writing a get image function

async function getImages() {
    const result = await db.query(`
    SELECT * FROM images
    `);
    return result.rows;
}

// add image to db

async function addImage({ url, username, title, description }) {
    const result = await db.query(
        `
    INSERT INTO images(url, username, title, description) 
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
        [url, username, title, description]
    );
    return result.rows[0];
}

module.exports = {
    getImages,
    addImage,
};
