USE finalProject;

CREATE TABLE clients(
    id VARCHAR(36) PRIMARY KEY, 
    user VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(30) NOT NULL
);

INSERT INTO clients(id, user, password) VALUES 
('1cf641f0-19a1-4699-94f6-5cc45c061ca8', 'admin', 'admin'),
('9dc5bbbd-39f2-49ec-a8c2-7294b31e9385', 'adriana', '@#$%^&'),
('aee94fdd-fa8b-46c7-a6ad-c01e0f1c567e', 'gabriel', '1qw23e'),
('5baaf173-d679-4957-b8c6-1bce40b0ccf5', 'pedro', '!@#$%^&'),
('6cfbfe6c-0151-11ec-9a03-0242ac130003', 'jorge', 'strawberry'),
('e8dfa2c3-5283-40ef-862e-dfb66f12a598', 'joana', 'roadrunner');

CREATE TABLE products(
    id VARCHAR(36) PRIMARY KEY, 
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(150) NOT NULL,
    value FLOAT NOT NULL
);

INSERT INTO products(id, name, description, value) VALUES 
('1cf641f0-19a1-4699-94f6-5cc45c061ca8', 'Mochila', 'Mochila Black com compartimento para notebook', 200),
('9dc5bbbd-39f2-49ec-a8c2-7294b31e9385', 'Notebook', 'Core i9, 16 Gb DDR5', 3999.99),
('aee94fdd-fa8b-46c7-a6ad-c01e0f1c567e', 'Caneta', 'Bic Vermelha', 1.85);

CREATE TABLE orders(
    id VARCHAR(36) PRIMARY KEY,
    clientId VARCHAR(36),
    productId VARCHAR(36),
    amount INT(6),
    CONSTRAINT FK_ClientOrder FOREIGN KEY (clientId) REFERENCES clients(id),
    CONSTRAINT FK_ProductOrder FOREIGN KEY (productId) REFERENCES products(id)
);
