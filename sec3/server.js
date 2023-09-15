const http = require('http');   //모듈 import

const routes = require('./routes'); //로컬 경로

/* function rqListener(req, res){

}   //req: 요청에 대한 데이터, res: 응답에 사용됨...이 함수는 명시적으로 작성되었지만 아래처럼 가능

http.createServer(rqListener); //들어오는 모든 요청 처리 함수 */

const server = http.createServer(routes);
//process.exit();   서버 종료

server.listen(3000);    //스크립트 바로 종료하지 않고 계속 프로세스 작동하도록 (서버는 계속 돌아가야 하니까)