import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import Link from "next/link";
import { ChevronRight, DollarSign } from "lucide-react";
import { getPurchasesByCustomerId } from "@/lib/db/actions";
import QuickActionLink from "@/components/shared/quick-action-link";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PurchaseHistoryTableProps {
  customerId: string;
}

const PurchaseHistoryTable: React.FC<PurchaseHistoryTableProps> = async ({
  customerId
}) => {
  const purchaseHistory = await getPurchasesByCustomerId(customerId);

  return (
    <div className="w-full border border-zinc-200 rounded-xl bg-white">
      <div className="flex items-center justify-between gap-2 px-6 py-3">
        <h3 className="text-lg font-medium">Purchase History</h3>
      </div>

      <div>
        <Table className="border-t border-zinc-200">
          <TableHeader>
            <TableRow className="*:text-center">
              <TableHead className="pl-6 w-4"></TableHead>
              <TableHead className="text-left!">Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Purchase Type</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Quick Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseHistory.length > 0 ? (
              purchaseHistory.map((purchase) => (
                <TableRow key={purchase.id} className="text-center">
                  <TableCell className="pl-6 w-4">
                    <DollarSign className="size-5 p-0.5 rounded-full bg-zinc-200 text-zinc-500" />
                  </TableCell>
                  <TableCell className="text-left font-medium">
                    {formatDate(purchase.date)}
                  </TableCell>
                  <TableCell>{purchase.amount}</TableCell>
                  <TableCell>{purchase.type}</TableCell>
                  <TableCell>{"Premium"}</TableCell>
                  <TableCell>
                    <QuickActionLink href="#" label="View" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="text-center">
                <TableCell colSpan={6} className="py-4">
                  No history found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={2}
                className="px-6 text-zinc-500 text-xs font-normal">
                Showing 1 to {purchaseHistory.length} of{" "}
                {purchaseHistory.length} purchases
              </TableCell>
              <TableCell colSpan={4} className="px-6 text-right">
                <Button
                  variant="ghost"
                  className="inline-flex items-center gap-2"
                  asChild>
                  <Link href="#">
                    View All Purchases
                    <ChevronRight className="size-3" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default PurchaseHistoryTable;
