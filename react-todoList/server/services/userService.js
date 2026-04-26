// userService.js : 실제 비즈니스 로직 처리

const userModel = require("../models/userModel"); // 데이터 연결 설정한 userModel 파일 연결
const jwt = require("jsonwebtoken"); // JWT : JSON Web Token, 사용자 인증에 사용되는 토큰 기반 인증 방식
const bcrypt = require("bcrypt"); // bcrypt : 비밀번호 암호화 라이브러리
const JWT_SECRET = process.env.JWT_SECRET; // .env에 랜덤키 생성

// 회원가입 처리 (암호 hash 처리 해서 등록)
exports.signup = async(name, user_id, pwd) => {
  try {
    // 기존 유저 확인
    const exist = await userModel.checkId(user_id);
    if(exist.length > 0) {
      return {
        success: false,
        message: "이미 존재하는 아이디입니다."
      }
    }

    // hash 설정
    // 연산을 2^10으로 설정해서 pwd 해싱
    const hash = await bcrypt.hash(pwd, 10);
    const result = await userModel.signup(name, user_id, hash);
    
    // affectedRows : 실제로 데이터가 추가된 수
    if(result.affectedRows === 1) { // 실제로 데이터가 1줄 추가되었다면 (회원가입이 성공했다면)
      return {
        success: true,
        message: "회원 가입 성공"
      }
    }
    // 에러는 아닌데 회원가입이 실패 한다면 (혹시 모를 예외처리)
    return {
      success: false,
      message: "service 회원 가입 실패"
    };

  } catch (err) {
    console.error("회원가입 에러 : ", err);
    // ER_DUP_ENTRY : 중복된 값 때문에 insert 실패
    if(err.code === "ER_DUP_ENTRY") { // 동일 아이디 존재로 인식
      return {
        success: false,
        message: "이미 존재하는 아이디"
      }
    }
    return {
      success: false,
      message: "service 회원가입 에러"
    }
  }
}

// 회원가입 - 아이디 체크 여부
exports.checkId = async(user_id) => {
  const result = await userModel.checkId(user_id);

  try {
    // 조회한 user_id가 1개 이상이면 true
    const exists = result.length > 0;
    
    return {
      exists,
      message: exists ? "이미 아이디가 존재합니다." : "사용 가능한 아이디입니다." // exits값이 존재한다면 아이디 중복 o / 없다면 가입 o 
    }
  } catch (err) {
    console.error("아이디 중복체크 에러 : ", err);

    return {
      message: "service 아이디 중복 체크 에러"
    }
  }
}

// 로그인
exports.login = async(user_id, pwd) => {
  const result = await userModel.checkId(user_id);
  const user = result[0];

  try { 
    
    // 아이디가 없을 경우
    if(!user) { // 아이디를 비교했기 때문에 (쿼리에서 아이디 조회)
      return {
        success: false,
        message: "service : 아이디가 존재하지 않습니다."
      }
    }

    // 만약 비밀번호가 틀렸다면
    if(!(await bcrypt.compare(pwd, user.pwd))) {
      return {
        success: false,
        message: "service : 비밀번호가 틀렸습니다."
      }
    }

    // user 정보가 존재하고 해시암호와 비교할 입력 비밀번호가 있다면
    if(user && await bcrypt.compare(pwd, user.pwd)) {
      // payload : jwt 토큰 생성 코드
      // jwt.sign : 토큰에 담을 정보, 토큰 서명용 비밀키, 토큰 만료시간
      const token = jwt.sign({user_id: user.user_id, name: user.name }, JWT_SECRET, {expiresIn: '12h'}); // 토큰 변수에 payload 유저 정보를 담아 서명

      // 성공하면 토큰 반환
      return {
        success: true,
        token
      }
    }

  } catch (err) {
    console.error("service error: ", err);
    return {
      success: false,
      message: "service 로그인 에러"
    }
  }
}

// userModel test code
// 회원가입 테스트 코드
// (async () => {
//   await userModel.signup("test", "test_id", "1234");
//   const result = await userModel.checkId("test_id");
//   console.log(result);
// })();

// 로그인 테스트 코드
// (async () => {
//   const result = await exports.login("test_id", "1234");
//   console.log("login result:", result);
// })();