const conexao = require('../config/database');

class CategoriaModel {
    static async listarTodas() {
        const sql = 'SELECT id_categoria, nome FROM categorias ORDER BY id_categoria';
        const [linhas] = await conexao.execute(sql);
        return linhas;
    }

    static async buscarPorId(idCategoria) {
        const sql = 'SELECT id_categoria, nome FROM categorias WHERE id_categoria = ?';
        const [linhas] = await conexao.execute(sql, [idCategoria]);
        return linhas.length > 0 ? linhas[0] : null;
    }

    static async criar(nome) {
        const sql = 'INSERT INTO categorias (nome) VALUES (?)';
        const [resultado] = await conexao.execute(sql, [nome]);
        return resultado.insertId;
    }

    static async atualizar(idCategoria, nome) {
        const sql = 'UPDATE categorias SET nome = ? WHERE id_categoria = ?';
        const [resultado] = await conexao.execute(sql, [nome, idCategoria]);
        return resultado.affectedRows > 0;
    }

    static async deletar(idCategoria) {
        const sql = 'DELETE FROM categorias WHERE id_categoria = ?';
        const [resultado] = await conexao.execute(sql, [idCategoria]);
        return resultado.affectedRows > 0;
    }
}

module.exports = CategoriaModel;
