const conexao = require('../config/database');

class ProdutoModel {
    static async listarTodos() {
        const sql = `SELECT p.id_produto, p.nome, p.descricao, p.preco, p.id_categoria, c.nome AS categoria_nome
                     FROM produtos p
                     JOIN categorias c ON p.id_categoria = c.id_categoria
                     ORDER BY p.id_produto`;
        const [linhas] = await conexao.execute(sql);
        return linhas;
    }

    static async buscarPorId(idProduto) {
        const sql = `SELECT p.id_produto, p.nome, p.descricao, p.preco, p.id_categoria, c.nome AS categoria_nome
                     FROM produtos p
                     JOIN categorias c ON p.id_categoria = c.id_categoria
                     WHERE p.id_produto = ?`;
        const [linhas] = await conexao.execute(sql, [idProduto]);
        return linhas.length > 0 ? linhas[0] : null;
    }

    static async listarPorCategoria(idCategoria) {
        const sql = `SELECT p.id_produto, p.nome, p.descricao, p.preco, p.id_categoria, c.nome AS categoria_nome
                     FROM produtos p
                     JOIN categorias c ON p.id_categoria = c.id_categoria
                     WHERE p.id_categoria = ?
                     ORDER BY p.id_produto`;
        const [linhas] = await conexao.execute(sql, [idCategoria]);
        return linhas;
    }

    static async criar({ nome, descricao, preco, id_categoria }) {
        const sql = 'INSERT INTO produtos (nome, descricao, preco, id_categoria) VALUES (?, ?, ?, ?)';
        const [resultado] = await conexao.execute(sql, [nome, descricao, preco, id_categoria]);
        return resultado.insertId;
    }

    static async atualizar(idProduto, { nome, descricao, preco, id_categoria }) {
        const sql = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, id_categoria = ? WHERE id_produto = ?';
        const [resultado] = await conexao.execute(sql, [nome, descricao, preco, id_categoria, idProduto]);
        return resultado.affectedRows > 0;
    }

    static async deletar(idProduto) {
        const sql = 'DELETE FROM produtos WHERE id_produto = ?';
        const [resultado] = await conexao.execute(sql, [idProduto]);
        return resultado.affectedRows > 0;
    }
}

module.exports = ProdutoModel;
