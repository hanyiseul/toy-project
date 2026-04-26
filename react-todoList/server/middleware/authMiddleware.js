// 로그인 인증 정보 미들웨어 : 로그인 정보가 필요한 요청과 응답 사이에서 인증 확인 -> 로그인 인증은 여러 기능에서 사용되기 때문에 별도 파일로 관리
// 요청 헤더에 포함된 토큰 검증하여 현재 로그인된 정보 확인

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// next는 Express가 자동으로 넣어주는 함수
// next() : 다음 미들웨어(또는 라우트 함수)로 넘어가게 하는 함수
const authToken = (req, res, next) => { 
  console.log("실행됨")
  const authHeader = req.headers['authorization']; // 헤더에서 토큰 꺼냄

  // authHeader : beare hash값
  const token = authHeader?.split(" ")[1]; // authHeader가 존재하면 authHeader의 1번째 값 저장
  // .split(" ") : 공백 기준으로 배열 나눔
  
  if(!token) return res.josn({success: false}); // token 정보가 없다면 success 실패 전달

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if(err) return res.json({success: false}); // 에러가 난다면 실패 전달
    req.user = decoded;  // 로그인된 유저 정보 저장

    next(); // 처리 성공시 다음으로 넘겨야 함
  })
}
module.exports = authToken;