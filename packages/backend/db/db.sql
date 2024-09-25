CREATE database todos;

\ connect todos;

CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR(100) NOT NULL UNIQUE,
  "name" VARCHAR(50),
  "password" VARCHAR
  "isverified" BOOLEAN DEFAULT FALSE,
  "verificationtoken" VARCHAR(255)
);

CREATE TABLE "Todo" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(50),
  "text" VARCHAR(500) DEFAULT '',
  "isComplete" BOOLEAN DEFAULT FALSE,
  "isPublic" BOOLEAN DEFAULT FALSE,
  "userId" INTEGER,
  FOREIGN KEY ("userId") REFERENCES "User"("id")
);