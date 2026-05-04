-- Sample orders data
INSERT INTO orders (
    id,
    user_id,
    order_number,
    total_amount,
    status,
    delivery_type,
    order_note,
    created_at,
    updated_at
) VALUES 
    (uuid_generate_v4(), (SELECT id FROM users WHERE email = 'customer1@example.com'), 'ORD-1001', 8000, 'completed', 'delivery', 'Please deliver after 5 PM', NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day'),
    (uuid_generate_v4(), (SELECT id FROM users WHERE email = 'customer2@example.com'), 'ORD-1002', 6000, 'pending', 'pickup', '', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
    (uuid_generate_v4(), (SELECT id FROM users WHERE email = 'customer3@example.com'), 'ORD-1003', 12000, 'processing', 'delivery', 'Extra ice please', NOW() - INTERVAL '3 hours', NOW() - INTERVAL '2 hours'),
    (uuid_generate_v4(), (SELECT id FROM users WHERE email = 'customer1@example.com'), 'ORD-1004', 9000, 'pending', 'pickup', '', NOW(), NOW());

-- Sample order items
INSERT INTO order_items (order_id, product_id, size, quantity, unit_price, total_price, created_at) VALUES
    -- Order 1001 items
    ((SELECT id FROM orders WHERE order_number = 'ORD-1001'), (SELECT id FROM products WHERE name_key = 'product.classic'), 'Medium', 2, 3000, 6000, NOW() - INTERVAL '2 days'),
    ((SELECT id FROM orders WHERE order_number = 'ORD-1001'), (SELECT id FROM products WHERE name_key = 'product.ginger'), 'Small', 1, 2000, 2000, NOW() - INTERVAL '2 days'),
    
    -- Order 1002 items
    ((SELECT id FROM orders WHERE order_number = 'ORD-1002'), (SELECT id FROM products WHERE name_key = 'product.lemon'), 'Medium', 2, 3000, 6000, NOW() - INTERVAL '1 day'),
    
    -- Order 1003 items
    ((SELECT id FROM orders WHERE order_number = 'ORD-1003'), (SELECT id FROM products WHERE name_key = 'product.passion'), 'Large', 2, 4000, 8000, NOW() - INTERVAL '3 hours'),
    ((SELECT id FROM orders WHERE order_number = 'ORD-1003'), (SELECT id FROM products WHERE name_key = 'product.mint'), 'Medium', 1, 3000, 3000, NOW() - INTERVAL '3 hours'),
    
    -- Order 1004 items
    ((SELECT id FROM orders WHERE order_number = 'ORD-1004'), (SELECT id FROM products WHERE name_key = 'product.cucumber'), 'Large', 1, 3500, 3500, NOW()),
    ((SELECT id FROM orders WHERE order_number = 'ORD-1004'), (SELECT id FROM products WHERE name_key = 'product.classic'), 'Medium', 1, 3000, 3000, NOW()),
    ((SELECT id FROM orders WHERE order_number = 'ORD-1004'), (SELECT id FROM products WHERE name_key = 'product.ginger'), 'Small', 1, 2500, 2500, NOW());

-- Sample delivery information
INSERT INTO delivery_info (order_id, customer_name, phone, address, scheduled_time, delivery_fee, created_at) VALUES
    ((SELECT id FROM orders WHERE order_number = 'ORD-1001'), 'John Doe', '255712345678', '123 Main St, Dar es Salaam', NOW() - INTERVAL '1 day', 2000, NOW() - INTERVAL '2 days'),
    ((SELECT id FROM orders WHERE order_number = 'ORD-1003'), 'Mike Johnson', '255734567890', '789 Pine Rd, Arusha', NOW() + INTERVAL '1 hour', 2000, NOW() - INTERVAL '3 hours');

-- Sample reviews
INSERT INTO reviews (product_id, user_id, rating, review_text, is_approved, created_at) VALUES
    ((SELECT id FROM products WHERE name_key = 'product.classic'), (SELECT id FROM users WHERE email = 'customer1@example.com'), 5, 'Amazing fresh sugarcane juice! The classic flavor is perfect and so refreshing.', true, NOW() - INTERVAL '1 week'),
    ((SELECT id FROM products WHERE name_key = 'product.ginger'), (SELECT id FROM users WHERE email = 'customer2@example.com'), 4, 'Great ginger kick! Really love the spicy flavor. Would be perfect with a bit less ginger.', true, NOW() - INTERVAL '5 days'),
    ((SELECT id FROM products WHERE name_key = 'product.passion'), (SELECT id FROM users WHERE email = 'customer3@example.com'), 5, 'Passion fruit blend is incredible! Perfect balance of sweet and tart. Highly recommend!', true, NOW() - INTERVAL '3 days'),
    ((SELECT id FROM products WHERE name_key = 'product.mint'), (SELECT id FROM users WHERE email = 'customer1@example.com'), 4, 'Very refreshing mint flavor. Great for hot days. The mint is not too strong.', true, NOW() - INTERVAL '2 days'),
    ((SELECT id FROM products WHERE name_key = 'product.lemon'), (SELECT id FROM users WHERE email = 'customer2@example.com'), 5, 'Perfect lemon tang! So fresh and zesty. My new favorite!', true, NOW() - INTERVAL '1 day'),
    ((SELECT id FROM products WHERE name_key = 'product.cucumber'), (SELECT id FROM users WHERE email = 'customer3@example.com'), 4, 'Interesting cucumber flavor. Very refreshing and unique. Good for summer!', true, NOW() - INTERVAL '12 hours');

-- Sample store locations
INSERT INTO stores (id, name, address, phone, email, latitude, longitude, is_active, created_at) VALUES
    (uuid_generate_v4(), 'Utamu wa Miwa - Stone Town', 'Kichakani Street, Stone Town, Zanzibar', '+255 718 622 621', 'stonetown@utamuwamiwa.com', -6.1659, 39.2026, true, NOW()),
    (uuid_generate_v4(), 'Utamu wa Miwa - Dar es Salaam', 'Kijitonyama Street, Dar es Salaam', '+255 718 622 622', 'dar@utamuwamiwa.com', -6.7924, 39.2083, true, NOW()),
    (uuid_generate_v4(), 'Utamu wa Miwa - Arusha', 'Sokoine Street, Arusha', '+255 718 622 623', 'arusha@utamuwamiwa.com', -3.3869, 36.6830, true, NOW());

-- Sample translations (English)
INSERT INTO translations (language_code, key, value) VALUES
    ('en', 'auth.login.title', 'Login to Your Account'),
    ('en', 'auth.login.subtitle', 'Welcome back! Please login to continue'),
    ('en', 'auth.register.title', 'Create Your Account'),
    ('en', 'auth.register.subtitle', 'Join Utamu wa Miwa for fresh sugarcane juice'),
    ('en', 'profile.title', 'My Profile'),
    ('en', 'profile.personalInfo', 'Personal Information'),
    ('en', 'profile.updateSuccess', 'Profile updated successfully'),
    ('en', 'admin.dashboard.title', 'Admin Dashboard'),
    ('en', 'admin.dashboard.tabs.overview', 'Overview'),
    ('en', 'admin.dashboard.tabs.orders', 'Orders'),
    ('en', 'admin.dashboard.tabs.products', 'Products'),
    ('en', 'admin.dashboard.tabs.users', 'Users'),
    ('en', 'admin.dashboard.tabs.settings', 'Settings'),
    ('en', 'admin.dashboard.stats.totalOrders', 'Total Orders'),
    ('en', 'admin.dashboard.stats.totalUsers', 'Total Users'),
    ('en', 'admin.dashboard.stats.totalRevenue', 'Total Revenue'),
    ('en', 'admin.dashboard.stats.pendingOrders', 'Pending Orders'),
    ('en', 'admin.dashboard.recentOrders', 'Recent Orders'),
    ('en', 'admin.dashboard.orderNumber', 'Order #'),
    ('en', 'admin.dashboard.customer', 'Customer'),
    ('en', 'admin.dashboard.total', 'Total'),
    ('en', 'admin.dashboard.status', 'Status'),
    ('en', 'admin.dashboard.date', 'Date');

-- Sample translations (Swahili)
INSERT INTO translations (language_code, key, value) VALUES
    ('sw', 'auth.login.title', 'Ingia kwenye Akaunti Yako'),
    ('sw', 'auth.login.subtitle', 'Karibu tena! Tafadhali ingia ili kuendelea'),
    ('sw', 'auth.register.title', 'Unde Akaunti Yako'),
    ('sw', 'auth.register.subtitle', 'Jiunge na Utamu wa Miwa kwa maji ya miwa mbichi'),
    ('sw', 'profile.title', 'Wasifu Wangu'),
    ('sw', 'profile.personalInfo', 'Maelezo ya Kibinafsi'),
    ('sw', 'profile.updateSuccess', 'Wasifu umesasiriwa kikamilifu'),
    ('sw', 'admin.dashboard.title', 'Dashibodi ya Msimamizi'),
    ('sw', 'admin.dashboard.tabs.overview', 'Muhtasari'),
    ('sw', 'admin.dashboard.tabs.orders', 'Maagizo'),
    ('sw', 'admin.dashboard.tabs.products', 'Bidhaa'),
    ('sw', 'admin.dashboard.tabs.users', 'Watumiaji'),
    ('sw', 'admin.dashboard.tabs.settings', 'Mipangilio'),
    ('sw', 'admin.dashboard.stats.totalOrders', 'Jumla ya Maagizo'),
    ('sw', 'admin.dashboard.stats.totalUsers', 'Jumla ya Watumiaji'),
    ('sw', 'admin.dashboard.stats.totalRevenue', 'Jumla ya Mapato'),
    ('sw', 'admin.dashboard.stats.pendingOrders', 'Maagizo Yanayosubiri'),
    ('sw', 'admin.dashboard.recentOrders', 'Maagizo ya Karibuni'),
    ('sw', 'admin.dashboard.orderNumber', 'Maagizo #'),
    ('sw', 'admin.dashboard.customer', 'Mteja'),
    ('sw', 'admin.dashboard.total', 'Jumla'),
    ('sw', 'admin.dashboard.status', 'Hali'),
    ('sw', 'admin.dashboard.date', 'Tarehe');
