-- Test Data Seed for PRG Salon & Spa
-- Includes: Services, Fake Users, Staff, Bookings, Availability

-- =====================================================
-- 1. SERVICES (Placeholder)
-- =====================================================
INSERT INTO services (id, name, category, description, price, duration, active) VALUES
-- Hair Services
('hair-royal-silk', 'Royal Silk Press', 'hair', 'Luxurious silk press for smooth, flowing hair with heat protection treatment', 12000, 90, true),
('hair-balayage', 'Signature Balayage', 'hair', 'Hand-painted highlights for a natural, sun-kissed look', 45000, 180, true),
('hair-braids', 'Goddess Locs', 'hair', 'Bohemian goddess locs with premium synthetic hair', 35000, 240, true),
('hair-fade', 'Classic Fade', 'hair', 'Precision fade haircut with lineup and styling', 5000, 45, true),
('hair-treatment', 'Deep Conditioning Treatment', 'hair', 'Intensive moisture treatment for dry and damaged hair', 8000, 60, true),

-- Spa Services
('spa-deep-tissue', 'Deep Tissue Massage', 'spa', 'Full body deep tissue massage to relieve muscle tension', 25000, 60, true),
('spa-swedish', 'Swedish Relaxation Massage', 'spa', 'Gentle full body massage for ultimate relaxation', 20000, 60, true),
('spa-facial', 'Hydra Glow Facial', 'spa', 'Hydrating facial with vitamin C and hyaluronic acid', 35000, 75, true),
('spa-body-scrub', 'Exfoliating Body Scrub', 'spa', 'Full body exfoliation with natural sugar scrub', 15000, 45, true),

-- Nail Services
('nails-gel', 'Gel Art Manicure', 'nails', 'Gel polish manicure with nail art of your choice', 8000, 45, true),
('nails-pedi', 'Luxury Pedicure', 'nails', 'Relaxing pedicure with foot massage and polish', 6000, 45, true),
('nails-acrylic', 'Acrylic Extension Set', 'nails', 'Full set of acrylic nail extensions with design', 15000, 90, true),

-- Aesthetics Services
('aesthetics-lash', 'Classic Lash Extensions', 'aesthetics', 'Individual lash extensions for natural enhancement', 20000, 90, true),
('aesthetics-brow', 'Brow Lamination', 'aesthetics', 'Brow shaping and lamination for fuller brows', 12000, 45, true),
('aesthetics-facial-led', 'LED Light Therapy', 'aesthetics', 'Anti-aging LED treatment for skin rejuvenation', 18000, 30, true)

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  active = EXCLUDED.active;

-- =====================================================
-- 2. FAKE USER ACCOUNTS
-- =====================================================
-- Note: These will be created via Supabase Auth
-- Use these credentials for testing:
-- 
-- ADMIN ACCOUNT:
--   Email: admin@prg-salon.com
--   Password: Admin123!
--   Role: admin
--
-- CUSTOMER ACCOUNTS (4 clients):
--   Email: client1@test.com
--   Password: Client123!
--   Role: customer
--
--   Email: client2@test.com
--   Password: Client123!
--   Role: customer
--
--   Email: client3@test.com
--   Password: Client123!
--   Role: customer
--
--   Email: client4@test.com
--   Password: Client123!
--   Role: customer
-- =====================================================

-- Staff Profiles (no separate login accounts, managed by admin)
INSERT INTO staff (id, user_id, name, email, role, specialty, phone, active) VALUES
('staff-nneka', NULL, 'Nneka Adeyemi', 'nneka@prg-salon.com', 'Lead Stylist', 'hair', '+2348012345601', true),
('staff-emeka', NULL, 'Emeka Obi', 'emeka@prg-salon.com', 'Senior Barber', 'hair', '+2348012345602', true),
('staff-blessing', NULL, 'Blessing Uche', 'blessing@prg-salon.com', 'Nail Technician', 'nails', '+2348012345603', true),
('staff-ngozi', NULL, 'Ngozi Eze', 'ngozi@prg-salon.com', 'Spa Therapist', 'spa', '+2348012345604', true),
('staff-ada', NULL, 'Ada Nwosu', 'ada@prg-salon.com', 'Aesthetician', 'aesthetics', '+2348012345605', true)
ON CONFLICT (id) DO NOTHING;

-- Customer Profiles (4 clients with login accounts)
INSERT INTO customers (id, user_id, name, email, phone, total_visits, total_spent, vip) VALUES
('cust-amara', NULL, 'Amara Johnson', 'client1@test.com', '+2348012345611', 12, 156000, false),
('cust-chidi', NULL, 'Chidi Okonkwo', 'client2@test.com', '+2348012345612', 8, 45000, false),
('cust-fatima', NULL, 'Fatima Bello', 'client3@test.com', '+2348012345613', 25, 450000, true),
('cust-kemi', NULL, 'Kemi Williams', 'client4@test.com', '+2348012345614', 5, 75000, false)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 3. AVAILABILITY (Weekly Schedule)
-- =====================================================
-- Mon-Sat: 9:00 AM - 7:00 PM (slots every 30 min)
INSERT INTO availability (staff_id, day_of_week, start_time, end_time, is_available) VALUES
('staff-nneka', 1, '09:00', '19:00', true),  -- Monday
('staff-nneka', 2, '09:00', '19:00', true),  -- Tuesday
('staff-nneka', 3, '09:00', '19:00', true),  -- Wednesday
('staff-nneka', 4, '09:00', '19:00', true),  -- Thursday
('staff-nneka', 5, '09:00', '19:00', true),  -- Friday
('staff-nneka', 6, '10:00', '17:00', true),  -- Saturday

