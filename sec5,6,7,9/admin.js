const path = require('path');

const express = require('express');

// const rootDir = require('../util/path');

const adminController = require('../controllers/admin');

const router = express.Router();


//    /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);    // next()함수가 없기 때문에 아래 미들웨어는 처리가 안됨

// /admin/products => GET
router.get('/products', adminController.getProducts);

//    /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

// module.exports = router;
module.exports = router; 