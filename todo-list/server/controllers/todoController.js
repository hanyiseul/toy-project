// todoController.js : 응답/요청 데이터 처리

// 연결 설정
const todoService = require("../services/todoService.js"); // 비즈니스 로직 파일 연결

// 할일 조회
exports.getTodo = async (req, res) => {
  try {
    const user_id = req.user.user_id; // JWT 기준

    const result = await todoService.getTodo(user_id);

    res.json(result);

  } catch (err) {
    console.error("todo 조회 에러:", err);

    res.json({
      success: false,
      message: "todo 조회 실패"
    });
  }
};

// 할일 생성
exports.createTodo = async (req, res) => {
  try {
    const { title, memo } = req.body;
    const user_id = req.user.user_id;

    const result = await todoService.createTodo(title, memo, user_id);

    res.json(result);

  } catch (err) {
    console.error("todo 생성 에러:", err);

    res.json({
      success: false,
      message: "todo 생성 실패"
    });
  }
};

// 할일 삭제
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await todoService.deleteTodo(id);

    res.json(result);

  } catch (err) {
    console.error("todo 삭제 에러:", err);

    res.json({
      success: false,
      message: "todo 삭제 실패"
    });
  }
};

// 할일 수정
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, memo } = req.body;

    const result = await todoService.updateTodo(id, title, memo);

    res.json(result);

  } catch (err) {
    console.error("todo 수정 에러:", err);

    res.json({
      success: false,
      message: "todo 수정 실패"
    });
  }
};