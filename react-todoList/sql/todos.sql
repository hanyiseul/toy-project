-- todo 테이블
create table todos (
	id int auto_increment primary key,
  memo text not null,
  created_at datetime not null default current_timestamp,
  user_id varchar(500) not null unique,
  is_done boolean not null default false,
  foreign key
  (user_id) references users
  (user_id) on delete cascade -- 작성자 아이디
    -- users(user_id) 참조
    -- on delete cascade: users 테이블에서 user_id 삭제되면 해당 테이블에서도 데이터 삭제
);

-- todos index 생성
-- user_id 기준으로 빠른 조회를 하기 위해 인덱스 생성
CREATE INDEX idx_todos_user_id ON todos(user_id);

-- 더미 데이터
