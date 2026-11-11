-- ===============================================================
-- AlgoPath: Supabase PostgreSQL Database Schema
-- Run this in your Supabase SQL Editor (supabase.com -> SQL Editor)
-- ===============================================================

-- 1. Create Student Profiles Table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  name text,
  level_badge text default 'Tier 1: Foundations',
  streak_days integer default 1,
  accuracy_rate integer default 90,
  next_step jsonb default '{"module":"Module 02: Arrays","topic":"Dynamic Arrays & Vector Resizing","estimatedMinutes":20}'::jsonb,
  mastered_concepts jsonb default '["Pointer Dereferencing (*ptr)","Stack Frames & Local Variables","Constant Time O(1) Operations"]'::jsonb,
  active_misconceptions jsonb default '[{"id":"1","concept":"Off-by-one Loop Bounds","detail":"Accessing arr[size] instead of arr[size-1]","severity":"medium"},{"id":"2","concept":"Dangling Pointers","detail":"Dereferencing raw heap pointer after delete without setting to nullptr","severity":"high"}]'::jsonb,
  retention_schedule jsonb default '[{"id":"1","concept":"Pointer Arithmetic & Address Math","dueInDays":4,"status":"scheduled"},{"id":"2","concept":"Contiguous L1/L2 Cache Line Hits","dueInDays":7,"status":"scheduled"}]'::jsonb,
  module_progress jsonb default '{"basics":100,"array":35,"linked-list":0,"stack":0,"queue":0}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- 3. Create RLS Policies
create policy "Allow students to view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Allow students to update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Allow students to insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- 4. Automatic Profile Creation Trigger on Sign Up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger execution
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

