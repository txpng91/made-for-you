-- CREATE DATABASE madeforyou

-- Products table
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    title VARCHAR(80) NOT NULL,
    price FLOAT NOT NULL,
    description VARCHAR(255) NOT NULL,
    category VARCHAR(80) NOT NULL,
    image VARCHAR(255)
);

-- Users table
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(25) NOT NULL,
    lastname VARCHAR(25) NOT NULL,
    username VARCHAR(25) NOT NULL,
    password VARCHAR(255) NOT NULL,
    telephone INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a user
INSERT INTO users(firstname, lastname, username, password, telephone)
VALUES ('Pete', 'Garcia', 'txpng91', '91Pet@rva', '8042394544');

-- Carts table
CREATE TABLE carts(
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL REFERENCES users,
    products JSON,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO carts(userId, products) VALUES ()



-- Example for PostgreSQL
INSERT INTO carts (userId, products)
VALUES ('value1', '{"key1": "value1", "key2": "value2"}'::jsonb)
ON CONFLICT (column1) DO UPDATE
SET products = COALESCE(carts.products, '{}'::jsonb) || '{"new_key": "new_value"}'::jsonb;