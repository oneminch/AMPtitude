"use server";

import { revalidatePath } from "next/cache";
import { prepare } from "./db";
import type {
  Customer,
  Vehicle,
  Subscription,
  Purchase,
  MembershipStatus
} from "@/types";

// Customers
export async function getCustomers(
  query?: string,
  statusFilter?: MembershipStatus
) {
  let sql = `
    SELECT 
      id, created_at as createdAt, updated_at as updatedAt,
      name, email, phone, status, total_subscriptions as totalSubscriptions, brand
    FROM customers
    WHERE 1=1
  `;

  const params: string[] = [];

  if (query) {
    sql += ` AND (
      name LIKE ? 
      OR email LIKE ? 
      OR phone LIKE ?
    )`;
    const searchParam = `%${query}%`;
    params.push(searchParam, searchParam, searchParam);
  }

  if (statusFilter) {
    sql += ` AND status LIKE ?`;
    params.push(statusFilter);
  }

  sql += ` ORDER BY name`;

  const stmt = await prepare(sql);
  return stmt.all(...params) as Customer[];
}

export async function getCustomerById(id: string) {
  const stmt = await prepare(`
    SELECT 
      id, created_at as createdAt, updated_at as updatedAt,
      name, email, phone, status, total_subscriptions as totalSubscriptions, brand
    FROM customers 
    WHERE id = ?
  `);
  const customer = stmt.get(id) as Customer;

  if (customer) {
    customer.vehicles = await getVehiclesByCustomerId(id);
    customer.subscriptions = await getSubscriptionsByCustomerId(id);
    customer.purchases = await getPurchasesByCustomerId(id);
  }

  return customer;
}

export async function updateCustomer(id: string, data: Partial<Customer>) {
  const stmt = await prepare(`
    UPDATE customers 
    SET name = ?, email = ?, phone = ?, brand = ?
    WHERE id = ?
  `);

  stmt.run(data.name, data.email, data.phone, data.brand, id);
  revalidatePath("/customers");
  revalidatePath(`/customers/${id}`);
}

// Vehicles
export async function getVehiclesByCustomerId(customerId: string) {
  const stmt = await prepare(`
    SELECT 
      id, created_at as createdAt, updated_at as updatedAt,
      customer_id as customerId, make, model, year, 
      license_plate as licensePlate, color, status
    FROM vehicles 
    WHERE customer_id = ?
  `);
  const vehicles = stmt.all(customerId) as Vehicle[];

  for (const vehicle of vehicles) {
    const subscriptionStmt = await prepare(`
      SELECT * FROM subscriptions WHERE vehicle_id = ?
    `);
    vehicle.subscription = subscriptionStmt.get(vehicle.id) as Subscription;
  }

  return vehicles;
}

export async function updateVehicle(id: string, data: Partial<Vehicle>) {
  const stmt = await prepare(`
    UPDATE vehicles 
    SET make = ?, model = ?, year = ?, license_plate = ?, color = ?, status = ?
    WHERE id = ?
  `);

  stmt.run(
    data.make,
    data.model,
    data.year,
    data.licensePlate,
    data.color,
    data.status,
    id
  );
  revalidatePath("/customers");
}

// Subscriptions
export async function getSubscriptionsByCustomerId(customerId: string) {
  const stmt = await prepare(`
    SELECT 
      s.id, s.created_at as createdAt, s.updated_at as updatedAt,
      s.vehicle_id as vehicleId, s.customer_id as customerId,
      s.plan, s.status, s.start_date as startDate, 
      s.price_per_month as pricePerMonth,
      v.make, v.model, v.license_plate as licensePlate
    FROM subscriptions s
    JOIN vehicles v ON s.vehicle_id = v.id
    WHERE s.customer_id = ?
  `);
  return stmt.all(customerId) as (Subscription & {
    make: string;
    model: string;
    licensePlate: string;
  })[];
}

export async function updateSubscription(
  id: string,
  data: Partial<Subscription>
) {
  const stmt = await prepare(`
    UPDATE subscriptions 
    SET plan = ?, status = ?, price_per_month = ?
    WHERE id = ?
  `);

  const getStmt = await prepare(`
    SELECT customer_id FROM subscriptions WHERE id = ?
  `);

  const subscription = getStmt.get(id) as { customer_id: string };

  stmt.run(data.plan, data.status, data.pricePerMonth, id);

  if (subscription) {
    revalidatePath("/customers");
    revalidatePath(`/customers/${subscription.customer_id}`);
    revalidatePath(`/customers/${subscription.customer_id}`);
  }
}

