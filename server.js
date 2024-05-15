const express = require('express');
const path = require('path');

const app = express()
app.use(express.json());

// Configurar Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app