('staff-emeka', 1, '09:00', '19:00', true),
('staff-emeka', 2, '09:00', '19:00', true),
('staff-emeka', 3, '09:00', '19:00', true),
('staff-emeka', 4, '09:00', '19:00', true),
('staff-emeka', 5, '09:00', '19:00', true),
('staff-emeka', 6, '10:00', '17:00', true),

('staff-blessing', 1, '09:00', '19:00', true),
('staff-blessing', 2, '09:00', '19:00', true),
('staff-blessing', 3, '09:00', '19:00', true),
('staff-blessing', 4, '09:00', '19:00', true),
('staff-blessing', 5, '09:00', '19:00', true),
('staff-blessing', 6, '10:00', '17:00', true),

('staff-ngozi', 1, '09:00', '19:00', true),
('staff-ngozi', 2, '09:00', '19:00', true),
('staff-ngozi', 3, '09:00', '19:00', true),
('staff-ngozi', 4, '09:00', '19:00', true),
('staff-ngozi', 5, '09:00', '19:00', true),
('staff-ngozi', 6, '10:00', '17:00', true),

('staff-ada', 2, '09:00', '19:00', true),  -- Tuesday
('staff-ada', 3, '09:00', '19:00', true),  -- Wednesday
('staff-ada', 4, '09:00', '19:00', true),  -- Thursday
('staff-ada', 5, '09:00', '19:00', true),  -- Friday
('staff-ada', 6, '10:00', '17:00', true)   -- Saturday
ON CONFLICT DO NOTHING;

-- =====================================================
-- 4. SAMPLE BOOKINGS (Recent)
-- =====================================================
INSERT INTO bookings (id, customer_id, service_id, staff_id, date, start_time, end_time, status, amount, notes) VALUES
('BK001', 'cust-amara', 'hair-royal-silk', 'staff-nneka', '2026-02-09', '14:00', '15:30', 'confirmed', 12000, NULL),
('BK002', 'cust-chidi', 'hair-fade', 'staff-emeka', '2026-02-09', '14:30', '15:15', 'pending', 5000, 'First time customer'),
('BK003', 'cust-fatima', 'nails-gel', 'staff-blessing', '2026-02-09', '15:00', '15:45', 'confirmed', 8000, 'VIP customer - preferred nail art'),
('BK004', 'cust-kemi', 'spa-deep-tissue', 'staff-ngozi', '2026-02-09', '16:00', '17:00', 'completed', 25000, NULL),
('BK005', 'cust-amara', 'hair-balayage', 'staff-nneka', '2026-02-10', '10:00', '13:00', 'confirmed', 45000, 'Returning for touch-up'),
('BK006', 'cust-chidi', 'spa-swedish', 'staff-ngozi', '2026-02-10', '11:00', '12:00', 'confirmed', 20000, NULL),
('BK007', 'cust-fatima', 'nails-pedi', 'staff-blessing', '2026-02-10', '14:00', '14:45', 'pending', 6000, NULL),
('BK008', 'cust-kemi', 'aesthetics-lash', 'staff-ada', '2026-02-11', '10:00', '11:30', 'confirmed', 20000, 'Lash fill - 2 weeks since last appointment')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 5. BUSINESS KNOWLEDGE (For RAG)
-- =====================================================
INSERT INTO knowledge_base (title, content_type, content, metadata) VALUES
('Operating Hours', 'hours', 'Purple Rain Galore is open Monday through Friday from 9:00 AM to 7:00 PM, and Saturday from 10:00 AM to 5:00 PM. We are closed on Sundays.', '{"priority": "high"}'::jsonb),
('Location', 'location', 'We are located at 15 Ahmadu Bello Way, Jos, Plateau State, Nigeria. There is free parking available behind the building.', '{"priority": "high"}'::jsonb),
('Booking Policy', 'policy', 'Appointments can be booked online, via WhatsApp, or by phone. We require a 24-hour notice for cancellations. Late arrivals may result in shortened service time.', '{"priority": "medium"}'::jsonb),
('Payment Methods', 'policy', 'We accept cash, bank transfers, and all major debit cards. POS terminals are available. No credit cards at this time.', '{"priority": "medium"}'::jsonb),
('VIP Program', 'promo', 'Our VIP customers receive 15% off all services, priority booking, and complimentary refreshments. VIP status is earned after spending ₦300,000+ in a calendar year.', '{"priority": "low"}'::jsonb),
('Referral Program', 'promo', 'Refer a friend and get ₦2,000 credit on your next visit when they complete their first appointment. Your friend also gets 10% off their first service.', '{"priority": "low"}'::jsonb),
('Hair Services Info', 'service_info', 'Our hair services include silk press, braiding, coloring, treatments, and cuts. We use premium products from Olaplex, SheaMoisture, and Mizani. Consultations are free.', '{"category": "hair"}'::jsonb),
('Spa Services Info', 'service_info', 'Our spa offers Swedish and deep tissue massages, facials, body scrubs, and aromatherapy. We use organic and locally-sourced ingredients. Private treatment rooms available.', '{"category": "spa"}'::jsonb)
ON CONFLICT DO NOTHING;
