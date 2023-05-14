import { randomUUID } from 'crypto';
import mysql2 from 'mysql2/promise';

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const connection = await mysql2.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: 3306,
        user: 'test',
        password: 'test',
        database: 'finalProjectSubst',
        multipleStatements: true,
      } );
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

async function getAllProducts(){
    const conn = await connect();
    
    const query = `SELECT * FROM products LIMIT 1000;`;
    console.log(`Executando query: ${query}`);

    const [rows, fields] = await connection.execute(query);
    console.log(`Rows: ${JSON.stringify(rows)}`);
    return rows;
}

async function getProductById(id){
    const conn = await connect();
    
    const query = `SELECT * FROM products WHERE id = "${id}";`;
    console.log(`Executando query: ${query}`);
    
    const [rows, fields] = await connection.execute(query);

    return rows;
}


async function updateProductById(id, name, description, value){
    try{
        const conn = await connect();
    
        const query = `UPDATE products SET name = "${name}", description = "${description}", value = ${value} WHERE id = "${id}";`;
        console.log(`Executando query: ${query}`);
        
        const [rows] = await conn.execute(query);
        return rows;
    }catch(err){
        throw {code: 500, message: 'Erro inesperado ao tentar cadastrar usuário'};
    }
}

async function deleteProductById(id){
    const conn = await connect();
    
    const query = `DELETE FROM products WHERE id = "${id}";`;
    console.log(`Executando query: ${query}`);

    await connection.execute(query);
}

async function insertProduct(name, description, value){
    const conn = await connect();

    const query = `INSERT INTO products(id, name, description, value) VALUES ("${randomUUID()}", "${name}", "${description}", ${value});`;
    console.log(`Executando query: ${query}`);

    try{
        await connection.execute(query);
    }catch(err){
        if(err.errno === 1062){
            throw {code: 400, message: 'Já existe um producte cadastrado com este usuário!'};
        }else{
            throw {code: 500, message: 'Erro inesperado ao tentar cadastrar usuário'};
        }
    }
}

export default {getProductById, getAllProducts, insertProduct, updateProductById, deleteProductById}
