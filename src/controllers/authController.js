const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTRO
exports.registrar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ erro: "Email já cadastrado" });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = await Usuario.create({ nome, email, senha: senhaHash });

        res.status(201).json({ mensagem: "Usuário criado com sucesso!", id: usuario._id });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ erro: "Email ou senha inválidos" });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ erro: "Email ou senha inválidos" });
        }

        const token = jwt.sign(
            { id: usuario._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};