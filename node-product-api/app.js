import express from 'express';
import db from "./db.js";
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import https from 'https';
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';
import cript from './cript.js';

var limiter = new rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    delayMs: 0,
    message: "Too many accounts created from this IP, please try again after an hour",
});

const checkJwt = auth({
    audience: 'http://localhost:4200',
    issuerBaseURL: `https://dev-n82m667qeh2rwuwa.us.auth0.com`,
});

const app = express()
const port = 3001

app.use(express.json());
app.use(cookieParser());
app.use(limiter);

var privateKey  = fs.readFileSync('sslcert/selfsigned.key', 'utf8');
var certificate = fs.readFileSync('sslcert/selfsigned.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(port);

// app.listen(port, () => {
//     console.log(`Listening at http://localhost:${port}`)
// });

app.get('/products', async (req, res, next) => {
    var resp = await db.getAllProducts();
    res.status(200).json(resp);
});

app.post('/products', checkJwt, async (req, res, next) => {

    try {
        var name = req.body.name;
        var description = req.body.description
        var value = req.body.value

        await db.insertProduct(name, description, value);
        return res.status(200).json({ message: 'Produto cadastrado com sucesso!' });

    } catch (err) {
        return res.status(err.code).json(err);
    }
});


app.get('/products/:id', async (req, res, next) => {

    try {
        var id = req.params.id;
        const [rows] = await db.getProductById(id);
        if (rows) {
            return res.status(200).send(rows);
        }
        return res.status(404).send(`Produto ${id} não encontrado!`);
    } catch (err) {
        return res.status(err.code).json(err);
    }
});

app.put('/products/:id', checkJwt, async (req, res, next) => {

    try {
        var id = req.params.id;

        var name = req.body.name;
        var description = req.body.description
        var value = req.body.value

        const rows = await db.updateProductById(id, name, description, value);
        if (rows) {
            return res.status(200).send({ message: "Produto atualizado com sucesso!" });
        }
        return res.status(404).send(`Produto ${id} atualizado com sucesso!`);
    } catch (err) {
        return res.status(err.code).json(err);
    }
});

app.delete('/products/:id', checkJwt, async (req, res, next) => {

    try {
        var id = req.params.id;
        await db.deleteProductById(id);
        return res.status(200).send({ message: `Produto ${id} deletado com sucesso!` });

    } catch (err) {
        return res.status(err.code).json(err);
    }
});

app.post('/register', async (req, res, next) => {

    if (!req.body.username.match("^[A-Za-z0-9]{5,}")) {
        return res.status(400).json({ error: "Usuário Inválido", message: "Deve conter ao menos 5 caracteres entre maiúsculas, minúsculas e numéricos e caracteres especiais" });
    }

    if (!req.body.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})")) {
        return res.status(422).json({ error: "A senha é muito fraca", message: "Deve conter ao menos 10 caracteres entre maiúsculas, minúsculas, numéricos e caracteres especiais" });
    }

    try {
        const users = await db.insertUser(req.body.username, cript.hash(req.body.password));
        if (users.affectedRows) {
            console.log(`Usuário ${req.body.username} registrado com sucesso!`);
            return res.status(201).send();
        }
    } catch (err) {
        return res.status(err.code).json(err);
    }
});