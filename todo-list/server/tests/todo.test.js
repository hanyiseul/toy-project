const todoService = require('../services/todoService');
const pool = require('../db'); // db 연결

let createdId;  // insertId 저장 (수정/삭제에 사용)

// 테스트 데이터 준비
beforeAll(async () => {
  // FK 있으면 users 먼저 있어야 함
  await pool.query(`DELETE FROM todos WHERE user_id='test_user'`);
  await pool.query(`DELETE FROM users WHERE user_id='test_user'`);

  // test 유저 생성
  await pool.query(`
    INSERT INTO users (name, user_id, pwd)
    VALUES ('테스트', 'test_user', '1234')
  `);
  // 테스트 데이터 생성
  await pool.query(`
    INSERT INTO todos (title, memo, user_id)
    VALUES 
    ('할일1', '메모1', 'test_user'),
    ('할일2', '메모2', 'test_user')
  `);
});


describe('todoService (DB 테스트)', () => {
  // 정상 조회
  it('todoList - 데이터 정상 조회', async () => {
    const result = await todoService.getTodo('test_user');

    expect(result.success).toBe(true);
    expect(result.data.length).toBeGreaterThan(0);

    // 데이터 내용 확인 (선택)
    expect(result.data[0]).toHaveProperty('title');
  });

  // 데이터 없음
  it('todoList - 데이터 없음', async () => {
    const result = await todoService.getTodo('no_user');

    expect(result.success).toBe(true);
    expect(result.data).toEqual([]);
  });
  
  // 등록 테스트
  it('createTodo - 등록 성공', async () => {
    const result = await todoService.createTodo(
      '테스트 할일',
      '테스트 메모',
      'test_user'
    );

    expect(result.success).toBe(true);
    createdId = result.data.insertId;
    expect(createdId).toBeDefined();
  });

  // 수정 테스트
  it('updateTodo - 수정 성공', async () => {
    const result = await todoService.updateTodo(
      createdId,
      '수정된 할일',
      '수정된 메모'
    );

    expect(result.success).toBe(true);

    // 실제 DB 확인
    const [rows] = await pool.query(
      `SELECT * FROM todos WHERE id = ?`,
      [createdId]
    );

    expect(rows[0].title).toBe('수정된 할일');
  });

  // 삭제 테스트 
  it('deleteTodo - 삭제 성공', async () => {
    const result = await todoService.deleteTodo(createdId);

    expect(result.success).toBe(true);

    // 실제 DB 확인
    const [rows] = await pool.query(
      `SELECT * FROM todos WHERE id = ?`,
      [createdId]
    );

    expect(rows.length).toBe(0);
  });

  // 에러 테스트 (DB 끊는 건 위험하니까 spy 사용)
  // it('todoList - 에러 발생', async () => {
  //   const spy = jest.spyOn(pool, 'query').mockRejectedValue(new Error('DB 에러'));

  //   const result = await todoService.getTodo(null, null, 'test_user');
  //   expect(result.success).toBe(false);
  //   spy.mockRestore();
  // });
});

// 테스트 종료 후 정리
afterAll(async () => {
  await pool.query(`DELETE FROM todos WHERE user_id='test_user'`);
  await pool.end();
});
