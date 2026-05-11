const Produto = require('../models/produtoModel');

// READ - Listar todos
exports.getProdutos = async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar produtos" });
    }
};

// READ - Buscar um por ID
exports.getProdutoById = async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar produto" });
    }
};

// CREATE
exports.createProduto = async (req, res) => {
    try {
        const novo = await Produto.create(req.body);
        res.status(201).json(novo);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

// UPDATE
exports.updateProduto = async (req, res) => {
    try {
        const atualizado = await Produto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!atualizado) return res.status(404).json({ erro: "Produto não encontrado" });
        res.status(200).json(atualizado);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

// DELETE
exports.deleteProduto = async (req, res) => {
    try {
        const removido = await Produto.findByIdAndDelete(req.params.id);
        if (!removido) return res.status(404).json({ erro: "Produto não encontrado" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ erro: "Erro ao deletar produto" });
    }
};