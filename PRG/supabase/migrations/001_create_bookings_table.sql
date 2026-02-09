-- BLAST PROTOCOL: Bookings Table
-- Migration: 001_create_bookings_table.sql

-- BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id),
  slot_start TIMESTAMPTZ NOT NULL,
  slot_end TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS bookings_user_id_idx ON bookings(user_id);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings(status);
CREATE INDEX IF NOT EXISTS bookings_slot_start_idx ON bookings(slot_start);

-- ROW LEVEL SECURITY
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can read their own bookings
CREATE POLICY "Users can view own bookings" 
  ON bookings FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can insert their own bookings
CREATE POLICY "Users can create own bookings" 
  ON bookings FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own bookings (e.g., cancel)
CREATE POLICY "Users can update own bookings" 
  ON bookings FOR UPDATE 
  USING (auth.uid() = user_id);

-- Anonymous access for demo (optional, controlled by Supabase dashboard)
-- CREATE POLICY "Allow anon read" ON bookings FOR SELECT TO anon USING (true);
