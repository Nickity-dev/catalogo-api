require('dotenv').config();
const express = require('express');
const rotasAuth = require('./src/routes/authRoutes');
const rotasApi = require('./src/routes/apiRoutes');
const rotasCategorias = require('./src/routes/categoriaRoutes');
const authMiddleware = require('./src/middleware/authMiddleware');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Rotas públicas
app.use('/auth', rotasAuth);
app.use('/api', rotasApi);

// Rotas protegidas
app.use('/api/categorias', authMiddleware, rotasCategorias);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
