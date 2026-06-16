const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTRO
exports.registrar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ erro: "Nome, email e senha sao obrigatorios" });
        }

        const usuarioExistente = await Usuario.buscarPorEmail(email);
        if (usuarioExistente) {
            return res.status(400).json({ erro: "Email já cadastrado" });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const idUsuario = await Usuario.criar({ nome, email, senha: senhaHash });

        res.status(201).json({ mensagem: "Usuário criado com sucesso!", id_usuario: idUsuario });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ erro: "Email e senha sao obrigatorios" });
        }

        const usuario = await Usuario.buscarPorEmail(email);
        if (!usuario) {
            return res.status(401).json({ erro: "Email ou senha inválidos" });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ erro: "Email ou senha inválidos" });
        }

        const token = jwt.sign(
            { id_usuario: usuario.id_usuario },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            token,
            usuario: {
                id_usuario: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email
            }
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};
