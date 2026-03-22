// userRouter : api 라우터 관리

const express = require("express"); // express 모듈
const router = express.Router(); // express에서 라우팅 객체 만드는거

const userController = require("../controllers/userController");

// 회원가입
router.post("/signup", userController.signup);

// 회원가입 - 아이디 중복 여부 체크
router.get("/checkid", userController.checkId);

// 로그인
router.post("/login", userController.login);

// 로그인 - 인증
router.get("/verify",  userController.verify);

module.exports = router;