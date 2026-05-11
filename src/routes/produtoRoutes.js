const express = require('express');
const router = express.Router();
const controller = require('../controllers/produtoController');

router.get('/', controller.getProdutos);
router.get('/:id', controller.getProdutoById);
router.post('/', controller.createProduto);
router.put('/:id', controller.updateProduto);
router.delete('/:id', controller.deleteProduto);

module.exports = router;