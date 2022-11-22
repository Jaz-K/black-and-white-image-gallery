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
    ORDER BY id DESC
    LIMIT 4
    `);
    return result.rows;
}

// get image by ID

async function getImageById(id) {
    const result = await db.query(
        `
    SELECT * FROM images
    WHERE id = $1
    `,
        [id]
    );
    return result.rows[0];
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

async function addComment({ username, comment, image_id }) {
    const result = await db.query(
        `
    INSERT INTO(username, comment, image_id)
    VALUES($1,$2,$3)
    RETURNING *
    `,
        [username, comment, image_id]
    );
    return result.rows[0];
}

async function getCommentsById(image_id) {
    const result = await db.query(
        `
    SELECT * FROM comments
    WHERE image_id = $1
    `,
        [image_id]
    );
    return result.rows;
}

module.exports = {
    getImages,
    getImageById,
    addImage,
    getCommentsById,
    addComment,
};
