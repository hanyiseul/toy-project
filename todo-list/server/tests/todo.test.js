const todoService = require('../services/todoService');
const todoModel = require('../models/todoModel');

// 모델 mock 처리
jest.mock('../models/todoModel');

describe('todoService 테스트', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // 정상 조회 (데이터 있음)
  it('todoList - 데이터 정상 조회', async () => {
    const mockData = [
      { id: 1, title: '할일1', memo: '메모1' },
      { id: 2, title: '할일2', memo: '메모2' }
    ];

    todoModel.getTodo.mockResolvedValue(mockData);

    const result = await todoService.todoList('t1', 'm1', 'user1');

    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockData);
  });

  // 조회 결과 없음 (빈 배열)
  it('todoList - 데이터 없음', async () => {
    todoModel.getTodo.mockResolvedValue([]);

    const result = await todoService.todoList('t1', 'm1', 'user1');

    expect(result.success).toBe(true);
    expect(result.data).toEqual([]);
  });

  // 에러 발생
  it('todoList - 에러 발생', async () => {
    todoModel.getTodo.mockRejectedValue(new Error('DB 에러'));

    const result = await todoService.todoList('t1', 'm1', 'user1');

    expect(result.success).toBe(false);
    expect(result.message).toBe('todoService 에러');
  });

});