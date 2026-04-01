// db 연결
const pool = require('../db.js');

// mysql2는 SQL 결과를 항상 배열 형태의 rows로 반환하기 때문에
// total[0], category[0]의 값으로 가져와야함

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

  const [result] = await pool.query(sql, [user_id, year, month]);
  const [total] = await pool.query(totalSql, [user_id, year, month]);
  const [category] = await pool.query(MaxCategorySql, [user_id, year, month]);
  const [daySpend] = await pool.query(daySql, [user_id, year, month]);

  console.log(daySpend);
  return {
    data: result,
    totalSpend: total[0]?.total || 0, // total[0]이 있으면 total을 반환, 없으면 0
    MaxCategory: category[0]?.category || null,  // category[0]이 있으면 category 반환, 없으면 null
    dayAccount: daySpend || null  // daySql 있으면 결과값 반환, 없으면 null
  }
}


// 월별 총 소비금액과 월별 최다 소비 카테고리 쿼리문 합칠 수 있을지 고민해보기
// -> 서브쿼리문 사용? 가독성이 너무 떨어짐
// 일단 한 함수 안에 한번에 불러와지게 기능별로 쪼갠 후에 고민해보기