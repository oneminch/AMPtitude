-- Sample data for Customers
INSERT INTO customers (id, name, email, phone, status, brand) VALUES
('m1', 'John Smith', 'john.smith@email.com', '(555) 123-4567', 'Active', 'AUTOBELL'),
('m2', 'Sarah Johnson', 'sarah.j@email.com', '(555) 234-5678', 'Active', 'Woodies Wash Shack'),
('m3', 'Michael Brown', 'mbrown@email.com', '(555) 345-6789', 'Inactive', 'Autowash'),
('m4', 'Emma Davis', 'emma.d@email.com', '(555) 456-7890', 'Overdue', 'Zips Express'),
('m5', 'David Wilson', 'dwilson@email.com', '(555) 567-8901', 'Active', 'Whistle Express'),
('m6', 'Lisa Anderson', 'lisa.a@email.com', '(555) 678-9012', 'Active', 'TAGG-n-GO'),
('m7', 'Robert Martinez', 'rmartinez@email.com', '(555) 789-0123', 'Overdue', 'AUTOBELL'),
('m8', 'Jennifer Taylor', 'jtaylor@email.com', '(555) 890-1234', 'Active', 'Woodies Wash Shack'),
('m9', 'William Chang', 'wchang@email.com', '(555) 901-2345', 'Inactive', 'Zips Express'),
('m10', 'Maria Garcia', 'mgarcia@email.com', '(555) 012-3456', 'Active', 'Whistle Express');

-- Sample data for Vehicles
INSERT INTO vehicles (id, customer_id, make, model, year, license_plate, color, status) VALUES
('v1', 'm1', 'Toyota', 'Camry', 2022, 'ABC123', 'Silver', 'Active'),
('v2', 'm1', 'Honda', 'CR-V', 2021, 'XYZ789', 'Blue', 'Active'),
('v3', 'm2', 'Ford', 'Mustang', 2023, 'DEF456', 'Red', 'Active'),
('v4', 'm4', 'Tesla', 'Model 3', 2023, 'GHI789', 'White', 'Overdue'),
('v5', 'm5', 'BMW', 'X5', 2024, 'JKL012', 'Black', 'Active'),
('v6', 'm6', 'Hyundai', 'Tucson', 2023, 'MNO345', 'Green', 'Active'),
('v7', 'm7', 'Mercedes', 'C-Class', 2022, 'PQR678', 'Gray', 'Overdue'),
('v8', 'm8', 'Audi', 'Q5', 2024, 'STU901', 'Blue', 'Active'),
('v9', 'm8', 'Volkswagen', 'Atlas', 2023, 'VWX234', 'Silver', 'Active'),
('v10', 'm9', 'Lexus', 'RX', 2022, 'YZA567', 'White', 'Inactive'),
('v11', 'm10', 'Porsche', 'Macan', 2024, 'BCD890', 'Red', 'Active'),
('v12', 'm10', 'Tesla', 'Model Y', 2023, 'EFG123', 'Black', 'Active');

-- Sample data for Subscriptions
INSERT INTO subscriptions (id, vehicle_id, customer_id, plan, status, start_date, price_per_month) VALUES
('s1', 'v1', 'm1', 'Ultimate Wash', 'Active', '2024-01-15', 29.99),
('s2', 'v2', 'm1', 'Basic Wash', 'Active', '2024-02-01', 19.99),
('s3', 'v3', 'm2', 'Premium Wash', 'Active', '2024-03-10', 24.99),
('s4', 'v4', 'm4', 'Ultimate Wash', 'Overdue', '2024-01-01', 29.99),
('s5', 'v5', 'm5', 'Ultimate Wash', 'Active', '2024-02-15', 29.99),
('s6', 'v6', 'm6', 'Basic Wash', 'Active', '2024-03-01', 19.99),
('s7', 'v7', 'm7', 'Premium Wash', 'Overdue', '2024-01-20', 24.99),
('s8', 'v8', 'm8', 'Ultimate Wash', 'Active', '2024-02-10', 29.99),
('s9', 'v9', 'm8', 'Basic Wash', 'Active', '2024-03-15', 19.99),
('s10', 'v11', 'm10', 'Ultimate Wash', 'Active', '2024-02-20', 29.99),
('s11', 'v12', 'm10', 'Premium Wash', 'Active', '2024-03-05', 24.99);

-- Sample data for Purchases
INSERT INTO purchases (id, customer_id, amount, type, purchase_date) VALUES
('p1', 'm1', 29.99, 'Monthly Pass', '2024-05-01'),
('p2', 'm1', 19.99, 'Monthly Pass', '2024-05-01'),
('p3', 'm2', 24.99, 'Monthly Pass', '2024-05-01'),
('p4', 'm3', 15.99, 'Single Wash', '2024-04-15'),
('p5', 'm4', 29.99, 'Monthly Pass', '2024-04-01'),
('p6', 'm5', 29.99, 'Monthly Pass', '2024-05-01'),
('p7', 'm6', 19.99, 'Monthly Pass', '2024-05-01'),
('p8', 'm7', 24.99, 'Monthly Pass', '2024-04-01'),
('p9', 'm8', 29.99, 'Monthly Pass', '2024-05-01'),
('p10', 'm8', 19.99, 'Monthly Pass', '2024-05-01'),
('p11', 'm9', 15.99, 'Single Wash', '2024-04-20'),
('p12', 'm9', 15.99, 'Single Wash', '2024-05-05'),
('p13', 'm10', 29.99, 'Monthly Pass', '2024-05-01'),
('p14', 'm10', 24.99, 'Monthly Pass', '2024-05-01'),
('p15', 'm3', 15.99, 'Single Wash', '2024-05-10');
