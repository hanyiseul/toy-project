// pageRouter : 페이지 라우터 관리

const express = require("express"); // express 모듈
const path =require("path"); // 경로 모듈

// mergeParams: true - 상위 라우터의 URL 파라미터를 이 라우터에서도 사용할 수 있게 하는 옵션
const router = express.Router({ mergeParams: true });
// html path 설정
// pageRouter 경로 기준 : ../public/templates
const htmlPath = path.join(__dirname, "..", "public", "templates"); // 현재 실행 중인 파일이 있는 디렉토리(폴더)의 절대 경로

// 로그인
// sendFile - 실제 파일을 읽어서 브라우저에 전달
router.get("/", (_, res) => res.sendFile(path.join(htmlPath, "login.html")));

// 노가다 안하는 방법 (:page - URL 파라미터(동적 값))
router.get("/:page", (req, res) => res.sendFile(path.join(htmlPath, `${req.params.page}.html`)));

module.exports = router; // 다른 파일에서도 이 파일을 이용할 수 있도록 내보내기