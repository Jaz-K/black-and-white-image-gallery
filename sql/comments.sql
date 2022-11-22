DROP TABLE IF EXISTS comments;

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    comment TEXT,
    image_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO comments (username, comment, image_id) VALUES (
    'Bob',
    'Nice image Bro!',
    1
);

INSERT INTO comments (username, comment, image_id) VALUES (
    'Susi',
    'I love it!',
    2
);

INSERT INTO comments (username, comment, image_id) VALUES (
    'Coco',
    'O_O cool',
    3
);