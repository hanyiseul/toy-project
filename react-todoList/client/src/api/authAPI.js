// 서버랑 통신만 하는 파일

// 검증 요청 api
export const verify = async(token) => {
 const auth = await fetch("/api/user/verify", {
    headers: {"Authorization": `Bearer ${token}`} // 소지자(Bearer)가 토큰을 제시하면 인증을 허가
  });

  const authData = await auth.json(); // 토큰 정보 저장

  if (!authData.success) { // 검증 실패시 강제 오류처리
    throw new Error("토큰 만료");
  }
  return authData;

}