-- Create Database
CREATE DATABASE coradineUser;

-- Download uuid for id

-- Create TABLE
CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    firstname VARCHAR(150) NOT NULL,
    lastname VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(150) NOT NULL,
    token TEXT 
);

ALTER table users ADD userRole INT NOT NULL;

ALTER table users ADD CONSTRAINT NULL userRole;