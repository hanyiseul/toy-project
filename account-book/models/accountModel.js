// db 연결
const pool = require('../db.js');

// mysql2는 SQL 결과를 항상 배열 형태의 rows로 반환하기 때문에
// total[0], category[0]의 값으로 가져와야함

// 가계부 데이터 조회
exports.getAccountData = async (user_id, year, month) => {
  // 계정에 맞는 가계부 내역 조회
  const sql = `
    select id, user_id, amount, category, type, memo, create_at
    from transactions
    where user_id = ?
      and year(create_at) = ?
      and month(create_at) = ?
      order by create_at desc
  `
  // 최다 소비 내역 조회
  const totalSql = `
    select SUM(amount) as total
    from transactions
    where user_id = ?
      and year(create_at) = ?
      and month(create_at) = ?
      and type = 'expense'
  `
  // 총 소비금액 조회
  const MaxCategorySql = `
    select category 
    from transactions
    where user_id = ?
      and year(create_at) = ?
      and month(create_at) = ?
      and type = 'expense'
    group by category
    order by SUM(amount) desc
    LIMIT 1
  `

  // 일 소비금액 조회
  // %Y-%m-%d : 2026-03-07
  // %Y-%M-%D : 2026-March-7th
  const daySql = `
    select DATE_FORMAT(create_at, '%Y-%m-%d') as day, SUM(amount) as total
    from transactions
    where user_id = ?
      and year(create_at) = ?
      and month(create_at) = ?
      and type = 'expense'
    group by day
  `
  const incomeSql = `
    select SUM(amount) as income
    from transactions
    where user_id = ?
      and year(create_at) = ?
      and month(create_at) = ?
      and type = 'income'
    group by type
  `
  
  const balanceSql = `
    select SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - 
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as balance
    from transactions
    where user_id = ?
      and year(create_at) = ?
      and month(create_at) = ?
  `

  // 요청할 쿼리 변수들
  const [result] = await pool.query(sql, [user_id, year, month]);
  const [total] = await pool.query(totalSql, [user_id, year, month]);
  const [category] = await pool.query(MaxCategorySql, [user_id, year, month]);
  const [daySpend] = await pool.query(daySql, [user_id, year, month]);
  const [income] = await pool.query(incomeSql, [user_id, year, month]);
  const [balance] = await pool.query(balanceSql, [user_id, year, month]);

  return {
    data: result,
    totalSpend: total[0]?.total || 0, // total[0]이 있으면 total을 반환, 없으면 0
    MaxCategory: category[0]?.category || null,  // category[0]이 있으면 category 반환, 없으면 null
    dayAccount: daySpend || null,  // daySql 있으면 결과값 반환, 없으면 null
    income: income[0]?.income || null,  // income 있으면 결과값 반환, 없으면 null
    balance: balance[0]?.balance || null  // daySql 있으면 결과값 반환, 없으면 null
  }
}

// 등록
exports.registAccount = async (user_id, amount, memo, category, type, create_at) => {
  const sql = `
    insert into transactions (user_id, amount, memo, category, type, create_at) values (?, ?, ?, ?, ?, ?)
  `

  const [rows] = await pool.query(sql, [user_id, amount, memo, category, type, create_at]);

  return rows;
}

// 삭제
exports.deleteAccount = async (id) => {
  const sql = `
    DELETE FROM transactions where id = ?
  `

  const [rows] = await pool.query(sql, [id]);

  return rows;
}

// 수정
exports.updateAccount = async (id, data) => {
  const { type, category, amount, memo, create_at } = data;

  const [result] = await pool.query(
    `UPDATE transactions 
     SET type=?, category=?, amount=?, memo=?, create_at=? 
     WHERE id=?`,
    [type, category, amount, memo, create_at, id]
  );

  return result;
};

// 상세 조회
exports.getAccountDetail = async (id) => {
  const [rows] = await pool.query(
    `SELECT * FROM transactions WHERE id=?`,
    [id]
  );
  return rows;
};

// 월별 총 소비금액과 월별 최다 소비 카테고리 쿼리문 합칠 수 있을지 고민해보기
// -> 서브쿼리문 사용? 가독성이 너무 떨어짐
// 일단 한 함수 안에 한번에 불러와지게 기능별로 쪼갠 후에 고민해보기