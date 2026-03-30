// 토큰 검증 요청 공통 함수
export const checkAuth = async() => {
  const token = localStorage.getItem('myToken'); // 로컬스토리지에 토큰 정보를 담고
  if(!token) {location.href = "/login"; return;} // 토큰이 없다면 로그인 화면으로 이동

  // 토큰 검증 요청 (헤더에 토큰 실어서 보냄)
  const authRes = await fetch("/api/user/verify", {
    headers: {"Authorization": `Bearer ${token}`} // 소지자(Bearer)가 토큰을 제시하면 인증을 허가
  });

  const authData = await authRes.json(); // 토큰 json 정보를 js 객체로 반환

  if(!authData) { // 토큰 정보가 없다면
    location.href = "/login"; // login 화면으로 이동하고
  }
  return authData.user; // 있다면 토큰의 user 데이터 반환
}