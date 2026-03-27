// userRouter : 사용자에 관한 api 라우터 관리

const express = require("express"); // express 모듈
const router = express.Router(); // express에서 라우팅 객체 만드는거


const userController = require("../controllers/userController"); // user 관련 db 쿼리문 호출 및 요청 데이터 처리 

// 회원가입
router.post("/signup", userController.signup);
router.get("/checkId", userController.checkId);

module.exports = router; // 다른 파일에서도 이 파일을 이용할 수 있도록 내보내기