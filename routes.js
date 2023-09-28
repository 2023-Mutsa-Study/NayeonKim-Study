const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {  // string === substring: substring이 string 내에 포함되어 있을 경우
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        //버튼 클릭 시 if문 바깥에 있는 것들이 페이지에 반영됨 > name="message"로 인해 url type 뒤에 /message > / 형식 x
        //'/message' 라우터로 post 요청 보냄
        res.write('</html>');   // res.write()로 클라이언트에게 보낼 응답 작성
        return res.end();  //여기서 멈춰야 하기 때문에 return을 굳이 써서 반환, return이 없다면 runtime error 
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => { //req.on()은 event listener
            console.log(chunk);
            body.push(chunk);    //값 자체를 바꾸는 것이 아니기 때문에 상수라도 가능
        } );   //특정 이벤트를 들을 수 있도록, 모든 데이터에 대해 실행될 함수
        return req.on('end', () => {   //청크를 다뤄야 함
            const parsedBody = Buffer.concat(body).toString(); //buffer 생성 후 문자열
            const message = parsedBody.split('=')[1];   //콘솔에 출력되는 형태가 'message=사용자의 입력값'
            fs.writeFile('message.txt', message, (err) => { 
                res.statusCode = 302;   //302: 리다이렉팅 코드
                res.setHeader('Location', '/');
                return res.end();
            });   //writeFileSync: 동기화 (파일이 생성되기 전까지 코드 실행을 막음 -> 짧은 데이터일 경우에만, 대용량 데이터일 경우 서버가 느려짐)
            /* res.statusCode = 302;   //302: 리다이렉팅 코드
            res.setHeader('Location', '/');
            return res.end(); -> my first page가 뜨는 동시에 에러, 다시 응답을 보내려고 했기 때문 */
        })
       /*  res.statusCode = 302;   //302: 리다이렉팅 코드
        res.setHeader('Location', '/');
        return res.end(); */
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');   //클라이언트에게 보낼 응답
    res.end();  //끝
};

module.exports = {
    handler: requestHandler,
    someText: 'Some hard-coded text'
} //모듈 내보내기, {} 이용 시 객채 형식으로 내보낼 수 있음

/* module.exports.handler = requestHandler;
module.exports.someText = 'Some hard-coded text';   //위랑 똑같음 */