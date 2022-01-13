var http = require('http'); 

const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

const db = require("./db");

var cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');


app.use(cors());

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cookieParser()); 

var request = require('request');

var host = process.env.DOCKER_HOST_IP || 'http://localhost'

app.get('/products', async (req, res, next) => { 
    request(`${host}:3001/products`, function(err, body){
        return res.json(JSON.parse(body.body));
    });
});

app.post('/buy', async (req, res, next) => { 
    request({
        url: `${host}:3002/orders`,
        headers: {'content-type' : 'application/json'},
        method: 'POST',
        body: JSON.stringify(req.body)
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            console.log(response.statusCode, body);
            var resp = JSON.parse(body);
            resp.status = response.statusCode;
            return res.json(resp);
        }
    });
});


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});
