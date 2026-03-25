// service.js : 실제 비즈니스 로직 처리
// 로그인, JWT 발급, 회원 정보 조회 등 서비스 함수들을 여기에 추가할 수 있음

const userModel = require("../models/userModel.js");
const jwt = require('jsonwebtoken'); // JWT : JSON Web Token, 사용자 인증에 사용되는 토큰 기반 인증 방식
const bcrypt = require('bcrypt'); // bcrypt : 비밀번호 암호화 라이브러리
const JWT_SECRET = process.env.JWT_SECRET; // .env에 랜덤키 생성 (원래는 git에 올리면 안됨)

// 회원가입
exports.signup = async (user_name, user_id, user_pwd, birth_date, tel) => {
  try {
    //  userModel.signup 함수 실행 -> DB에 회원가입 정보 저장 -> 결과 반환

    // 비밀번호 암호화
    // hash(암호화할 문자열, saltRounds) : 비밀번호를 암호화하는 함수, saltRounds는 암호화 강도를 나타내는 값 (값이 높을수록 더 안전하지만 처리 시간이 길어짐)
    const hashedPwd = await bcrypt.hash(user_pwd, 10); 

    const result = await userModel.signup( // await : 비동기 작업이 끝날 때까지 기다렸다가 결과를 받는 키워드
      user_name,
      user_id,
      hashedPwd,
      birth_date,
      tel
    );

    // affectedRows = 실제로 데이터가 추가된 행 수
    // insert가 제대로 되었다면 affectedRows는 1이 되어야 함 (1개의 행이 추가되었으니까)
    if (result.affectedRows === 1) {  // result.affectedRows === 1 : 회원가입이 성공적으로 이루어졌는지 확인하는 조건문
      return {
        success: true,
        message: "회원가입 성공"
      };
    }
    // 에러는 아니지만 실패한 경우 (실패하면 에러로 넘겨야하나?)
    return {
      success: false,
      message: "회원가입 실패"
    };

  } catch (error) { 
    console.error(error);

    // 아이디 중복 에러
    if(error.code === "ER_DUP_ENTRY") { // mysql은 대문자로 반환
      return {
        success: false,
        message: "이미 존재하는 아이디입니다."
      };
    }

    // 그 외의 에러
    return {
      success: false,
      message: "회원가입 중 오류 발생"
    };
  }
};

// 회원가입 - 아이디 중복 여부 체크
exports.checkId = async (user_id) => {
  const result = await userModel.checkId(user_id);

  // 그 외의 에러
  return {
    exists: result.length > 0, // result가 0개 이상이면 true
    message: "아이디가 존재합니다."
  };
}

exports.login = async (user_id, user_pwd) => {
  const user = await userModel.login(user_id);

  // 만약 아이디가 없다면
  if(!user) {
    return {
      success: false,
      message: "아이디가 없습니다."
    }
  }

  // 비밀번호가 틀렸다면
  if(!(await bcrypt.compare(user_pwd, user.pwd))) {
    return {
      success: false,
      message: "비밀번호가 틀렸습니다."
    }
  }

  // user 정보가 존재하고 비밀번호 비교가 가능하다면
  if(user && await bcrypt.compare(user_pwd, user.pwd)) { // 비밀번호 비교 함수 : bcrypt.compare(입력비밀번호, db해시비밀번호)
    // playload : JWT 토큰을 생성하는 코드 - jwt.sign(토큰에 담을 정보, 토큰 서명용 비밀키, 토큰 만료시간)
    const token = jwt.sign({user_id: user.user_id, user_name: user.user_name}, JWT_SECRET, { expiresIn: '12h' }); //token 변수에 Payload에 유저 정보를 담아 서명

    return {
      success: true,
      token
    }
  }
}

/**
 * 
 * 중복 발생시 node 객체 에러
 * {
      code: 'ER_DUP_ENTRY',
      errno: 1062,
      sqlMessage: "Duplicate entry 'hong' for key 'member.user_id'"
    }
 *
 */