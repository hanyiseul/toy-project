// db 연결
const pool = require('../db.js');

// 가계부 데이터 조회
exports.getAccountData = async (user_id, year, month) => {
  // 계정에 맞는 가계부 내역 조회
  const sql = `
    select user_id, amount, category, type, memo, create_at
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
  `
  // 총 소비금액 조회
  const MaxCategorySql = `
    select category 
    from transactions
    where user_id = ?
      and year(create_at) = ?
      and month(create_at) = ?
    group by category
    order by SUM(amount) desc
    LIMIT 1
  `

  const [result] = await pool.query(sql, [user_id, year, month]);
  const [total] = await pool.query(totalSql, [user_id, year, month]);
  const [category] = await pool.query(MaxCategorySql, [user_id, year, month]);

  return {
    data: result,
    totalSpend: total[0]?.total || 0, // total[0]이 있으면 total을 반환, 없으면 0
    MaxCategory: category[0]?.category || null  // category[0]이 있으면 category 반환, 없으면 null
  }
}

// mysql2는 SQL 결과를 항상 배열 형태의 rows로 반환하기 때문에
// total[0], category[0]의 값으로 가져와야함