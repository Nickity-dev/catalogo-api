const ProdutoModel = require('../models/produtoModel');
const CategoriaModel = require('../models/categoriaModel');

exports.listarProdutos = async (req, res) => {
    try {
        const produtos = await ProdutoModel.listarTodos();
        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

exports.listarPorCategoria = async (req, res) => {
    try {
        const produtos = await ProdutoModel.listarPorCategoria(req.params.idCategoria);
        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

exports.buscarProdutoPorId = async (req, res) => {
    try {
        const produto = await ProdutoModel.buscarPorId(req.params.id);

        if (!produto) {
            return res.status(404).json({ erro: 'Produto nao encontrado' });
        }

        return res.status(200).json(produto);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

exports.criarProduto = async (req, res) => {
    try {
        const { nome, descricao, preco, id_categoria } = req.body;

        if (!nome || !nome.trim()) {
            return res.status(400).json({ erro: 'O campo nome e obrigatorio' });
        }
        if (!id_categoria) {
            return res.status(400).json({ erro: 'O campo id_categoria e obrigatorio' });
        }
        if (preco == null || isNaN(preco)) {
            return res.status(400).json({ erro: 'O campo preco e obrigatorio e deve ser numerico' });
        }

        const categoria = await CategoriaModel.buscarPorId(id_categoria);
        if (!categoria) {
            return res.status(400).json({ erro: 'Categoria nao existe' });
        }

        const id = await ProdutoModel.criar({ nome: nome.trim(), descricao: descricao || '', preco, id_categoria });
        return res.status(201).json({ id_produto: id, mensagem: 'Produto criado com sucesso' });
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

exports.atualizarProduto = async (req, res) => {
    try {
        const { nome, descricao, preco, id_categoria } = req.body;

        if (!nome || !nome.trim()) {
            return res.status(400).json({ erro: 'O campo nome e obrigatorio' });
        }
        if (!id_categoria) {
            return res.status(400).json({ erro: 'O campo id_categoria e obrigatorio' });
        }
        if (preco == null || isNaN(preco)) {
            return res.status(400).json({ erro: 'O campo preco e obrigatorio e deve ser numerico' });
        }

        const categoria = await CategoriaModel.buscarPorId(id_categoria);
        if (!categoria) {
            return res.status(400).json({ erro: 'Categoria nao existe' });
        }

        const sucesso = await ProdutoModel.atualizar(req.params.id, { nome: nome.trim(), descricao: descricao || '', preco, id_categoria });
        if (!sucesso) {
            return res.status(404).json({ erro: 'Produto nao encontrado' });
        }

        return res.status(200).json({ mensagem: 'Produto atualizado com sucesso' });
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

exports.deletarProduto = async (req, res) => {
    try {
        const sucesso = await ProdutoModel.deletar(req.params.id);
        if (!sucesso) {
            return res.status(404).json({ erro: 'Produto nao encontrado' });
        }

        return res.status(200).json({ mensagem: 'Produto removido com sucesso' });
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};
