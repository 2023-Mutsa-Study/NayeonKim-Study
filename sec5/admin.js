const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

//    /admin/add-prodcut => GET
router.get('/add-product',(req, res, next) => {    // 아래와 라우트 경로는 같아 보이지만 메서드가 다르기 때문에 실질적으로는 다른 라우트
    /* res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</form>');
    next() 함수 호출하는 대신 응답 전송, send() 메서드로 기본적인 content type 지정 */
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', {pageTitle: 'Add Product', path: '/admin/add-product', formCSS: true, productCSS: true, activeAddProduct: true});
});    // next()함수가 없기 때문에 아래 미들웨어는 처리가 안됨

//    /admin/add-product => POST
router.post('/add-product', (req, res) => {    // app.use()를 app.post()로 바꿔줌으로써 post에 대한 요청만 받음, get일 경우에도 마찬가지
    products.push({title: req.body.title});    // form에 입력 시  출력되는 key:value 값이 title:
    // console.log(req.body);
    res.redirect('/');
})

// module.exports = router;

exports.routes = router;
exports.products = products;