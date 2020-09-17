require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');


//Crear el sevidor express
const app = express();

//Configurar Cors
app.use(cors());

//Conexión
dbConnection();

//Mongo atlas
//BQzoVX2UGxagH5Nn
//mean_user

app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    });
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + 3000);
});