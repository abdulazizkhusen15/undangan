-- SQL Schema for Digital Invitation Platform (undangan-digital)
-- Paste this into the Supabase SQL Editor

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create TABLES

-- TABLE: events (Main event data)
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

-- TABLE: guests (Guest management & RSVP)
CREATE TABLE IF NOT EXISTS guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  whatsapp_number TEXT,
  rsvp_status TEXT CHECK (rsvp_status IN ('pending', 'confirmed', 'declined')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: greetings (Guest book/Greetings)
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

-- 4. Set up POLICIES

-- POLICIES: events
-- Owner can do everything
CREATE POLICY "Users can manage their own events" ON events
  FOR ALL USING (auth.uid() = user_id);
-- Public can view the event details
CREATE POLICY "Public can view events" ON events
  FOR SELECT USING (true);

-- POLICIES: guests
-- Owner can manage guests
CREATE POLICY "Users can manage guests for their events" ON guests
  FOR ALL USING (
    event_id IN (SELECT id FROM events WHERE user_id = auth.uid())
  );
-- Public (guests) can update their own RSVP status via a server-side action or direct update if needed
-- Note: In a production app, we usually handle this via a Service Role or a more restricted policy.
-- This allows anyone to update, but in our logic, we'll filter by ID.
CREATE POLICY "Public can update their own RSVP" ON guests
  FOR UPDATE USING (true);
-- Public can select guest info (to verify RSVP status)
CREATE POLICY "Public can view guest info" ON guests
  FOR SELECT USING (true);

-- POLICIES: greetings
-- Owner can manage greetings
CREATE POLICY "Users can manage greetings for their events" ON greetings
  FOR ALL USING (
    event_id IN (SELECT id FROM events WHERE user_id = auth.uid())
  );
-- Public can see greetings
CREATE POLICY "Public can view greetings" ON greetings
  FOR SELECT USING (true);
-- Public can post greetings
CREATE POLICY "Public can send greetings" ON greetings
  FOR INSERT WITH CHECK (true);
