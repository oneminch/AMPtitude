import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import Link from "next/link";
import { Plus, CarFront } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuickActionLink from "@/components/shared/quick-action-link";
import { getSubscriptionsByCustomerId } from "@/lib/db/actions";
import { formatDate } from "@/lib/utils";
import StatusBadge from "@/components/shared/status-badge";

interface SubscriptionsTableProps {
  customerId: string;
}

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = async ({
  customerId
}) => {
  const subscriptions = await getSubscriptionsByCustomerId(customerId);

  return (
    <div className="w-full border border-zinc-200 rounded-xl bg-white">
      <div className="flex items-center justify-between gap-2 px-6 py-3">
        <h3 className="text-lg font-medium">Subscriptions</h3>

        <Button asChild>
          <Link
            href={`/customers/${customerId}/new`}
            className="flex items-center gap-2">
            Add New
            <Plus className="size-4" />
          </Link>
        </Button>
      </div>

      <div>
        <Table className="border-t border-zinc-200">
          <TableHeader>
            <TableRow className="*:text-center">
              <TableHead className="pl-6 w-4"></TableHead>
              <TableHead className="text-left!">Vehicle</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Monthly Price</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Quick Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.length > 0 ? (
              subscriptions.map((sub) => (
                <TableRow key={sub.id} className="text-center">
                  <TableCell className="pl-6 w-4">
                    <CarFront className="size-5 p-0.5 rounded-full bg-zinc-200 text-zinc-500" />
                  </TableCell>
                  <TableCell className="text-left font-medium">
                    {sub.make} {sub.model}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={sub.status} />
                  </TableCell>
                  <TableCell>{sub.pricePerMonth}</TableCell>
                  <TableCell>{formatDate(sub.startDate)}</TableCell>
                  <TableCell>
                    <QuickActionLink
                      href={`/subscriptions/${sub.id}`}
                      label="View"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="text-center">
                <TableCell colSpan={6} className="py-4">
                  No subscriptions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SubscriptionsTable;
