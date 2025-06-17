import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { User } from "lucide-react";
import QuickActionLink from "@/components/shared/quick-action-link";
import { getCustomers } from "@/lib/db/actions";
import TablePagination from "@/components/shared/table-pagination";
import StatusBadge from "@/components/shared/status-badge";
import React from "react";
import FilterCustomersForm from "@/components/forms/filter-customers-form";
import type { MembershipStatus } from "@/types";

interface CustomersPageProps {
  searchParams: Promise<{
    q?: string;
    status?: MembershipStatus;
  }>;
}

const CustomersPage = async ({ searchParams }: CustomersPageProps) => {
  const { q, status } = await searchParams;

  const customers = await getCustomers(q, status);

  return (
    <section className="border border-zinc-200 rounded-xl bg-white">
      {/* Customers Table Filter Form */}
      <FilterCustomersForm />

      {/* Customers Table */}
      <div>
        <Table
          data-testid="customers-table"
          className="border-t border-zinc-200">
          <TableHeader>
            <TableRow className="*:text-center">
              <TableHead className="pl-6 w-4"></TableHead>
              <TableHead className="text-left!">Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Subscriptions</TableHead>
              <TableHead>Car Wash</TableHead>
              <TableHead>Quick Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <TableRow
                  data-testid="customers-table-row"
                  key={customer.id}
                  className="text-center">
                  <TableCell className="pl-6 w-4">
                    <User className="size-5 p-0.5 rounded-full bg-zinc-200 text-zinc-500" />
                  </TableCell>
                  <TableCell className="text-left">
                    <p className="font-medium mb-1">{customer.name}</p>
                    <p className="text-xs text-zinc-500">{customer.email}</p>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={customer.status} />
                  </TableCell>
                  <TableCell>{customer.totalSubscriptions}</TableCell>
                  <TableCell>{customer.brand}</TableCell>
                  <TableCell>
                    <QuickActionLink
                      href={`/customers/${customer.id}`}
                      label="View Profile"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="text-center">
                <TableCell colSpan={6} className="py-4">
                  No customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={2}
                className="px-6 text-zinc-500 text-xs font-normal">
                {customers.length > 0 && (
                  <span>
                    Showing 1 to {customers.length} of {customers.length}{" "}
                    customers
                  </span>
                )}
              </TableCell>
              <TableCell colSpan={4} className="text-right px-6">
                <TablePagination />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
};

export default CustomersPage;
