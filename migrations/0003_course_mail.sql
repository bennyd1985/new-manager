create table if not exists course_mail (
  user_id text not null,
  course_id text not null,
  mailed_at timestamptz not null default now(),
  primary key (user_id, course_id)
);
