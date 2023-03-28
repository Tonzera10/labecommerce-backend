-- Active: 1679961504303@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users(id, email, password)
VALUES
("Ton", "tom@gmail.com", "gremio"),
("Arthur", "arthur@gmail.com", "12345"),
("Kieffer", "kieffer@gmail.com", "54321");

CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products(id, name, price, category)
VALUES
("01", "Bola", 150, "Acessórios"),
("02", "Luva", 290, "Acessórios"),
("03", "Chuteira", 450, "Calçados"),
("04", "Camisa-Grêmio", 300, "Roupas"),
("05", "Bermuda-Grêmio", 150, "Roupas"),
("06", "Meias-Grêmio", 150, "Roupas");