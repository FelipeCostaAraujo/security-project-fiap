var http = require('http'); 

const express = require('express') 
const app = express()
const port = 3001

const db = require("./db");

var cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cookieParser()); 

app.get('/clients', async (req, res, next) => { 
    var resp = await db.getAllClients();
    res.status(200).json(resp);
});

app.post('/clients', async (req, res, next) => { 

    try{
        var user = req.body.user;
        var password = req.body.password
        await db.insertClient(user, password);
        return res.status(200).json({message: 'Cliente cadastrado com sucesso!'});

    }catch(err){
        return res.status(err.code).json(err);
    }
});

app.get('/clients/:id', async (req, res, next) => { 

    try{
        var id = req.params.id;
        const [rows] = await db.getClientById(id);
        if(rows){
            return res.status(200).send(rows);
        }
        return res.status(404).send(`Cliente ${id} não encontrado!`);
    }catch(err){
        return res.status(err.code).json(err);
    }
});

app.put('/clients/:id', async (req, res, next) => { 

    try{
        var id = req.params.id;

        var user = req.body.user;
        var password = req.body.password;
        
        const rows = await db.updateClientById(id, user, password);
        if(rows){
            return res.status(200).send({message: "Cliente atualizado com sucesso!"});
        }
        return res.status(404).send(`Cliente ${id} atualizado com sucesso!`);
    }catch(err){
        return res.status(err.code).json(err);
    }
});

app.delete('/clients/:id', async (req, res, next) => {

    try{
        var id = req.params.id;
        const users = await db.deleteClientById(id);
        return res.status(200).send({message: `Cliente ${id} deletado com sucesso!`}); 

    }catch(err){
        return res.status(err.code).json(err);
    }
});


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});
