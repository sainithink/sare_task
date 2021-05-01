const express = require('express');
const multipart = require('connect-multiparty');
 const router = express.Router();

 const{
	add_product,cart_product,list_product
 }= require('../controllers/productController');


router.post('/add_product', add_product)

router.get('/cart_product/:id',cart_product)

router.get('/list_product',list_product)


module.exports = router;
