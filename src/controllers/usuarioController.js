const Usuario = require('../models/usuarioModel');

exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.listarTodos();
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};
