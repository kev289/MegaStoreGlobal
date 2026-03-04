CREATE DATABASE IF NOT EXISTS MegaStoreGlobal;
USE MegaStoreGlobal;

CREATE TABLE clients (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) UNIQUE NOT NULL,
    customer_address VARCHAR(250),
    customer_phone VARCHAR(30) 
);

CREATE TABLE supplier (
    supplier_id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_name VARCHAR(100) NOT NULL,
    supplier_email VARCHAR(100)
);

CREATE TABLE products (
    product_sku VARCHAR(50) PRIMARY KEY,
    product_name VARCHAR(150) NOT NULL,
    unit_price FLOAT NOT NULL,
    product_category VARCHAR(50),
    supplier_id INT
);

CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    date DATETIME NOT NULL,
    customer_id INT,
    product_category VARCHAR(50),
    total_line_value FLOAT
);

CREATE TABLE transaction_details (
    details_id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id INT NOT NULL,
    product_sku VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    unit_price FLOAT NOT NULL
);


--TUVE UN ERROR CON UN DECIMAL Y ERA FLOAT, PREFIERO ELIMINAR LO QUE SON REFERENCIAS DE FOREING KEY POR POSIBLES ERRORES 