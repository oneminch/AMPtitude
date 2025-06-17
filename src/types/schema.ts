export type MembershipStatus = "Overdue" | "Active" | "Inactive";
export type PurchaseType = "Single Wash" | "Monthly Pass";

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  status: MembershipStatus;
  totalSubscriptions: number;
  brand: string;
  vehicles?: Vehicle[];
  subscriptions?: Subscription[];
  purchases?: Purchase[];
}

export interface Vehicle extends BaseEntity {
  customerId: string;
  customer?: Customer;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  status: MembershipStatus;
  subscription?: Subscription;
}

export interface Subscription extends BaseEntity {
  vehicleId: string;
  vehicle?: Vehicle;
  customerId: string;
  customer?: Customer;
  plan: string;
  status: MembershipStatus;
  startDate: string;
  pricePerMonth: number;
}

export interface Purchase extends BaseEntity {
  customerId: string;
  customer?: Customer;
  amount: number;
  type: PurchaseType;
  date: string;
}
