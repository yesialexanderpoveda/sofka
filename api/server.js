const express = require('express');
const path = require('path');
const cors = require('cors');
const { db_connection } = require('./config/db')
const sofka = express();
sofka.use(cors());
sofka.use(express.static(path.join(__dirname, './../views')));


sofka.use(express.json());
sofka.use(express.urlencoded({ extended: true }));

//bd functional
db_connection

const port = process.env.PORT | 3000;

sofka.use('/', require('./routes/router'));



sofka.listen(port, () => {

  console.log('Listen here:', port);

})