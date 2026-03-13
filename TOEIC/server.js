/**
 * express 없이 node.js 서버 구현하기 (node.js의 파악을 위해 도전)
 * 
 * 참고 문서
 * https://nibble2.tistory.com/41
 * https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
 * https://nodejs.org/en/learn/manipulating-files/nodejs-file-paths
 * https://nodejs.org/en/learn/http/anatomy-of-an-http-transaction
 */


const { createServer } = require('node:http'); // 웹서버 객체 생성
const path = require('node:path'); // 경로 설정을 위한 모듈
const fs = require('node:fs'); // 파일 읽기

const hostname = 'localhost'; // host 네임 설정
const port = 3000; ; // port 설정

// 폴더 경로
const htmlPath = path.join(__dirname, 'html'); 
const cssPath = path.join(__dirname, 'assets', 'css');
const jsPath = path.join(__dirname, 'assets', 'js');
const mediaPath = path.join(__dirname, 'assets', 'media');

// /로 진입 할 html 미리 읽기
const testFile = fs.readFileSync(path.join(htmlPath, 'test.html'));

const server = createServer((req, res) => {
  // 불러오는 파일들 경로 확인
  console.log(req.url);
  try {
    // HTML 요청
    if (req.url === '/') {
      res.setHeader('Content-Type', 'text/html');
      res.end(testFile);
      return;
    }
    if (req.url === '/result') {
      const resultFile = fs.readFileSync(path.join(htmlPath, 'result.html'));
      res.setHeader('Content-Type', 'text/html');
      res.end(resultFile);
      return;
    }
    if (req.url === '/map') {
      const mapFile = fs.readFileSync(path.join(htmlPath, 'map.html'));
      res.setHeader('Content-Type', 'text/html');
      res.end(mapFile);
      return;
    }
    if (req.url === '/analysis') {
      const analysisFile = fs.readFileSync(path.join(htmlPath, 'analysis.html'));
      res.setHeader('Content-Type', 'text/html');
      res.end(analysisFile);
      return;
    }
    // CSS
    if (req.url === '/assets/css/common.css') {
      const commonCss = fs.readFileSync(path.join(cssPath, 'common.css'));
      res.setHeader('Content-Type', 'text/css');
      res.end(commonCss);
      return;
    }
    // JS
    if (req.url === '/assets/js/database.js') {
      const database = fs.readFileSync(path.join(jsPath, 'database.js'));
      res.setHeader('Content-Type', 'application/javascript');
      res.end(database);
      return;
    }
    if (req.url === '/assets/js/mapdata.js') {
      const mapdata = fs.readFileSync(path.join(jsPath, 'mapdata.js'));
      res.setHeader('Content-Type', 'application/javascript');
      res.end(mapdata);
      return;
    }
    // 이미지
    if (req.url === '/assets/media/images/p1_q1.png') {
      const p1_q1 = fs.readFileSync(path.join(mediaPath, 'images', 'p1_q1.png'));
      res.setHeader('Content-Type', 'image/jpeg');
      res.end(p1_q1);
      return;
    }
    if (req.url === '/assets/media/images/p7_email1.jpg') {
      const p7_email1 = fs.readFileSync(path.join(mediaPath, 'images', 'p7_email1.jpg'));
      res.setHeader('Content-Type', 'image/jpeg');
      res.end(p7_email1);
      return;
    }

    // 위에 해당하는 파일 없으면 에러 (test: audio 파일)
    res.statusCode = 404;
    res.end('Not Found');

  } catch (err) { // 파일을 아예 못 읽을 수도 있을 때를 대비해 에러 처리
    console.error(err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



/**
 * 
 * 배운점
 * - fs.readFileSync() - 동기식으로 요청이 들어오면 서버가 멈춘 상태로 파일을 읽어서 매우매우매우매우 느림
 *  => fs.readFile() - 비동기식으로 요청이 들어오면 서버가 멈추지 않고 파일을 읽어서 빠르기 때문에 이거 사용
 * 
 * - 브라우저는 로컬이 아니라 서버로부터 정보를 전달받는다. -> 브라우저가 화면에 표시하기 위해 필요한 모든 정보는 서버를 통해 제공됨
 * 
 * - if 안은 블록스코프이기 때문에 똑같은 const 변수명을 사용해도 문제가 없음 
 *   (하지만 웬만하면 가독성을 위해 다른거 쓰자....... => 파일 경로 수정할 때 변수명 똑같아서 헷갈렸음 ㅎ)
 * 
 */
