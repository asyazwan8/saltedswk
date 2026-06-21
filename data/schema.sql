-- Run this in Supabase SQL editor to set up the database

create table if not exists categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  slug       text unique not null,
  "order"    int default 0,
  created_at timestamptz default now()
);

create table if not exists menu_items (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  description text,
  base_price  numeric(8,2) not null,
  image_url   text,
  category_id uuid references categories(id) on delete restrict,
  available   boolean default true,
  featured    boolean default false,
  "order"     int default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create table if not exists variants (
  id           uuid primary key default gen_random_uuid(),
  menu_item_id uuid references menu_items(id) on delete cascade,
  name         text not null,
  price_add    numeric(8,2) default 0
);

create table if not exists settings (
  id    uuid primary key default gen_random_uuid(),
  key   text unique not null,
  value text not null
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

drop trigger if exists menu_items_updated_at on menu_items;
create trigger menu_items_updated_at
before update on menu_items
for each row execute function update_updated_at();

-- Row Level Security
alter table categories  enable row level security;
alter table menu_items  enable row level security;
alter table variants    enable row level security;
alter table settings    enable row level security;

-- Public read access
create policy "Public can read categories"
  on categories for select using (true);

create policy "Public can read menu_items"
  on menu_items for select using (available = true);

create policy "Public can read variants"
  on variants for select using (true);

create policy "Public can read settings"
  on settings for select using (true);

-- Admin writes use service-role key (bypasses RLS) — no extra policies needed
