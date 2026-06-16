const CategoriaModel = require('../models/categoriaModel');

exports.listarCategorias = async (req, res) => {
    try {
        const categorias = await CategoriaModel.listarTodas();
        return res.status(200).json(categorias);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

exports.buscarCategoriaPorId = async (req, res) => {
    try {
        const categoria = await CategoriaModel.buscarPorId(req.params.id);

        if (!categoria) {
            return res.status(404).json({ erro: 'Categoria nao encontrada' });
        }

        return res.status(200).json(categoria);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

exports.criarCategoria = async (req, res) => {
    try {
        const { nome } = req.body;

        if (!nome || !nome.trim()) {
            return res.status(400).json({ erro: 'O campo nome e obrigatorio' });
        }

        const id = await CategoriaModel.criar(nome.trim());
        return res.status(201).json({
            id_categoria: id,
            nome: nome.trim(),
            mensagem: 'Categoria criada com sucesso'
        });
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

exports.atualizarCategoria = async (req, res) => {
    try {
        const { nome } = req.body;

        if (!nome || !nome.trim()) {
            return res.status(400).json({ erro: 'O campo nome e obrigatorio' });
        }

        const sucesso = await CategoriaModel.atualizar(req.params.id, nome.trim());

        if (!sucesso) {
            return res.status(404).json({ erro: 'Categoria nao encontrada' });
        }

        return res.status(200).json({ mensagem: 'Categoria atualizada com sucesso' });
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

exports.deletarCategoria = async (req, res) => {
    try {
        const sucesso = await CategoriaModel.deletar(req.params.id);

        if (!sucesso) {
            return res.status(404).json({ erro: 'Categoria nao encontrada' });
        }

        return res.status(200).json({ mensagem: 'Categoria removida com sucesso' });
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};
