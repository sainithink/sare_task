const express = require('express');
const multipart = require('connect-multiparty');
 const router = express.Router();

 const{
	add_category,list_category
 }= require('../controllers/category');


router.post('/add_category', add_category)

router.get('/list_category',list_category)


module.exports = router;
