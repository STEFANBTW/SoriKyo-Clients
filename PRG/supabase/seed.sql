-- PROVISIONING: Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  price_range TEXT NOT NULL,
  duration TEXT,
  description TEXT
);

-- SEED DATA: Purple Rain Galore (Placeholders)
INSERT INTO services (category, name, price_range, duration, description) VALUES
  -- HAIR
  ('Hair', 'Unisex Cut & Style', '$20 - $50', '45m', 'Premium cut for men and women.'),
  ('Hair', 'Barbering Pro', '$15 - $30', '30m', 'Precision fade and beard trim.'),
  
  -- NAILS
  ('Nails', 'Gel Manicure', '$30 - $45', '60m', 'Long-lasting gel polish with cuticle care.'),
  ('Nails', 'Luxury Pedicure', '$40 - $60', '60m', 'Exfoliation, massage, and polish.'),

  -- AESTHETICS (High Ticket)
  ('Aesthetics', 'Microblading (Brows)', '$200 - $300', '120m', 'Semi-permanent architectural brow shaping.'),
  ('Aesthetics', 'Microshading', '$250 - $350', '150m', 'Ombre powder effect for fuller brows.'),
  
  -- WELLNESS
  ('Wellness', 'Deep Tissue Massage', '$80 - $120', '60m', 'Therapeutic massage for muscle recovery.'),
  
  -- EDUCATION
  ('Education', 'Beauty Academy Enrollment', '$1000+', '4 Weeks', 'Comprehensive training in cosmetology.');
