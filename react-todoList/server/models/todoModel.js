// todoModel.js : 할 일 모델 정의

const pool = require("../db.js"); // db 연결 객체

// 할일 조회 (r)
exports.getTodo = async(user_id) => {
  // user_id 기준으로 할일 조회 쿼리
  const sql = `
    select * 
    from todos
    where user_id=?
    order by created_at  desc;
  `;

  const [rows] = await pool.query(sql, [user_id]);
  return rows;
}

// 할일 생성 (c)
exports.createTodo = async(title, memo, user_id) => {
  // 입력한 todo 삽입 쿼리
  const sql = `
    insert into todos (title, memo, user_id)
    values (?,?,?)
  `;

  // pool에서 커넥션 하나 가져와서 해당 sql 실행
  const [rows] = await pool.execute(sql, [title, memo, user_id]);
  // 실행 쿼리 반환
  return rows;
}

// 할일 삭제 (d)
exports.deleteTodo = async(id) => {
  // 할일 삭제 쿼리
  const sql = `
    delete from todos where id=?
  `;

  const [rows] = await pool.query(sql, [id]);
  return rows;
}

// 할일 수정 (u)
exports.updateTodo = async(id,title, memo) => {
  // 할일 수정
  const sql = `
    update todos set title=?, memo=?
    where id=?
  `;
  const [rows] = await pool.query(sql, [title, memo, id]);
  return rows;
}