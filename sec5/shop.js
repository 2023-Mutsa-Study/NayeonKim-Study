const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/',(req, res, next) => {
    /* console.log(adminData.products);
    res.sendFile(path.join(rootDir, 'views', 'shop.html')); */    // next() 함수 호출하는 대신 응답 전송 
                                                                 // send() 메서드로 기본적인 content type 지정
                                                                 // sendFile() 인수로 기본적으로 하듯이 경로 지정하면 x path 패키지 임포트 필요
                                                                 // __dirname 은 /(루트 경로)를 운영체제가 아닌 현재 파일이 위치한 폴더(views)로 고정시켜줌
                                                                 // '../'은 상위 폴더로 올라가라
    const products = adminData.products;
    res.render('shop', {prods: products, 
                        pageTitle: 'Shop', 
                        path:'/',    /// 템플릿 엔진 반환, pug를 기본 엔진으로 정의했으므로 .pug 필요 x
                        hasProducts: products.length > 0,    // hasProducts: products.length > 0 -> handlebars 에서는 값만 전달 가능하기 떄문에 해당 키 추가해 줘야
                        activeShop: true,
                        productCSS: true 
                    });    
                                                                                                             

});

module.exports = router;