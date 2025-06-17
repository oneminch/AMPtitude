import Link from "next/link";
import { Mail, Phone, Calendar, User, Edit, MoreVertical } from "lucide-react";
import SubscriptionsTable from "@/components/tables/subscriptions-table";
import PurchaseHistoryTable from "@/components/tables/purcase-history-table";
import { getCustomerById } from "@/lib/db/actions";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import CarWashProviderCard from "@/components/shared/car-wash-provider-card";
import StatusBadge from "@/components/shared/status-badge";
import { notFound } from "next/navigation";

interface CustomerPageProps {
  params: Promise<{ id: string }>;
}

const CustomerPage: React.FC<CustomerPageProps> = async ({ params }) => {
  const { id: customerId } = await params;

  const customer = await getCustomerById(customerId);

  if (!customer) {
    notFound();
  }

  return (
    <>
      {/* Current Account Info Card */}
      <section className="flex flex-col border border-zinc-200 bg-white rounded-xl *:px-6 *:py-6 *:first:py-3">
        <div className="flex items-center justify-between gap-2 px-6 py-4">
          <h3 className="text-lg font-medium">Account</h3>

          <div className="flex items-center gap-2">
            <Button asChild>
              <Link
                href={`/customers/${customerId}/edit`}
                className="flex items-center gap-2">
                Edit Account
                <Edit className="size-3.5" />
              </Link>
            </Button>
            <Button variant="outline">
              <MoreVertical className="size-3.5" />
            </Button>
          </div>
        </div>
        <div className="flex items-start justify-between border-t border-zinc-200">
          <div className="flex items-start gap-4">
            <User className="hidden md:inline-block size-20 p-4 rounded-full bg-zinc-200 text-zinc-500" />
            <div className="flex flex-col items-start gap-y-4">
              <h2 className="text-xl leading-4 font-semibold">
                {customer.name}
              </h2>
              <div>
                <StatusBadge status={customer.status} />
              </div>
              <ul className="flex flex-col items-start gap-y-2">
                <li className="flex items-center justify-center gap-2">
                  <Mail className="size-3.5 text-zinc-700" />
                  <span className="text-sm text-zinc-500">
                    {customer.email}
                  </span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <Phone className="size-3.5 text-zinc-700" />
                  <span className="text-sm text-zinc-500">
                    {customer.phone}
                  </span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <Calendar className="size-3.5 text-zinc-700" />
                  <span className="text-sm text-zinc-500">
                    Customer Since {formatDate(customer.createdAt)}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <CarWashProviderCard carWashProvider={customer.brand} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        {/* Account Subscriptions */}
        <SubscriptionsTable customerId={customerId} />

        {/* Account Purchase History */}
        <PurchaseHistoryTable customerId={customerId} />
      </section>
    </>
  );
};

export default CustomerPage;
