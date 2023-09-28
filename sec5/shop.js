const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/',(req, res, next) => {
    console.log('In another middleware!');
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));    // next() 함수 호출하는 대신 응답 전송 
                                                                 // send() 메서드로 기본적인 content type 지정
                                                                 // sendFile() 인수로 기본적으로 하듯이 경로 지정하면 x path 패키지 임포트 필요
                                                                 // __dirname 은 /(루트 경로)를 운영체제가 아닌 현재 파일이 위치한 폴더(views)로 고정시켜줌
                                                                 // '../'은 상위 폴더로 올라가라
});

module.exports = router;