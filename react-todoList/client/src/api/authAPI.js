// 서버랑 통신만 하는 파일

// 검증 요청 api
export const verify = async() => {
 const auth = await fetch("/api/user/verify", {
    credentials: "include", // 쿠키 정보 보내는 옵션
    mode: "cors" 
  });

  const authData = await auth.json(); // 쿠키 정보 저장

  if (auth.status === 401) {
    return { success: false };
  }

  return authData;

}