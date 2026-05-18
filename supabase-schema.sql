-- =============================================
-- গোল্ডেন লাইফ পাবলিক স্কুল — Supabase SQL Schema
-- Supabase Dashboard > SQL Editor > এখানে পেস্ট করুন > Run
-- =============================================

-- Enable UUID
create extension if not exists "pgcrypto";

-- ── Students ─────────────────────────────────────────
create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  roll text not null,
  class text not null,
  section text,
  session text not null default '২০২৫',
  father_name text,
  mother_name text,
  phone text,
  created_at timestamptz default now()
);

-- ── Results ──────────────────────────────────────────
create table if not exists results (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  exam_type text not null,
  subject text not null,
  marks_obtained numeric not null default 0,
  marks_mcq numeric not null default 0,
  marks_written numeric not null default 0,
  full_marks numeric not null default 100,
  full_mcq numeric not null default 0,
  full_written numeric not null default 100,
  class text,
  section text,
  session text not null default '২০২৫',
  created_at timestamptz default now(),
  unique(student_id, exam_type, subject, session)
);

-- ── Notices ───────────────────────────────────────────
create table if not exists notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  file_url text not null,
  file_type text check(file_type in ('pdf','image')) default 'pdf',
  is_important boolean default false,
  created_at timestamptz default now()
);

-- ── Gallery ───────────────────────────────────────────
create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  category text default 'অন্যান্য',
  created_at timestamptz default now()
);

-- ── Blogs ─────────────────────────────────────────────
create table if not exists blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  image_url text,
  author text default 'প্রধান শিক্ষক',
  is_published boolean default true,
  created_at timestamptz default now()
);

-- ── Admissions ────────────────────────────────────────
create table if not exists admissions (
  id uuid primary key default gen_random_uuid(),
  student_name_bn text not null,
  student_name_en text,
  father_name_bn text,
  father_name_en text,
  father_id text,
  mother_name_bn text,
  mother_name_en text,
  mother_id text,
  class_applying text not null,
  roll_number text,
  address_permanent text,
  address_current text,
  dob date,
  religion text,
  nationality text default 'বাংলাদেশী',
  father_occupation text,
  mother_occupation text,
  annual_income text,
  land_area text,
  transport text default 'হেঁটে',
  previous_school text,
  phone_father text,
  phone_mother text,
  status text check(status in ('pending','approved','rejected')) default 'pending',
  created_at timestamptz default now()
);

-- ── Contacts ──────────────────────────────────────────
create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- ── Teachers ──────────────────────────────────────────
create table if not exists teachers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  subjects text[] default '{}',
  classes text[] default '{}',
  created_at timestamptz default now()
);

-- ── Community Posts ───────────────────────────────────
create table if not exists community_posts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  student_name text not null,
  content text not null,
  created_at timestamptz default now()
);

-- =============================================
-- Row Level Security (RLS)
-- =============================================

alter table students enable row level security;
alter table results enable row level security;
alter table notices enable row level security;
alter table gallery enable row level security;
alter table blogs enable row level security;
alter table admissions enable row level security;
alter table contacts enable row level security;
alter table teachers enable row level security;
alter table community_posts enable row level security;

-- Public read: notices, gallery, blogs, results (by student_id lookup)
create policy "Public read notices" on notices for select using (true);
create policy "Public read gallery" on gallery for select using (true);
create policy "Public read blogs" on blogs for select using (is_published = true);
create policy "Public read results" on results for select using (true);
create policy "Public read students" on students for select using (true);

-- Public insert: admissions, contacts
create policy "Public insert admissions" on admissions for insert with check (true);
create policy "Public insert contacts" on contacts for insert with check (true);

-- Authenticated insert/update (admin + teacher operations)
create policy "Auth insert students" on students for insert to authenticated with check (true);
create policy "Auth update students" on students for update to authenticated using (true);
create policy "Auth delete students" on students for delete to authenticated using (true);

create policy "Auth insert results" on results for insert to authenticated with check (true);
create policy "Auth update results" on results for update to authenticated using (true);
create policy "Auth upsert results" on results for insert to authenticated with check (true);

