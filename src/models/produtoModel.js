const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'O nome do produto é obrigatório']
    },
    preco: {
        type: Number,
        required: [true, 'O preço é obrigatório']
    },
    categoria: {
        type: String,
        default: 'Geral'
    },
    descricao: {
        type: String
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Produto', produtoSchema);