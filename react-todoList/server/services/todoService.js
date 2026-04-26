// todoService.js : 할일 서비스 처리

const todoModel = require("../models/todoModel"); // db 쿼리 설정한 todoModel 연결

// 할일 조회
exports.getTodo = async(title, memo, user_id) => {
  try {
    const result = await todoModel.getTodo(title, memo, user_id);
    
    // 결과값이 없거나 0일 경우 빈배열 반환
    if(!result || result.length === 0) {
      return {
        success: true,
        data: []
      }
    }

    return {
      success: true,
      data: result
    }
  } catch(err) {
    console.error("todoService 에러: ", err);
    
    return {
      success: false,
      message: "todoService 조회 에러"
    }
  }
}

// 할일 등록
exports.createTodo = async(title, memo, user_id) => {
  try {
    const result = await todoModel.createTodo(title, memo, user_id);

    return {
      success: true,
      data: result
    }
  } catch(err) {
    console.error("todoService 에러: ", err);
    
    return {
      success: false,
      message: "todoService 등록 에러"
    }
  }
}

// 할일 삭제
exports.deleteTodo = async(id) => {
  try {
    const result = await todoModel.deleteTodo(id);

    return {
      success: true,
      data: result
    }
  } catch(err) {
    console.error("todoService 에러: ", err);
    
    return {
      success: false,
      message: "todoService 삭제 에러"
    }
  }
}

// 할일 수정
exports.updateTodo = async(id,title, memo) => {
  try {
    const result = await todoModel.updateTodo(id,title, memo);

    return {
      success: true,
      data: result
    }
  } catch(err) {
    console.error("todoService 에러: ", err);
    
    return {
      success: false,
      message: "todoService 수정 에러"
    }
  }
}


// todoModel test code
// 할일 조회 테스트 코드
// (async () => {
//   try {
//     const user_id = "test123";
//     const result = await exports.getTodo(null, null, user_id);
//     console.log("조회 결과:", result);
//   } catch (err) {
//     console.error("테스트 에러:", err);
//   }
// })();

// 할일 등록 테스트 코드
// (async () => {
//   try {
//     const user_id = "test123";
//     const result = await exports.createTodo('할일1', '하기시졍', user_id);
//     console.log("등록 결과:", result);
//   } catch (err) {
//     console.error("테스트 에러:", err);
//   }
// })();
// 할일 삭제 테스트 코드
// (async () => {
//   try {
//     const user_id = "test123";
//     const result = await exports.deleteTodo(2);
//     console.log("삭제 결과:", result);
//   } catch (err) {
//     console.error("테스트 삭제:", err);
//   }
// })();
// 할일 수정 테스트 코드
// (async () => {
//   try {
//     const user_id = "test123";
//     const result = await exports.updateTodo(3, "할일2", "힝");
//     console.log("수정 결과:", result);
//   } catch (err) {
//     console.error("테스트 수정:", err);
//   }
// })();