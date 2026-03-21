// db.js : db 계정 정보 관리

const { createPool } = require("mysql2/promise");

const pool = createPool({ // db 연결을 여러개 만들어 미리 관리하는 pool 생성
  host: "localhost", // db 서버 주소
  user: "testuser", // db 로그인 계정
  password: "1234", // db 로그인 비밀번호
  database: "accountBook", // 연결할 데이터 베이스 이름
  waitForConnections: true, // pool에 사용 가능한 커넥션이 없을 경우 대기 처리
  connectionLimit: 10, // 최대 연결 갯수
  queueLimit: 0 // 대기열(queue)에 저장할 요청 개수 제한 (0: 무제한 대기)
});

module.exports = pool;

/**
 * createPool
 * 여러 개의 db 커넥션이 발생할 수 있기 때문에 미리 만들어 pool에 저장하여
 * 필요할때 꺼내 쓸 수 있는 createPool 사용
 * 
 * 장점 : 미리 만들어서 꺼내 쓰는 형태이기 때문에 새로 생성해서 연결하는 방식보다 빠름
 * 단점 : pool이 너무 적으면 대기 시간이 발생할 수 있고, 너무 많으면 메모리 소모가 커질 수 있음
 * => 사용자수와 메모리 상황에 맞게 적절하게 활용해야 함!
 * 
 */