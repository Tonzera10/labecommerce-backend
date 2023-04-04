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

SELECT * FROM users;

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

SELECT * FROM products;

-- Aula aprofundamento sql
--Exercício 1

SELECT * FROM users; -- retorna todos os usuários cadastrados

SELECT * FROM products; -- retorna todos os produtos cadastrados

SELECT * FROM products WHERE name = "Bola"; -- retorna o resultado baseado no termo de busca

INSERT INTO users(id, email, password)
VALUES("Matheus", "matheus@gmail.com", "12345"); -- insere o item mockado na tabela users

INSERT INTO products(id, name, price, category)
VALUES("07", "Braçadeira de capitão", 50, "Acessórios"); -- insere o item mockado na tabela products

-- Exercício 2

SELECT * FROM products WHERE id = "02"; --busca baseada no valor mockado

DELETE FROM users WHERE id = "Ton"; -- delete a linha baseada no valor mockado

DELETE FROM products WHERE id = "05"; -- delete a linha baseada no valor mockado

UPDATE users SET password = "1158" WHERE id = "Arthur"; -- edite a linha baseada nos valores mockados

UPDATE products SET name = "Pelota" WHERE id = "01"; -- edite a linha baseada nos valores mockados

-- Exercício 3

SELECT * FROM users ORDER BY email ASC; -- retorna o resultado ordenado pela coluna email em ordem crescente

SELECT * FROM products ORDER BY price ASC LIMIT 4 OFFSET 0; --retorna o resultado ordenado pela coluna price em ordem crescente, limite o resultado em 4 iniciando pelo primeiro item

SELECT * FROM products WHERE price > 100 AND price < 300 ORDER BY price ASC; -- mocke um intervalo de preços, por exemplo entre 100.00 e 300.00, retorna os produtos com preços dentro do intervalo mockado em ordem crescente.

--Aula Relações sql 1
-- exercício 1
DROP TABLE purchases;

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

-- exercíco  2

INSERT INTO purchases (id, total_price,paid, delivered_at, buyer_id)
VALUES
("1", 300, 0, null, "Arthur"),
("2", 200, 0, null, "Arthur"),
("3", 400, 0, null, "Kieffer"),
("4", 600, 0, datetime('now'), "Kieffer"),
("5", 100, 0, null, "Matheus"),
("6", 500, 0, datetime('now'), "Matheus");

UPDATE purchases SET delivered_at = datetime('now') WHERE purchases.id = "1";

SELECT * FROM purchases;

--exercício 3

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE users.id = "Arthur";