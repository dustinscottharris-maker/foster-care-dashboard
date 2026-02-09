-- Foster Care Dashboard - Database Setup Script
-- Run this in your Supabase SQL Editor

-- Create the main table
CREATE TABLE IF NOT EXISTS foster_care_data (
  id SERIAL PRIMARY KEY,
  state VARCHAR(100) NOT NULL,
  state_abbr VARCHAR(2),
  children_count INTEGER NOT NULL,
  year INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_state ON foster_care_data(state);
CREATE INDEX IF NOT EXISTS idx_children_count ON foster_care_data(children_count DESC);
CREATE INDEX IF NOT EXISTS idx_year ON foster_care_data(year);

-- Sample data (replace with your actual data)
INSERT INTO foster_care_data (state, state_abbr, children_count, year) VALUES
  ('Alabama', 'AL', 5500, 2024),
  ('Alaska', 'AK', 2000, 2024),
  ('Arizona', 'AZ', 14000, 2024),
  ('Arkansas', 'AR', 4500, 2024),
  ('California', 'CA', 55000, 2024),
  ('Colorado', 'CO', 7500, 2024),
  ('Connecticut', 'CT', 4000, 2024),
  ('Delaware', 'DE', 1200, 2024),
  ('Florida', 'FL', 21000, 2024),
  ('Georgia', 'GA', 12000, 2024),
  ('Hawaii', 'HI', 2500, 2024),
  ('Idaho', 'ID', 2200, 2024),
  ('Illinois', 'IL', 15000, 2024),
  ('Indiana', 'IN', 10000, 2024),
  ('Iowa', 'IA', 5000, 2024),
  ('Kansas', 'KS', 6000, 2024),
  ('Kentucky', 'KY', 8000, 2024),
  ('Louisiana', 'LA', 4800, 2024),
  ('Maine', 'ME', 2000, 2024),
  ('Maryland', 'MD', 4500, 2024),
  ('Massachusetts', 'MA', 9000, 2024),
  ('Michigan', 'MI', 12500, 2024),
  ('Minnesota', 'MN', 7000, 2024),
  ('Mississippi', 'MS', 3500, 2024),
  ('Missouri', 'MO', 8500, 2024),
  ('Montana', 'MT', 2300, 2024),
  ('Nebraska', 'NE', 4000, 2024),
  ('Nevada', 'NV', 5500, 2024),
  ('New Hampshire', 'NH', 1800, 2024),
  ('New Jersey', 'NJ', 6000, 2024),
  ('New Mexico', 'NM', 3200, 2024),
  ('New York', 'NY', 17000, 2024),
  ('North Carolina', 'NC', 10000, 2024),
  ('North Dakota', 'ND', 1500, 2024),
  ('Ohio', 'OH', 15500, 2024),
  ('Oklahoma', 'OK', 9000, 2024),
  ('Oregon', 'OR', 7500, 2024),
  ('Pennsylvania', 'PA', 14000, 2024),
  ('Rhode Island', 'RI', 1500, 2024),
  ('South Carolina', 'SC', 4500, 2024),
  ('South Dakota', 'SD', 1700, 2024),
  ('Tennessee', 'TN', 8000, 2024),
  ('Texas', 'TX', 28000, 2024),
  ('Utah', 'UT', 2800, 2024),
  ('Vermont', 'VT', 1000, 2024),
  ('Virginia', 'VA', 5500, 2024),
  ('Washington', 'WA', 9500, 2024),
  ('West Virginia', 'WV', 6500, 2024),
  ('Wisconsin', 'WI', 7000, 2024),
  ('Wyoming', 'WY', 1100, 2024)
ON CONFLICT DO NOTHING;

-- Verify data was inserted
SELECT COUNT(*) as total_states FROM foster_care_data;
