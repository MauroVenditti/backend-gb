require('./config/config');
const p = require('./controllers/productos');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const options = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "API-KEY"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "*",
    preflightContinue: false
};

app.use("*", cors(options));

app.use(require('./routes/products'));

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
    p.productosApi();
});