전체 구조 개념

브라우저 
-> 라우터  (파일 연결) - 완료
-> 컨트롤러 (요청/응답 처리 - api)
-> 서비스 (실제 서비스 로직 처리 - 기능) 
-> 모델 (db 쿼리) - 데이터베이스 스키마 저장
-> db (db 연결 정보 관리)

server.js에서 모두 관리하자니 소스 읽기 너무 불편!
기능별로 쪼개기
참고
폴더구분 : https://velog.io/@wndyd0131/nodejs-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%B0%B1%EC%97%94%EB%93%9C%EC%9D%98-%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC-%EA%B5%AC%EC%A1%B0


작업 순서
1️⃣ DB 구조 (SQL)
2️⃣ models (DB query)
3️⃣ controller (비즈니스 로직)
4️⃣ router (URL 연결)
5️⃣ server 연결


controller → 요청 처리
service → 실제 로직
model → DB


회원가입 -> 로그인 (JWT 인증)

비밀번호 네자리 로그인

로그인 계정 데이터 조회 

마이페이지

