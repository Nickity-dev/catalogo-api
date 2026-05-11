require('dotenv').config();
const express = require('express');
const conectarDB = require('./src/config/db');
const rotasProdutos = require('./src/routes/produtoRoutes');
const rotasAuth = require('./src/routes/authRoutes');
const authMiddleware = require('./src/middleware/authMiddleware');

const app = express();

conectarDB();

app.use(express.json());

// Rotas públicas
app.use('/auth', rotasAuth);

// Rotas protegidas
app.use('/produtos', authMiddleware, rotasProdutos);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));