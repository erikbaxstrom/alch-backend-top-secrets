-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);



DROP TABLE IF EXISTS secrets;

CREATE TABLE secrets (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO secrets (title, description)
VALUES 
('Favorite Colors', 'Purple, red, chartreuse'),
('Evan', 'Evan stole my snack pack today at lunch, and it was not nice. He is such a meanie.'),
('M&M', 'Bobby was eating Skittles at the basketball game and he dropped one. I asked if he was going to eat it. He said no thats gross the bleachers are never cleaned. So I picked it up and ate it -- AND IT WAS AN M&M!!!'),
('Christmas', 'I saw mommy kissing santa clause. Daddy is gonna be sooooo mad. ');
