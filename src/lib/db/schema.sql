-- Enable foreign key support
PRAGMA foreign_keys = ON;

-- Create Customers table
CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,    status TEXT CHECK(status IN ('Active', 'Inactive', 'Overdue')) NOT NULL,
    total_subscriptions INTEGER DEFAULT 0,
    brand TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
    id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    license_plate TEXT UNIQUE NOT NULL,
    color TEXT NOT NULL,
    status TEXT CHECK(status IN ('Active', 'Inactive', 'Overdue')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Create Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id TEXT PRIMARY KEY,
    vehicle_id TEXT UNIQUE NOT NULL,
    customer_id TEXT NOT NULL,
    plan TEXT NOT NULL,
    status TEXT CHECK(status IN ('Active', 'Inactive', 'Overdue')) NOT NULL,
    start_date DATE NOT NULL,
    price_per_month DECIMAL(10,2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Create Purchases table
CREATE TABLE IF NOT EXISTS purchases (
    id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    type TEXT CHECK(type IN ('Single Wash', 'Monthly Pass')) NOT NULL,
    purchase_date DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Create triggers to update the updated_at timestamp
CREATE TRIGGER IF NOT EXISTS customers_update_trigger 
AFTER UPDATE ON customers
BEGIN
    UPDATE customers SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS vehicles_update_trigger
AFTER UPDATE ON vehicles
BEGIN
    UPDATE vehicles SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS subscriptions_update_trigger
AFTER UPDATE ON subscriptions
BEGIN
    UPDATE subscriptions SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS purchases_update_trigger
AFTER UPDATE ON purchases
BEGIN
    UPDATE purchases SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Create trigger to update total_subscriptions count
CREATE TRIGGER IF NOT EXISTS update_total_subscriptions_insert
AFTER INSERT ON subscriptions
BEGIN
    UPDATE customers 
    SET total_subscriptions = (
        SELECT COUNT(*) 
        FROM subscriptions 
        WHERE customer_id = NEW.customer_id
    )
    WHERE id = NEW.customer_id;
END;

CREATE TRIGGER IF NOT EXISTS update_total_subscriptions_update
AFTER UPDATE ON subscriptions
BEGIN
    UPDATE customers 
    SET total_subscriptions = (
        SELECT COUNT(*) 
        FROM subscriptions 
        WHERE customer_id = NEW.customer_id
    )
    WHERE id = NEW.customer_id;
END;

CREATE TRIGGER IF NOT EXISTS update_total_subscriptions_delete
AFTER DELETE ON subscriptions
BEGIN
    UPDATE customers 
    SET total_subscriptions = (
        SELECT COUNT(*) 
        FROM subscriptions 
        WHERE customer_id = OLD.customer_id
    )
    WHERE id = OLD.customer_id;
END;
