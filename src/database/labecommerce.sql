-- Active: 1679961504303@@127.0.0.1@3306
DROP TABLE users;

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users(id, email, password)
VALUES
("u001", "tom@gmail.com", "gremio"),
("u002", "arthur@gmail.com", "12345"),
("u003", "kieffer@gmail.com", "54321");

SELECT * FROM users;

DROP TABLE products;

CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products(id, name, price, category)
VALUES
("p001", "Bola", 150, "Acessórios"),
("p002", "Luva", 300, "Acessórios"),
("p003", "Chuteira_Nike", 450, "Calçados"),
("p004", "Camisa_Grêmio", 300, "Roupas"),
("p005", "Bermuda_Grêmio", 150, "Roupas"),
("p006", "Meias_Grêmio", 100, "Roupas");

SELECT * FROM products;

-- Aula aprofundamento sql
--Exercício 1

SELECT * FROM users; -- retorna todos os usuários cadastrados

SELECT * FROM products; -- retorna todos os produtos cadastrados

SELECT * FROM products WHERE name = "Bola"; -- retorna o resultado baseado no termo de busca

INSERT INTO users(id, email, password)
VALUES("u004", "matheus@gmail.com", "12345"); -- insere o item mockado na tabela users

INSERT INTO products(id, name, price, category)
VALUES("p007", "Braçadeira de capitão", 50, "Acessórios"); -- insere o item mockado na tabela products

-- Exercício 2

SELECT * FROM products WHERE id = "p002"; --busca baseada no valor mockado

DELETE FROM users WHERE id = "u001"; -- delete a linha baseada no valor mockado

DELETE FROM products WHERE id = "p005"; -- delete a linha baseada no valor mockado

UPDATE users SET password = "1158" WHERE id = "u002"; -- edite a linha baseada nos valores mockados

UPDATE products SET name = "Pelota" WHERE id = "p001"; -- edite a linha baseada nos valores mockados

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
    delivered_at TEXT DEFAULT(DATETIME('now', 'localtime')),
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

-- exercíco  2

INSERT INTO purchases (id, total_price, paid, buyer_id)
VALUES
("c001", 300, 0, "u002"), --compra de 2 bolas
("c002", 300, 0, "u003"), -- compra de 1 luva
("c003", 300, 0, "u001"), -- comprou 1 camisa 
("c004", 600, 0, "u004"), -- comprou 2 camisa
("c005", 100, 0, "u002"), -- comprou 1 meia
("c006", 450, 0, "u003"); -- comprou 3 bermudas

UPDATE purchases SET delivered_at = DATETIME('now', 'localtime') WHERE purchases.id = "1";

SELECT * FROM purchases;

--exercício 3

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE users.id = "u002";

-- Aula Relações SQL 2
-- exercício 1

CREATE TABLE purchases_products (
    purchases_id TEXT NOT NULL,
    products_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchases_id) REFERENCES purchases(id),
    FOREIGN KEY (products_id) REFERENCES products(id)
);

DROP TABLE purchases_products;

INSERT INTO purchases_products (purchases_id, products_id, quantity)
VALUES
('c001', 'p001', 2),
('c002', 'p002', 1),
('c003', 'p004', 1),
('c004', 'p004', 2),
('c005', 'p006', 1),
('c006', 'p005', 3);

SELECT * FROM purchases
LEFT JOIN purchases_products
ON purchases_products.purchases_id = purchases.id
LEFT JOIN products 
ON purchases_products.products_id = products.id;

SELECT 
purchases_products.quantity,
products.name,
purchases.total_price
 FROM purchases
LEFT JOIN purchases_products
ON purchases_products.purchases_id = purchases.id
LEFT JOIN products 
ON purchases_products.products_id = products.id;