// userService.js : 실제 비즈니스 로직 처리
// 로그인, JWT 발급, 회원 정보 조회 등 비즈니스 로직 함수들을 여기에 관리

const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken"); // JWT : JSON Web Token, 사용자 인증에 사용되는 토큰 기반 인증 방식
const bcrypt = require("bcrypt"); // bcrypt : 비밀번호 암호화 라이브러리
const JWT_SECRET = process.env.JWT_SECRET; // .env에 랜덤키 생성

exports.signup = async(user_name, user_id, pwd, birth_date, tel) => {
  try {
    // bcrypt.hash(plainPassword, saltRounds)
    // saltRounds : 생성 복잡도와 해시 함수 반복 횟수(Cost Factor)를 결정하는 숫자
    const hashed = await bcrypt.hash(pwd, 10);

    // db에 암호화된 비밀번호 넣기
    const result = await userModel.signup(user_name, user_id, hashed, birth_date, tel);

    // affectedRows = 실제로 데이터가 추가된 행 수
    // insert가 제대로 되었다면 affectedRows는 1이 되어야 함 (1개의 행이 추가되었으니까)
    if(result.affectedRows === 1) {  // result.affectedRows === 1 : 회원가입이 성공적으로 이루어졌는지 확인하는 조건문
      return {
        success: true,
        message : "회원가입 성공"
      }
    }
    // 에러는 아니지만 실패한 경우 (이런 경우가 있나?)
    return {
      success: false,
      message: "service 회원가입 실패"
    };
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return {
        success: false,
        message: "이미 존재하는 아이디"
      };
    }
    return {
      success: false, 
      message: "service 회원가입 에러"
    }
  }
}

// 회원가입 - 아이디 중복 체크 여부
exports.checkId = async(user_id) => {
  // userModel에서 chekcId 쿼리를 받아서 result에 저장
  const result = await userModel.checkId(user_id);

  try {
    const exists = result.length > 0; // user_id가 0개 이상이면 true
    console.log(exists);
    return {
      exists,
      message: exists ? "이미 아이디가 존재합니다."  : "사용 가능한 아이디입니다."
    }
  } catch (error) {
    console.error(error);
    return {
      message: "service 아이디 중복 체크 에러"
    }
  }
}

exports.login = async(user_id, pwd) => {
  // promise로 userModel.checkId(user_id);의 값을 다 받아온 후에
  const result = await userModel.checkId(user_id);
  // result의 첫번째값 가져오기 (db 쿼리가 배열로 오기 때문)
  const user = result[0];
  try {
    if (user && await bcrypt.compare(pwd, user.pwd)) {
      // user 정보가 존재하고 비밀번호 비교가 가능하다면
      // payload : JWT 토큰을 생성하는 코드
      //  - jwt.sign(토큰에 담을 정보, 토큰 서명용 비밀키, 토큰 만료시간)
      const token = jwt.sign({user_id: user.user_id, user_name: user.user_name}, JWT_SECRET, {expiresIn: '12h'});  //token 변수에 Payload에 유저 정보를 담아 서명

      return {
        success: true,
        token
      }
    }
    if(!(await bcrypt.compare(pwd, user.pwd))) {
      // 비밀 번호가 틀렸다면
      // 비밀번호 비교 함수 : bcrypt.compare(입력받은비번, db 등록된 암호화(해시)비번)
      return {
        success: false,
        message: "비밀번호가 틀렸습니다."
      }
    }
    if(!user) {
      // 아이디가 없을 경우 (아이디를 비교했기 때문에)
      return{
        message: "아이디가 없습니다."
      }
    }
  } catch (error) {
    console.error(error);
    return {
      message: "service 로그인 에러"
    }
  }
}