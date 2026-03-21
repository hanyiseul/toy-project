// modeles.js : DB query 관리
// db.js에서 mysql2 라이브러리를 이용해서 만든 pool 객체를 가져와서 DB 쿼리를 실행하는 함수들을 정의

const pool = require('../db.js');

// 회원가입
// async : async 비동기 요청 처리 (함수 안에서 await를 사용할 수 있게 해줌)
exports.signup = async (user_name, user_id, user_pwd, birth_date, tel) => {
  // 실행할 sql문
  const sql = `
    insert into member (user_name, user_id, pwd, birth_date, tel)
    values (?, ?, ?, ?, ?)
  ` 
  // pool.query(실행할 쿼리문, sql에 들어갈 값 (values (?,?,...)))
  // pool.query 실행 -> db 쿼리 실행 -> 결과 반환 -> result에 저장
  // [result(쿼리 결과), fields(컬럼 정보)] : fields는 필요 없어서 result만 꺼내서 저장
  const [result] =  await pool.query(sql, [user_name, user_id, user_pwd, birth_date, tel]); // await : 비동기 작업이 끝날 때까지 기다렸다가 결과를 받음

  return result;
};

// 회원가입 - 아이디 중복 여부 체크
exports.checkId = async (user_id) => {
  const sql = `
    select user_id from member where user_id = ?
  `

  const [result] =  await pool.query(sql, [user_id]);

  return result;
}

/**
 * pool.query : db 커넥션 pool에서 커넥션 하나 가져와서 sql 실행하고 다시 pool로 반환
 * pool -> connection 하나 가져옴 -> query 실행 -> connection 반환
 * 
 * MYSQL2 라이브러리에서 query()를 실행하면 2개의 값을 배열로 반환 [result(쿼리 결과), fields(컬럼 정보)]
 *  => [
          { affectedRows: 1, insertId: 5 },
          [column metadata ...]
        ]
 * 배열 구조 분해 할당 : const [result] = await pool.query(sql, [...]);
 */