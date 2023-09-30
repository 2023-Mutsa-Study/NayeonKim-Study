// const http = require('http');

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');

const app = express();

// app.engine('handlebars', expressHbs({layoutDir : 'views/layouts', defaultLayout: 'main-layout', extname: 'handlebars'}));    // 내장되어 있지 않은 새로운 템플릿 엔진 등록
//app.set('view engine', 'pug');    // set(): express 전역으로 설정 가능한 함수
                                  // 동적 엔진 pug
app.set('view engine', 'ejs');
app.set('views', 'views');    // views 파일 위치

const adminData = require('./sec5/admin');
const shopRoutes = require('./sec5/shop');

/*  dummy middleware
    app.use((req, res, next) => {
    console.log('In the middleware!');
    next();    // allows the request to continue to the next middleware, 다음 미들웨어로 이동할 수 있게끔 (미들웨어 함수 사이 자유롭게 이동)
});    //미들웨어 함수 use
 */

/* app.use('/', (req, res, next) => {    // 라우터를 '/'로 설정함으로써 필터링되지 않음
    console.log("This always runs!");
    next();
}) */

app.use( bodyParser.urlencoded({extended:false}));    // 폼을 통해 전송된 본문 분석해주는 툴
app.use(express.static(path.join(__dirname, 'public')))    // css 파일을 정적으로 서비스하기 위해

/* app.use('/add-product',(req, res, next) => {
    console.log('In another middleware!');
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</form>')    // next() 함수 호출하는 대신 응답 전송, send() 메서드로 기본적인 content type 지정
});    // next()함수가 없기 때문에 아래 미들웨어는 처리가 안됨

app.post('/product', (req, res) => {    // app.use()를 app.post()로 바꿔줌으로써 post에 대한 요청만 받음, get일 경우에도 마찬가지
    console.log(req.body);
    res.redirect('/');
}) */

app.use('/admin', adminData.routes);    //    same as 24~32
                                   //    route 경로의 시작점에 /admin으로 시작한다는 필터링 조건 추가
                                   //    admin.js 파일에 존재하는 라우터들의 공통 경로

/* app.use('/',(req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>Hello from Express!</h1>')    // next() 함수 호출하는 대신 응답 전송, send() 메서드로 기본적인 content type 지정
}); */

app.use(shopRoutes);    // same as 37~40 단, 35와 42의 경우 순서를 신경쓰는 습관을 들이는 것이 중요

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname,'views','404.html'));
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});    // node js는 위에서부터 아래로 코드를 읽으니 404 에러 페이지는 맨 마지막에 위치해야 

/* const server = http.createServer(app);
server.listen(3000); */

app.listen(3000); // 18,19줄을 한번에 표현 가능