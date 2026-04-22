// userModels.js : 사용자 모델 정의

const pool = require("../db.js"); // db 연결 객체

// 회원가입
exports.signup = async (name, user_id, pwd) => {
  // 실행할 sql문
  // user 테이블에 입력값(valuse (?)부분) 삽입(insert)
  const sql = `
    insert into users (name, user_id, pwd)
    values (?,?,?)
  `

  // pool에서 커넥션 하나 가져와서 해당 sql 실행  
  const [rows] = await pool.query(sql, [name, user_id, pwd]);

  return rows;
}

// 로그인, 아이디 중복 체크
exports.checkId = async(user_id) => {
  const sql = `
    select * from users where user_id = ?
  `
  
  const [rows] = await pool.query(sql, [user_id]);
  
  return rows;
}