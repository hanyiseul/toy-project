// userModel : db 쿼리 관리

// db.js에서 mysql2 라이브러리를 이용해서 만든 pool 객체를 가져와서 DB 쿼리를 실행하는 함수들을 정의
const pool = require("../db.js");

// 회원가입
exports.signup = async (user_name, user_id, pwd, birth_date, tel) => {
  // 실행할 sql문
  // member 테이블에 입력 정보 행 
  // values (?, ?, ?, ?, ?) : 나중에 값을 넣기 위한 자리 표시
  const sql = `
    insert into member (user_name, user_id, pwd, birth_date, tel)
    values (?, ?, ?, ?, ?)
  `;

  // pool.query(실행할 쿼리문, sql에 들어갈 값 (values (?, ?, ?, ?, ?)))
  //  -> pool은 db.js에서 저장한 db 정보 변수
  // [rows(쿼리 결과), fuekds(컬럼 정보)] : 여기서는 fields는 필요 없어서 result만 꺼내서 저장
  // pool.query 실행 -> db 쿼리 실행 -> (await 기다렸다가 결과 반환) -> result에 저장
  const [rows] = await pool.query (sql, [user_name, user_id, pwd, birth_date, tel]); // await: 비동기 작업이 끝날때까지 기다렸다가 결과를 받음

  return rows;
}

// 아이디 중복체크 여부, 로그인
exports.checkId = async(user_id) => {
  const sql = `
    select user_id from member where user_id=?
  `

  // 아이디 중복체크를 하기 때문에 로그인도 하나만 뜰듯
  const [rows] = await pool.query (sql, user_id);
  
  return rows;
}