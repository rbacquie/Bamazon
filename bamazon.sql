DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id int(10) NOT NULL auto_increment,
  product VARCHAR(50) NULL,
  department VARCHAR(50) NULL,
  price DECIMAL(10,2) NULL,
  quantity integer(10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product, department, price, quantity) values ('Dell 15 I7 CPU Laptop', 'computers', 799.95, 20),
('MSI GAming Laptop', 'computers', 1799.95, 20),
('Nautica Alpha Mens Watch', 'Appreal', 199.95, 20),
('Rolex Date Just Mens Watch', 'Appreal', 4999.95, 20),
('Tommy Shits 2XL', 'Appreal', 79.95, 20),
('ASUS Mother Board ', 'computers', 69.95, 20),
('EVGA 1080 TI GPU', 'computers', 899.95, 20),
('Nautic Jeans 38w', 'Appreal', 49.95, 20),
('ECHO Mens Shirt 2XL', 'Appreal', 49.95, 20),
('Samsung 65" LCD Curved TV', 'Electronics', 2199.95, 20),
('Samsung Home Theater 7.1', 'Electronics', 699.95, 20),
('Dove Conditioner', 'Cosmetics', 6.25, 627),
('Glad 12 Gal Trash Bags', 'Grocery', 5.99, 300),
('Huggies Diapers', 'Children', 2.75, 476),
('Charmin Toilet Paper', 'Grocery', 12.99, 575),
('Pampers Baby Wipes', 'Children', 1.50, 423),
('5lb Dumb bell', 'Sports', 7.99, 89);

SELECT * FROM products;
