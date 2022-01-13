var http = require('http'); 

const express = require('express') 
const app = express()
const port = 3002

const db = require("./db");

var cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');
const { randomUUID } = require('crypto');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cookieParser()); 

app.get('/orders', async (req, res, next) => { 
    var resp = await db.getAllOrders();
    res.status(200).json(resp);
});

app.post('/orders', async (req, res, next) => { 

    try{
        var id = randomUUID();
        var clientId = req.body.client_id;
        var productId = req.body.product_id
        var amount = req.body.amount
        
        await db.insertOrder(id, clientId, productId, amount);
        return res.status(200).json({message: 'Pedido cadastrado com sucesso!', order_id: id});

    }catch(err){
        return res.status(err.code).json(err);
    }
});

app.get('/orders/:id', async (req, res, next) => { 

    try{
        var id = req.params.id;
        const [rows] = await db.getOrderById(id);
        if(rows){
            return res.status(200).send(rows);
        }
        return res.status(404).send(`Pedido ${id} não encontrado!`);
    }catch(err){
        return res.status(err.code).json(err);
    }
});

app.get('/ordersByClientId/:id', async (req, res, next) => { 

    try{
        var id = req.params.id;
        const [rows] = await db.getOrderByClientId(id);
        if(rows){
            return res.status(200).send(rows);
        }
        return res.status(404).send(`Pedido ${id} não encontrado!`);
    }catch(err){
        return res.status(err.code).json(err);
    }
});


app.put('/orders/:id', async (req, res, next) => { 

    try{
        var id = req.params.id;

        var clientId = req.body.client_id;
        var productId = req.body.product_id
        var amount = req.body.amount

        const rows = await db.updateOrderById(id, clientId, productId, amount);
        if(rows){
            return res.status(200).send({message: "Pedido atualizado com sucesso!"});
        }
        return res.status(404).send(`Pedido ${id} não encontrado!`);
    }catch(err){
        return res.status(err.code).json(err);
    }
});

app.delete('/orders/:id', async (req, res, next) => {

    try{
        var id = req.params.id;
        await db.deleteOrderById(id);
        return res.status(200).send({message: `Pedido ${id} deletado com sucesso!`}); 

    }catch(err){
        return res.status(err.code).json(err);
    }
});


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});
