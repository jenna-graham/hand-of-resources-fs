-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE if exists crystals;
DROP TABLE if exists songs;
DROP TABLE if exists animals;
DROP TABLE if exists pets;
DROP TABLE if exists ice_cream;

CREATE table crystals (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    color VARCHAR NOT NULL,
    zodiac VARCHAR NOT NULL,
    properties VARCHAR NOT NULL
);
CREATE TABLE songs (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR NOT NULL,
    artist VARCHAR NOT NULL,
    released INT  
);
CREATE TABLE animals (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    type VARCHAR NOT NULL,
    color VARCHAR NOT NULL,
    origin VARCHAR NOT NULL   
);

CREATE TABLE pets (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    breed VARCHAR NOT NULL,
    age INT
);

CREATE TABLE ice_cream (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    rating INT,
    favorite BOOLEAN   
);

INSERT INTO crystals (name, color, zodiac, properties) VALUES
('Snowflake Obsidian', 'black/white', 'Virgo', 'purity and balance'),
('Amethyst', 'purple', 'Capricorn', 'spirituality and meditation'),
('Carnelean', 'red', 'Taurus', 'stabilizing energies'),
('Malachite', 'green', 'Scorpio', 'transformations'),
('Moonstone', 'beige', 'Libra', 'new beginnings and confidence');

INSERT INTO songs (title, artist, released) VALUES
('Is It a Crime?', 'Sade', 1985),
('Say Yes', 'Floetry', 2002),
('Call My Name', 'Prince', 2004),
('Eternal Light', 'Free Nationals', 2019),
('Orange Moon', 'Erykah Badu', 2000),
('Gaze', 'Sweetback', 1996);

INSERT INTO animals (type, color, origin) VALUES
('tiger', 'orange and black', 'China'),
('sloth', 'light brown', 'South America'),
('alligator', 'green', 'North America'),
('gorilla', 'black', 'Africa'),
('flamingo', 'pink', 'Africa, Asia, Europe');

INSERT INTO pets (name, breed, age) VALUES
('Redd', 'Labradoodle', 2),
('Bolt', 'German Shepard mix', 3),
('Baby Kitty', 'Maine Coone', 12),
('Romeo', 'Goldendoodle', 9);

INSERT INTO ice_cream (name, rating, favorite) VALUES
('Sea Salt w/ Caramel Ribbons', 5, 'true'),
('Arbequina Olive Oil', 5, 'true'),
('Strawberry Honey Balsamic w/ Black Pepper', 4, 'false'),
('Honey Lavender', 4, 'true'),
('Pear & Blue Cheese', 2, 'false');