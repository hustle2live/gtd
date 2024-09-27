CREATE database todos;

\ connect todos;

CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR(100) NOT NULL UNIQUE,
  "name" VARCHAR(50),
  "password" VARCHAR(255) NOT NULL,
  "isverified" BOOLEAN DEFAULT FALSE,
  "verificationtoken" VARCHAR(255)
);

CREATE TABLE "Todo" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(150),
  "text" VARCHAR(500) DEFAULT '',
  "isComplete" BOOLEAN DEFAULT FALSE,
  "isPublic" BOOLEAN DEFAULT FALSE,
  "userId" INTEGER,
  FOREIGN KEY ("userId") REFERENCES "User"("id")
);


-- for SQL


-- CREATE TABLE User (
--   id SERIAL PRIMARY KEY,
--   email VARCHAR(100) NOT NULL UNIQUE,
--   name VARCHAR(50),
--   password VARCHAR(255) NOT NULL,
--   isverified BOOLEAN DEFAULT FALSE,
--   verificationtoken VARCHAR(255)
-- );


-- CREATE TABLE Todo(
--   id SERIAL PRIMARY KEY,
--   title VARCHAR(150) NOT NULL,
--   text VARCHAR(500) DEFAULT '',
--   isComplete BOOLEAN DEFAULT FALSE,
--   isPublic BOOLEAN DEFAULT FALSE,
--   userId INTEGER REFERENCES User(id)
-- );