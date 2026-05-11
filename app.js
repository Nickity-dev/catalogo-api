require('dotenv').config();
const express = require('express');
const conectarDB = require('./src/config/db');

const app = express();

// Conecta ao banco
conectarDB();

// Middlewares
app.use(express.json());

const rotasProdutos = require('./src/routes/produtoRoutes');
app.use('/produtos', rotasProdutos);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));