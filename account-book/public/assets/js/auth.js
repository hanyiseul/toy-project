// 토큰 검증 요청 공통 함수
export const checkAuth = async() => {
  const token = localStorage.getItem('myToken');
  if(!token) {location.href = "/login"; return;}

  // 토큰 검증 요청 (헤더에 토큰 실어서 보냄)
  const authRes = await fetch("/api/user/verify", {
    headers: {"Authorization": `Bearer ${token}`}
  });

  const authData = await authRes.json();

  if(!authData) {
    location.href = "/login";
  }
  return authData.user;
}