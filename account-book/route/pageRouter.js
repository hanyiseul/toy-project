// pageRouter : 페이지 라우터 관리
const express = require("express"); // express 모듈
const path =require("path"); // 경로 모듈

const router = express.Router({ mergeParams: true }); //  mergeParams: true - 상위 라우터의 URL 파라미터를 이 라우터에서도 사용할 수 있게 하는 옵션

const htmlPath = path.join(__dirname, "..", "..","public", "templates");

// index.html 
router.get("/", (_, res) => {
  res.sendFile(path.join(htmlPath, "index.html")); // sendFile - 실제 파일을 읽어서 브라우저로 전달
});

// 노가다 안하는 방법
router.get("/:page", (req, res) => {
  res.sendFile(path.join(htmlPath, `${req.params.page}.html`));
});


module.exports = router // 다른 파일에서도 이 라우터.js를 사용할 수 있게 exports 처리

/**
 * 참고 문서
 * https://expressjs.com/ko/guide/routing.html
 */