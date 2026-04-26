// userRouter : 사용자 api 라우터 관리

const express = require("express"); // express 모듈
const router = express.Router(); // 라우터 객체 생성
const userController = require("../controllers/userController.js"); // 응답/요청 처리한 파일 연결

// user router
router.post("/signup", userController.signup); // 회원가입
router.get("/checkId", userController.checkId); // 회원가입 - 아이디 중복 체크
router.post("/login", userController.login); // 로그인
router.get("/verify", userController.verify); // 로그인 - jwt 토큰 검증

module.exports = router;