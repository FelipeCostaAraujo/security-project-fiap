import express from 'express'; 
const app = express()
const port = 3001

import db from "./db";

import cookieParser from 'cookie-parser'; 
import { urlencoded, json } from 'body-parser';

app.use(urlencoded({ extended: true })); 
app.use(json());
app.use(cookieParser()); 

app.get('/products', async (req, res, next) => { 
    var resp = await db.getAllProducts();
    res.status(200).json(resp);
});

app.post('/products', async (req, res, next) => { 

    try{
        var name = req.body.name;
        var description = req.body.description
        var value = req.body.value
        
        await db.insertProduct(name, description, value);
        return res.status(200).json({message: 'Produto cadastrado com sucesso!'});

    }catch(err){
        return res.status(err.code).json(err);
    }
});


app.get('/products/:id', async (req, res, next) => { 

    try{
        var id = req.params.id;
        const [rows] = await db.getProductById(id);
        if(rows){
            return res.status(200).send(rows);
        }
        return res.status(404).send(`Produto ${id} não encontrado!`);
    }catch(err){
        return res.status(err.code).json(err);
    }
});

app.put('/products/:id', async (req, res, next) => { 

    try{
        var id = req.params.id;

        var name = req.body.name;
        var description = req.body.description
        var value = req.body.value
        
        const rows = await db.updateProductById(id, name, description, value);
        if(rows){
            return res.status(200).send({message: "Produto atualizado com sucesso!"});
        }
        return res.status(404).send(`Produto ${id} atualizado com sucesso!`);
    }catch(err){
        return res.status(err.code).json(err);
    }
});

app.delete('/products/:id', async (req, res, next) => {

    try{
        var id = req.params.id;
        await db.deleteProductById(id);
        return res.status(200).send({message: `Produto ${id} deletado com sucesso!`}); 

    }catch(err){
        return res.status(err.code).json(err);
    }
});


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});
