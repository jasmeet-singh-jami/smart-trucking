-- ============================================================
-- Smart Trucking Portal — Supabase Database Schema
-- Run this in your Supabase project's SQL Editor
-- ============================================================

-- Profiles table (extends auth.users)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  role text not null check (role in ('admin', 'employee')),
  is_active boolean not null default true,
  created_at timestamptz default now()
);

-- Auto-create profile on signup via user_metadata
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'role', 'employee')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Clients
create table if not exists clients (
  id uuid default gen_random_uuid() primary key,
  company_name text not null,
  contact_name text,
  email text,
  phone text,
  address text,
  assigned_to uuid references profiles(id),
  notes text,
  created_at timestamptz default now(),
  created_by uuid references profiles(id)
);

-- Tasks
create table if not exists tasks (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references clients(id) on delete cascade,
  service_type text not null,
  status text not null default 'pending'
    check (status in ('pending', 'in_progress', 'completed', 'overdue')),
  assigned_to uuid references profiles(id),
  due_date date,
  notes text,
  created_at timestamptz default now(),
  created_by uuid references profiles(id)
);

-- Documents
create table if not exists documents (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references clients(id) on delete cascade,
  task_id uuid references tasks(id),
  name text not null,
  file_path text,
  uploaded_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table profiles enable row level security;
alter table clients enable row level security;
alter table tasks enable row level security;
alter table documents enable row level security;

-- Drop existing policies to allow re-running this script
drop policy if exists "own profile read" on profiles;
drop policy if exists "admin read all profiles" on profiles;
drop policy if exists "admin manage profiles" on profiles;
drop policy if exists "employee view assigned clients" on clients;
drop policy if exists "admin manage clients" on clients;
drop policy if exists "employee view assigned tasks" on tasks;
drop policy if exists "admin manage tasks" on tasks;
drop policy if exists "employee update own tasks" on tasks;
drop policy if exists "documents access" on documents;
drop policy if exists "admin manage documents" on documents;

-- Profiles
create policy "own profile read" on profiles
  for select using (auth.uid() = id);

create policy "admin read all profiles" on profiles
  for select using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "admin manage profiles" on profiles
  for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- Clients
create policy "employee view assigned clients" on clients
  for select using (
    assigned_to = auth.uid() or
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "admin manage clients" on clients
  for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- Tasks
create policy "employee view assigned tasks" on tasks
  for select using (
    assigned_to = auth.uid() or
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "admin manage tasks" on tasks
  for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "employee update own tasks" on tasks
  for update using (assigned_to = auth.uid());

-- Documents
create policy "documents access" on documents
  for select using (
    exists (
      select 1 from clients c
      where c.id = client_id and (
        c.assigned_to = auth.uid() or
        exists (select 1 from profiles where id = auth.uid() and role = 'admin')
      )
    )
  );

create policy "admin manage documents" on documents
  for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- ============================================================
-- Storage bucket for documents (run separately in dashboard
-- or uncomment if using Supabase CLI with storage enabled)
-- ============================================================
-- insert into storage.buckets (id, name, public)
-- values ('documents', 'documents', false)
-- on conflict do nothing;
