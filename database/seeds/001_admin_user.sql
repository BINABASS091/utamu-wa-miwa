-- Create default admin user
-- Password: admin123 (hashed with bcrypt)
INSERT INTO users (
    id,
    email, 
    password_hash, 
    name, 
    role, 
    is_active,
    created_at,
    updated_at
) VALUES (
    uuid_generate_v4(),
    'admin@utamuwamiwa.com',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6QJw/2Ej7W',
    'Admin User',
    'admin',
    true,
    NOW(),
    NOW()
);

-- Create sample customer users
INSERT INTO users (
    id,
    email, 
    password_hash, 
    name, 
    phone,
    role, 
    is_active,
    created_at,
    updated_at
) VALUES 
    (uuid_generate_v4(), 'customer1@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6QJw/2Ej7W', 'John Doe', '255712345678', 'customer', true, NOW(), NOW()),
    (uuid_generate_v4(), 'customer2@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6QJw/2Ej7W', 'Jane Smith', '255723456789', 'customer', true, NOW(), NOW()),
    (uuid_generate_v4(), 'customer3@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6QJw/2Ej7W', 'Mike Johnson', '255734567890', 'customer', true, NOW(), NOW());

-- Create user profiles for sample users
INSERT INTO user_profiles (user_id, phone, address, city, country, preferred_language) VALUES
    ((SELECT id FROM users WHERE email = 'customer1@example.com'), '255712345678', '123 Main St', 'Dar es Salaam', 'Tanzania', 'en'),
    ((SELECT id FROM users WHERE email = 'customer2@example.com'), '255723456789', '456 Oak Ave', 'Zanzibar', 'Tanzania', 'sw'),
    ((SELECT id FROM users WHERE email = 'customer3@example.com'), '255734567890', '789 Pine Rd', 'Arusha', 'Tanzania', 'en');
