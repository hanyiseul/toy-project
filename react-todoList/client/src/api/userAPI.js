// userAPI.js : 서버랑만 통신하는 파일

// 회원가입 api
export const signup = async (name, user_id, pwd) => {
  try {
    const res = await fetch("/api/user/signup", { // fetch : http에 api 요청 보냄
      method: "POST", // 등록 요청 전송
      headers: {"Content-Type" : "application/json"}, // 헤더에 json 데이터라고 명시
      body: JSON.stringify({name, user_id, pwd}) // 본문에 회원가입 정보를 json 데이터로 전송
    });

    const data = await res.json(); // 응답 받은 데이터 js 객체로 변환하여 저장
    if(!res) throw new Error("서버 응답 실패");  // 서버 응답 실패시 강제 에러 처리
    return data; // data 반환

  } catch (err) {
    console.error("api 회원 가입 에러: ", err);
  }
}

// 아이디 체크 api
export const checkId = async (user_id) => {
  try {
    // 해당 user_id의 데이터만 가져오기 위해 쿼리파라미터 사용
    const res = await fetch(`/api/user/checkId?user_id=${user_id}`);

    const data = await res.json(); // 응답 받은 데이터 js 객체로 변환하여 저장
    if(!res) throw new Error("서버 응답 실패");  // 서버 응답 실패시 강제 에러 처리
    return data; // data 반환

  } catch (err) {
    console.error("api 아이디 체크 에러: ", err);
  }
}

// 로그인 api
export const login = async (user_id, pwd) => {
  try { 
    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: {"Content-Type" : "application/json"}, // 헤더에 json 데이터라고 명시
      body: JSON.stringify({user_id, pwd}), // 본문에 회원가입 정보를 json 데이터로 전송
      credentials: "include" // 쿠키 옵션 가져오는 옵션
    });
    const data = await res.json(); // json 데이터를 js 객체로 변환
    if(!data.success) throw new Error(data.message); // 로그인 실패시 강제 오류
    return data;
  } catch(err) {
    console.error("api 실패", err);
  }
}

// 로그아웃 api
export const logout = async () => {
  try { 
    const res = await fetch("/api/user/logout", {
      method: "POST",
      credentials: "include"
    });
    const data = await res.json(); // json 데이터를 js 객체로 변환
    return data;
  } catch(err) {
    console.error("api 로그아웃 실패", err);
  }
};