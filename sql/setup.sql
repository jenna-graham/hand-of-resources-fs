-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP table if exists crystals;

CREATE table crystals (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    color VARCHAR NOT NULL,
    zodiac VARCHAR NOT NULL,
    properties VARCHAR NOT NULL
);

INSERT INTO crystals (name, color, zodiac, properties) VALUES
('Snowflake Obsidian', 'black/white', 'Virgo', 'purity and balance'),
('Amethyst', 'purple', 'Capricorn', 'spirituality and meditation'),
('Carnelean', 'red', 'Taurus', 'stabilizing energies'),
('Malachite', 'green', 'Scorpio', 'transformations'),
('Moonstone', 'beige', 'Libra', 'new beginnings and confidence');
