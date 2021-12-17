const { randomUUID } = require('crypto');

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: 3306,
        user: 'test',
        password: 'test',
        database: 'finalProject',
        multipleStatements: true
      } );
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

async function getAllClients(){
    const conn = await connect();
    
    const query = `SELECT * FROM clients LIMIT 1000;`;
    console.log(`Executando query: ${query}`);

    const [rows, fields] = await connection.execute(query);
    console.log(`Rows: ${JSON.stringify(rows)}`);
    return rows;
}

async function getClientById(id){
    const conn = await connect();
    
    const query = `SELECT * FROM clients WHERE id = "${id}";`;
    console.log(`Executando query: ${query}`);
    
    const [rows, fields] = await connection.execute(query);

    return rows;
}


async function updateClientById(id, user, password){
    try{
        const conn = await connect();
    
        const query = `UPDATE clients SET user = "${user}", password = "${password}" WHERE id = "${id}";`;
        console.log(`Executando query: ${query}`);
        
        const [rows] = await conn.execute(query);
        return rows;
    }catch(err){
        throw {code: 500, message: 'Erro inesperado ao tentar cadastrar usuário'};
    }
}

async function deleteClientById(id){
    const conn = await connect();
    
    const query = `DELETE FROM clients WHERE id = "${id}";`;
    console.log(`Executando query: ${query}`);

    await connection.execute(query);
}

async function insertClient(user, password){
    const conn = await connect();

    const query = `INSERT INTO clients(id, user, password) VALUES ("${randomUUID()}", "${user}", "${password}");`;
    console.log(`Executando query: ${query}`);

    try{
        await connection.execute(query);
    }catch(err){
        if(err.errno === 1062){
            throw {code: 400, message: 'Já existe um cliente cadastrado com este usuário!'};
        }else{
            throw {code: 500, message: 'Erro inesperado ao tentar cadastrar usuário'};
        }
    }
}

module.exports = {getClientById, getAllClients, insertClient, updateClientById, deleteClientById}
