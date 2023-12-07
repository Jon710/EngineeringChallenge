CREATE DATABASE bellsant;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE machine_data (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    created_at TIMESTAMP NOT NULL,
    data jsonb NOT NULL,
    CONSTRAINT "fk_machine_data_users" FOREIGN KEY ("user_id") REFERENCES "users"("id")
);