// Add a new subscription
export async function addSubscription(data: {
  vehicleId: string;
  customerId: string;
  plan: string;
  status: MembershipStatus;
  startDate: string;
  pricePerMonth: number;
}) {
  const stmt = await prepare(`
    INSERT INTO subscriptions (
      id, vehicle_id, customer_id, plan, status, 
      start_date, price_per_month
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?
    )
  `);

  const subscriptionId = `s${Date.now()}`;

  try {
    stmt.run(
      subscriptionId,
      data.vehicleId,
      data.customerId,
      data.plan,
      data.status,
      data.startDate,
      data.pricePerMonth
    );

    revalidatePath("/customers");
    revalidatePath(`/customers/${data.customerId}`);

    return subscriptionId;
  } catch (error) {
    const err = {
      error: "An error occurred. Please try again."
    };

    if (error instanceof Error && error.message.includes("UNIQUE")) {
      err.error = "This vehicle already has an active subscription";
    }

    return err;
  }
}

// Remove/Cancel a subscription
export async function removeSubscription(id: string) {
  const stmt = await prepare(`
    DELETE FROM subscriptions WHERE id = ?
  `);

  const getStmt = await prepare(`
    SELECT customer_id FROM subscriptions WHERE id = ?
  `);

  const subscription = getStmt.get(id) as { customer_id: string };

  if (subscription) {
    stmt.run(id);
    revalidatePath("/customers");
    revalidatePath(`/customers/${subscription.customer_id}`);
  }

  return subscription.customer_id;
}

// Transfer subscription to a different vehicle
export async function transferSubscription(
  subscriptionId: string,
  newVehicleId: string
) {
  try {
    // First check if the new vehicle already has a subscription
    const checkStmt = await prepare(`
      SELECT id FROM subscriptions WHERE vehicle_id = ?
      `);

    const existingSubscription = checkStmt.get(newVehicleId);
    if (existingSubscription) {
      throw new Error("The target vehicle already has an active subscription");
    }

    // Get the current subscription details
    const getStmt = await prepare(`
        SELECT customer_id FROM subscriptions WHERE id = ?
        `);

    const subscription = getStmt.get(subscriptionId) as { customer_id: string };

    // Update the subscription with the new vehicle
    const updateStmt = await prepare(`
          UPDATE subscriptions 
          SET vehicle_id = ?
          WHERE id = ?
          `);

    updateStmt.run(newVehicleId, subscriptionId);

    if (subscription) {
      revalidatePath("/customers");
      revalidatePath(`/customers/${subscription.customer_id}`);
    }
  } catch (error: any) {
    return { error: error.message };
  }
}

// Get all available vehicles (vehicles without active subscriptions)
export async function getAvailableVehicles(customerId: string) {
  const stmt = await prepare(`
    SELECT 
      v.id, v.created_at as createdAt, v.updated_at as updatedAt,
      v.customer_id as customerId, v.make, v.model, v.year, 
      v.license_plate as licensePlate, v.color, v.status
    FROM vehicles v
    LEFT JOIN subscriptions s ON v.id = s.vehicle_id
    WHERE v.customer_id = ? AND s.id IS NULL
  `);

  return stmt.all(customerId) as Vehicle[];
}

// Purchases
export async function getPurchasesByCustomerId(customerId: string) {
  const stmt = await prepare(`
    SELECT 
      id, created_at as createdAt, updated_at as updatedAt,
      customer_id as customerId, amount, type, purchase_date as date
    FROM purchases 
    WHERE customer_id = ? 
    ORDER BY purchase_date DESC
  `);
  return stmt.all(customerId) as Purchase[];
}

// Get subscription by ID with related data
export async function getSubscriptionById(id: string) {
  const stmt = await prepare(`
    SELECT 
      s.id, s.created_at as createdAt, s.updated_at as updatedAt,
      s.vehicle_id as vehicleId, s.customer_id as customerId,
      s.plan, s.status, s.start_date as startDate, 
      s.price_per_month as pricePerMonth,
      -- Customer data
      m.name as customerName, m.email as customerEmail, 
      m.phone as customerPhone, m.brand as customerBrand,
      m.created_at as customerCreatedAt,
      -- Vehicle data
      v.make, v.model, v.year, v.color,
      v.license_plate as licensePlate, v.status as vehicleStatus
    FROM subscriptions s
    JOIN customers m ON s.customer_id = m.id
    JOIN vehicles v ON s.vehicle_id = v.id
    WHERE s.id = ?
  `);

  const subscription = stmt.get(id) as Subscription & {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerBrand: string;
    customerCreatedAt: string;
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
    vehicleStatus: MembershipStatus;
  };

  return subscription;
}
