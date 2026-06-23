const conexao = require('../config/database');

class UsuarioModel {
    static async buscarPorEmail(email) {
        const sql = 'SELECT id_usuario, nome, email, senha FROM usuarios WHERE email = ?';
        const [linhas] = await conexao.execute(sql, [email]);
        return linhas.length > 0 ? linhas[0] : null;
    }

    static async buscarPorId(idUsuario) {
        const sql = 'SELECT id_usuario, nome, email FROM usuarios WHERE id_usuario = ?';
        const [linhas] = await conexao.execute(sql, [idUsuario]);
        return linhas.length > 0 ? linhas[0] : null;
    }

    static async criar({ nome, email, senha }) {
        const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
        const [resultado] = await conexao.execute(sql, [nome, email, senha]);
        return resultado.insertId;
    }

    static async listarTodos() {
        const sql = 'SELECT id_usuario, nome, email FROM usuarios ORDER BY id_usuario';
        const [linhas] = await conexao.execute(sql);
        return linhas;
    }
}

module.exports = UsuarioModel;
