워크플로우

회원가입 - 로그인 - 해당 계정 할일 데이터 로딩 후 반영
할일 입력 (input) - 입력시 하단 리스트에 업데이트 - 수정/삭제 가능
할일 삭제 (button) - 클릭시 하단 리스트 데이터 리렌더링 (삭제반영)
할일 수정 (input) - 클릭시 해당 input 수정 가능 -> 수정 완료시 리렌더링

1. 회원가입
  1-1. 회원가입 입력 - local State
  1-1. 아이디 중복 확인 - Lifecycle
  1-2. 비밀번호 확인 - Lifecycle
  1-3. 회원가입 처리 - Lifecycle
  1-3. 회원가입 완료 후 user 테이블에 정보 업데이트- Server State (리액트쿼리) : Server State

2. 로그인
  2-1. 아이디 또는 비밀번호 미입력 후 로그인시 toast - Lifecycle
  2-2. 로그인시 계정 이름 노출 - Global UI State (Zustand/Jotai) : client State

customhook (useTodoState) - Stale-While-Revalidate
3. 할일 입력
  3-1. 로그인한 해당 계정 할일 데이터 수집 및 로딩
  3-2. 새로 입력한 할일 등록 - local State
  3-3. 빈값일 경우 에러 toast - Lifecycle
  3-4. 입력 완료 후 데이터 반영 - Server State (리액트쿼리) : Server State
4. 할일 삭제
  4-1. 할일 삭제 버튼 클릭 - local State
  4-2. 삭제 반영된 데이터 업데이트 - Server State (리액트쿼리) : Server State
5. 할일 수정
  5-1. 할일 수정 버튼 클릭 - local State
  5-2. 수정 반영된 데이터 업데이트 - Server State (리액트쿼리) : Server State