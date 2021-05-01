const express = require('express');
const categoryRouter = require('./categoryRouter')
const router = express.Router();
const productRouter = require('./productRouter')



router.use('/category',categoryRouter)

router.use('/product',productRouter)


module.exports = router;