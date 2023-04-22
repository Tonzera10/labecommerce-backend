-- Active: 1679961504303@@127.0.0.1@3306
DROP TABLE users;

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createdAt TEXT DEFAULT(DATETIME('now', 'localtime'))
);

INSERT INTO users(id, name email, password)
VALUES
("u001", "Arthur", "arthur@gmail.com", "54321")
("u002", "Ton", "tom@gmail.com", "gremio"),
("u003", "Mel", "mel@gmail.com", "12345"),
("u004", "Jeff", "jeff@gmail.com", "54321");

SELECT * FROM users;

DROP TABLE products;

CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL
);

INSERT INTO products(id, name, price, description, imageUrl)
VALUES
("p015", "Xis Filé", 33, "Pão, filé, maionese, salada, grãos e batata palha", "https://pontoxis.com.br/online/wp-content/uploads/2017/11/2018-08-31-23.29.11.png");


SELECT * FROM products;

-- Aula aprofundamento sql
--Exercício 1

SELECT * FROM users; -- retorna todos os usuários cadastrados

SELECT * FROM products; -- retorna todos os produtos cadastrados

SELECT * FROM products WHERE name = "Xis Salada"; -- retorna o resultado baseado no termo de busca

INSERT INTO users(id, name, email, password)
VALUES("u006", "Matheus", "matheus@gmail.com", "12345"); -- insere o item mockado na tabela users

INSERT INTO products(id, name, price, description, imageUrl)
VALUES
("p015", "Xis Filé", 33, "Pão, filé, maionese, salada, grãos e batata palha", "https://pontoxis.com.br/online/wp-content/uploads/2017/11/2018-08-31-23.29.11.png"); -- insere o item mockado na tabela products

-- Exercício 2

SELECT * FROM products WHERE id = "p002"; --busca baseada no valor mockado

DELETE FROM users WHERE id = "u001"; -- delete a linha baseada no valor mockado

DELETE FROM products WHERE id = "p005"; -- delete a linha baseada no valor mockado

UPDATE users SET password = "1158" WHERE id = "u002"; -- edite a linha baseada nos valores mockados

UPDATE products SET name = "Hamburguer" WHERE id = "p001"; -- edite a linha baseada nos valores mockados

-- Exercício 3

SELECT * FROM users ORDER BY email ASC; -- retorna o resultado ordenado pela coluna email em ordem crescente

SELECT * FROM products ORDER BY price ASC LIMIT 4 OFFSET 0; --retorna o resultado ordenado pela coluna price em ordem crescente, limite o resultado em 4 iniciando pelo primeiro item

SELECT * FROM products WHERE price > 20 AND price < 30 ORDER BY price ASC; -- mocke um intervalo de preços, por exemplo entre 100.00 e 300.00, retorna os produtos com preços dentro do intervalo mockado em ordem crescente.

--Aula Relações sql 1
-- exercício 1
DROP TABLE purchases;

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME('now', 'localtime')),
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

-- exercíco  2

INSERT INTO purchases (id, total_price, buyer_id)
VALUES
("pur001", 54, "u002"), -- 1 xis salada, 1 xis coração e 1 refri
("pur002", 47, "u003"), -- 1 torrada especial e 1 bauru
("pur003", 36, "u001"), -- 1 cachorro quente e um xis frango
("pur004", 59, "u004"), -- 2 xis bacon e um refri

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
('pur001', 'p001', 2),
('pur002', 'p002', 1),
('pur003', 'p004', 1),
('pur004', 'p004', 2),
('pur005', 'p006', 1),
('pur006', 'p005', 3);

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