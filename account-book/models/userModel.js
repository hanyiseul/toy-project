// modeles.js : DB query 관리

const pool = require('../db.js');

// 회원가입
exports.join = async (user_name, user_id, pwd, birth_date, tel) => { // async : async 비동기 요청 처리 (함수 안에서 await를 사용할 수 있게 해줌)
  // 실행할 sql문
  const sql = `
    insert into member (user_name, user_id, pwd, birth_date, tel)
    values (?, ?, ?, ?, ?)
  ` 
  // pool.query(실행할 쿼리문, sql에 들어갈 값 (values (?,?,...)))
  // pool.query 실행 -> db 쿼리 실행 -> 결과 반환 -> result에 저장
  const [result] = await pool.query(sql, [user_name, user_id, pwd, birth_date, tel]) // await : DB 쿼리 실행이 끝날 때까지 기다린 후 결과 반환

  return result;
};


/**
 * pool.query : db 커넥션 pool에서 커넥션 하나 가져와서 sql 실행하고 다시 pool로 반환
 * pool -> connection 하나 가져옴 -> query 실행 -> connection 반환
 */