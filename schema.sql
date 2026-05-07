-- SQL Schema for Digital Invitation Platform (undangan-digital)
-- Versi Robust: Menghapus policy lama jika sudah ada
-- Paste this into the Supabase SQL Editor

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create TABLES
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location_name TEXT,
  location_address TEXT,
  location_maps_url TEXT,
  bride_name TEXT,
  groom_name TEXT,
  story TEXT,
  music_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  whatsapp_number TEXT,
  rsvp_status TEXT CHECK (rsvp_status IN ('pending', 'confirmed', 'declined')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS greetings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  guest_name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Enable ROW LEVEL SECURITY (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE greetings ENABLE ROW LEVEL SECURITY;

-- 4. Set up POLICIES (With DROP IF EXISTS to avoid errors)

-- POLICIES: events
DROP POLICY IF EXISTS "Users can manage their own events" ON events;
CREATE POLICY "Users can manage their own events" ON events FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Public can view events" ON events;
CREATE POLICY "Public can view events" ON events FOR SELECT USING (true);

-- POLICIES: guests
DROP POLICY IF EXISTS "Users can manage guests for their events" ON guests;
CREATE POLICY "Users can manage guests for their events" ON guests FOR ALL USING (
    event_id IN (SELECT id FROM events WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Public can update their own RSVP" ON guests;
CREATE POLICY "Public can update their own RSVP" ON guests FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public can view guest info" ON guests;
CREATE POLICY "Public can view guest info" ON guests FOR SELECT USING (true);

-- POLICIES: greetings
DROP POLICY IF EXISTS "Users can manage greetings for their events" ON greetings;
CREATE POLICY "Users can manage greetings for their events" ON greetings FOR ALL USING (
    event_id IN (SELECT id FROM events WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Public can view greetings" ON greetings;
CREATE POLICY "Public can view greetings" ON greetings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can send greetings" ON greetings;
CREATE POLICY "Public can send greetings" ON greetings FOR INSERT WITH CHECK (true);
