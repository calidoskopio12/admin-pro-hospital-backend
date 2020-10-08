require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');


//Crear el sevidor express
const app = express();

//Configurar Cors
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Conexión
dbConnection();

//Mongo atlas
//BQzoVX2UGxagH5Nn
//mean_user

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + 3000);
});