create policy "Auth manage notices" on notices for all to authenticated using (true) with check (true);
create policy "Auth manage gallery" on gallery for all to authenticated using (true) with check (true);
create policy "Auth manage blogs" on blogs for all to authenticated using (true) with check (true);
create policy "Auth manage admissions" on admissions for update to authenticated using (true);
create policy "Auth read admissions" on admissions for select to authenticated using (true);
create policy "Auth read contacts" on contacts for select to authenticated using (true);
create policy "Auth update contacts" on contacts for update to authenticated using (true);
create policy "Auth manage teachers" on teachers for all to authenticated using (true) with check (true);

-- Community posts
create policy "Public read community" on community_posts for select using (true);
create policy "Public insert community" on community_posts for insert with check (true);

-- =============================================
-- Storage bucket (run separately if needed)
-- =============================================
-- Supabase Dashboard > Storage > New Bucket
-- Name: school-files
-- Public: YES (check the box)
-- =============================================

-- =============================================
-- RESULT SYSTEM (gl-result style) — নতুন table
-- পুরনো results table আর লাগবে না
-- =============================================

-- Drop old results table if migrating
-- DROP TABLE IF EXISTS results;

CREATE TABLE IF NOT EXISTS gl_students (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  roll integer NOT NULL,
  name text NOT NULL,
  class_num text NOT NULL DEFAULT '9',
  exam_year text NOT NULL DEFAULT '2025',
  exam_type text NOT NULL DEFAULT 'নির্বাচনি পরীক্ষা',
  section text,

  bangla1_naib numeric DEFAULT 0, bangla1_written numeric DEFAULT 0,
  bangla2_naib numeric DEFAULT 0, bangla2_written numeric DEFAULT 0,
  english1 numeric DEFAULT 0,
  english2 numeric DEFAULT 0,
  math_naib numeric DEFAULT 0, math_written numeric DEFAULT 0,
  science_naib numeric DEFAULT 0, science_written numeric DEFAULT 0,
  bgst_naib numeric DEFAULT 0, bgst_written numeric DEFAULT 0,
  islam_naib numeric DEFAULT 0, islam_written numeric DEFAULT 0,
  krishi_naib numeric DEFAULT 0, krishi_written numeric DEFAULT 0,
  physics_naib numeric DEFAULT 0, physics_written numeric DEFAULT 0,
  chemistry_naib numeric DEFAULT 0, chemistry_written numeric DEFAULT 0,
  biology_naib numeric DEFAULT 0, biology_written numeric DEFAULT 0,
  higher_math_naib numeric DEFAULT 0, higher_math_written numeric DEFAULT 0,
  bgst910_naib numeric DEFAULT 0, bgst910_written numeric DEFAULT 0,
  ict numeric DEFAULT 0,

  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_gl_students ON gl_students(class_num, exam_year, exam_type);

ALTER TABLE gl_students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gl_students" ON gl_students FOR SELECT USING (true);
CREATE POLICY "Auth manage gl_students" ON gl_students FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Community reactions & comments
CREATE TABLE IF NOT EXISTS community_reactions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id uuid REFERENCES community_posts(id) ON DELETE CASCADE,
  student_id uuid,
  reaction text DEFAULT '👍',
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, student_id)
);

CREATE TABLE IF NOT EXISTS community_comments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id uuid REFERENCES community_posts(id) ON DELETE CASCADE,
  student_name text NOT NULL,
  student_id uuid,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE community_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public all reactions" ON community_reactions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all comments" ON community_comments FOR ALL USING (true) WITH CHECK (true);

-- Student signup requests
CREATE TABLE IF NOT EXISTS student_signup_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  roll text NOT NULL,
  class text NOT NULL,
  session text NOT NULL,
  email text NOT NULL UNIQUE,
  password_hash text,
  status text DEFAULT 'pending' CHECK(status IN ('pending','approved','rejected')),
  created_at timestamptz DEFAULT now()
);
ALTER TABLE student_signup_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert signup" ON student_signup_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read own signup" ON student_signup_requests FOR SELECT USING (true);
CREATE POLICY "Auth manage signup" ON student_signup_requests FOR ALL TO authenticated USING (true) WITH CHECK (true);
