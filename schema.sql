CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
	position INT NOT NULL AUTO_INCREMENT,
	item_id INT(15) NULL,
	product_name VARCHAR(30) NULL,
	department_name VARCHAR(14) NULL,
	price DECIMAL(8,2) NULL,
	stock_quantity INT(15) NULL,
	PRIMARY KEY (position)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES
(0876, "Komodo Dragon", "Reptile", 5999.99, 3);
