create table if not exists profiles (
  user_id text primary key,
  display_name text not null default '',
  email text not null default '',
  trainer boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists lesson_done (
  user_id text not null,
  lesson_id text not null,
  course_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create index if not exists lesson_done_user_idx on lesson_done (user_id);

create table if not exists quiz_attempts (
  id bigserial primary key,
  user_id text not null,
  lesson_id text not null,
  course_id text not null,
  score integer not null,
  passed boolean not null,
  attempted_at timestamptz not null default now()
);

create index if not exists quiz_attempts_user_idx on quiz_attempts (user_id);
