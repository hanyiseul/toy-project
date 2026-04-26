// todoAPI : 서버랑만 통신하는 파일

// 할일 추가 api (create)
export const createTodo = async(memo) => {
  try {
    const res = await fetch("/api/todo/create", {
      method: "POST", // 등록 전송 요청
      headers: {"Content-Type" : "application/json"},
      credentials: "include",
      body: JSON.stringify({memo})
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("api 등록 실패", err)
  }
}

// 할일 조회 api (read)
export const getTodo = async(user_id) => {
  try {
    const response = await fetch(`/api/todo/get?user_id=${user_id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("api 조회 실패", err)
  }
}

// 할일 수정 api
export const updateTodo = async(id, memo) => {
  try {
    const res = await fetch(`/api/todo/update/${id}`, {
      method: "PUT", // 수정
      headers: {"Content-Type" : "application/json"},
      credentials: "include",
      body: JSON.stringify({memo})
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("api 수정 실패", err)
  }
}


// 할일 삭제 api
export const deleteTodo = async(id) => {
  try {
    const res = await fetch(`/api/todo/delete/${id}`, {
      method: "DELETE", // 삭제
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("api 수정 실패", err)
  }
}

// 완료 체크 api
export const status = async(id, is_done) => {
  try {
    const res = await fetch(`/api/todo/status/${id}`, {
      method: "PUT", // 수정
      headers: {"Content-Type" : "application/json"},
      credentials: "include",
      body: JSON.stringify({is_done})
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("api 상태 실패", err)
  }
}