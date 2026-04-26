// userController.js : 응답/요청 데이터 처리

// 연결 설정
const userService = require("../services/userService"); // 비즈니스 로직 파일 연결
const jwt = require("jsonwebtoken"); // jwt 인증 모듈 연결
const JWT_SECRET = process.env.JWT_SECRET; // env 파일에서 시크릿키 가져옴

// 회원가입
exports.signup = async(req, res) => {
  try {
    // 프론트에서 요청 보낸 값 그대로 처리
    const { name, user_id, pwd } = req.body

    // userService 처리값을 result에 담기
    const result = await userService.signup(name, user_id, pwd);
    res.json(result);
  } catch (err) {
    console.error("controller 에러: ", err);
    
    res.json({
      success: false,
      message: "controller 회원가입 에러"
    }); 
  }
}

// 회원가입 - 아이디 체크
exports.checkId = async(req, res) => {
  try {
    const {user_id} = req.query;

    // userService 처리값을 result에 담기
    const result = await userService.checkId(user_id);
    res.json(result);
  } catch (err) {
    console.error("controller 에러: ", err);
  }
}

// 로그인
exports.login = async(req, res) => {
  try {
    const {user_id, pwd} = req.body;

    const result = await userService.login(user_id, pwd);

    // 토큰 쿠키 설정
    res.cookie("token", result.token, {
      httpOnly: true, // js에서 접근 불가
      secure: false, // http에서도 전송 가능 (배포때는 true)
      sameSite: "lax", // csrf 공격 방어 lax 모드(일부 허용)
      path: '/', // 사이트 전체에서 쿠키 사용 가능
      maxAge: 60 * 60 * 1000 // 쿠키 유효 시간
    });

    res.json({
      success: true,
      result: "로그인 성공",
      user: result.user,
      token: result.token
    });
  } catch (err) {
    console.error("controller 로그인 실패: ", err);
    res.json({
      success: false,
      message : "controller 로그인 실패"
    })
  }
} 

// 로그인 - jwt 검증
exports.verify = (req, res) => {
  try {
    console.log("쿠키:", req.cookies); 
    const token = req.cookies.token;

    if(!token) { // 만약 토큰이 없을 시 권한 인증 에러 처리
      return res.status(401).json({success: false});
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.json({ success: false });
      res.json({ success: true, user: decoded }); // 유효하면 해독된 유저 정보 응답
    });
  } catch (err) { // 데이터 처리 실패 시
    console.error("controller 인증 에러: ", err);
    res.json({
      success: false,
      message: "로그인 실패"
    });
  }
} 

// 로그아웃
exports.logout = (req, res) => {
  try {
    res.clearCookie("token", { // 쿠키에 저장된 해당 토큰 삭제
      httpOnly: true, // 브라우저에서 접근 불가능
      sameSite: "lax", // 다른 사이트에서 요청 올 때 쿠키 제한
      path: "/" // 쿠키 전체 사용
    });

    res.json({
      success: true,
      message: "로그아웃 성공"
    });

  } catch (err) {
    console.error("controller 로그아웃 에러:", err);

    res.json({
      success: false,
      message: "로그아웃 실패"
    });
  }
};

// userService test code
// (async () => {
//   await userService.signup("test1","test1","1234");
//   const result = await userService.checkId("test1");
//   console.log(result);
// })();
