
전체 구조 개념

브라우저 
-> 라우터  (파일 연결) - 완료
-> 컨트롤러 (요청/응답 처리 - api)
-> 서비스 (실제 서비스 로직 처리 - 기능) 
-> 모델 (db 쿼리) - 데이터베이스 스키마 저장
-> db (db 연결 정보 관리)

로직 분리
참고
폴더구분 : https://velog.io/@wndyd0131/nodejs-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%B0%B1%EC%97%94%EB%93%9C%EC%9D%98-%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC-%EA%B5%AC%EC%A1%B0


코드 실행 흐름
1️⃣ DB 구조 (SQL)
2️⃣ model (DB query)
3️⃣ service (비즈니스 로직)
4️⃣ controller (요청/응답 처리)
5️⃣ router (URL 연결)
6️⃣ server (라우터 등록)





model → DB
service → 실제 로직
controller → 요청 처리

모델에서 db api 처리하고 service에서 기능 만들고 controller에서 요청처리하고
프론트단에서 해당 데이터 받아서 처리



회원가입 -> 로그인 (JWT 인증)

비밀번호 네자리 로그인

로그인 계정 데이터 조회 

마이페이지

---------------------------------

인증은 모든 페이지에서 써야하므로 
공통 js로 빼주기




---------------------------------
시작 -> 로그인
회원가입 -> 아이디 중복확인 (유니크값), 비밀번호 중복 확인


---
로그인
로그인 요청
↓
controller
↓
service
↓
model
↓
DB user 조회
↓
bcrypt.compare(입력비밀번호, DB해시)
↓
JWT 발급
↓
token 반환

