// db.js : 데이터베이스 연결 설정

// createPool : MySQL 연결을 여러개 만들어놓고 필요할 때 꺼내쓰는 방식
const { createPool } = require("mysql2/promise"); // mysql2(async/await 가능) 모듈에서 createpool 함수 가져오기

// createPool 함수로 MySQL 연결 생성
const pool = createPool({ // db 여러개 미리 만들어놓고 필요할 때 꺼내쓰는 방식
  host: "localhost", // db 서버 주소
  user: "testuser", // db 접속 계정
  password: "1234", // db 접속 계정 비밀번호
  database: "todoList", // db 이름
  waitForConnections: true, // pool에 사용 가능한 커넥션이 없을 경우 대기 처리
  connectionLimit: 10, // 최대 연결 갯수
  queueLimit: 0, // 대기열 최대 갯수 (0은 무제한)
});

module.exports = pool; // 다른 파일에서 db 연결 객체 사용 가능하도록 내보내기