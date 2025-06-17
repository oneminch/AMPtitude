import CarWashProviderCard from "@/components/shared/car-wash-provider-card";
import StatusBadge from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { getSubscriptionById, getVehiclesByCustomerId } from "@/lib/db/actions";
import { formatDate } from "@/lib/utils";
import {
  Mail,
  Phone,
  Calendar,
  User,
  ChevronRight,
  DollarSign,
  BadgeDollarSign,
  Car,
  Info,
  Factory,
  Calendar1,
  PaintBucket
} from "lucide-react";
import Link from "next/link";
import RemoveSubscriptionModal from "@/components/modals/remove-subscription-modal";
import EditSubscriptionModal from "@/components/modals/edit-subscription-modal";
import TransferSubscriptionModal from "@/components/modals/transfer-subscription-modal";

interface SubscriptionPageProps {
  params: Promise<{ id: string }>;
}

const SubscriptionPage: React.FC<SubscriptionPageProps> = async ({
  params
}) => {
  const { id: subscriptionId } = await params;

  const subscription = await getSubscriptionById(subscriptionId);

  const vehicles = await getVehiclesByCustomerId(subscription.customerId);

  return (
    <>
      {/* Subscription Details */}
      <section className="border border-zinc-200 rounded-xl bg-white w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-6 py-3 border-b border-zinc-200">
          <h3 className="text-lg font-medium">Subscription Details</h3>

          <div className="flex items-center gap-2">
            <EditSubscriptionModal
              subscriptionId={subscriptionId}
              vehicle={{
                year: subscription.year,
                make: subscription.make,
                model: subscription.model
              }}
            />

            <TransferSubscriptionModal
              subscription={{
                id: subscription.id,
                plan: subscription.plan,
                pricePerMonth: subscription.pricePerMonth
              }}
              vehicles={vehicles}
            />

            <RemoveSubscriptionModal subscriptionId={subscriptionId} />
          </div>
        </div>

        <ul className="flex flex-col items-start justify-between gap-y-2 p-6 text-sm">
          <li className="flex items-center justify-center gap-2">
            <BadgeDollarSign className="size-3.5 text-zinc-700" />
            <p>
              <strong className="font-semibold mr-2">Plan:</strong>
              <span className="text-zinc-500">{subscription.plan}</span>
            </p>
          </li>
          <li className="flex items-center justify-center gap-2">
            <Info className="size-3.5 text-zinc-700" />
            <p>
              <strong className="font-semibold mr-2">Status:</strong>
              <StatusBadge status={subscription.status} />
            </p>
          </li>
          <li className="flex items-center justify-center gap-2">
            <Calendar className="size-3.5 text-zinc-700" />
            <p>
              <strong className="font-semibold mr-2">Start Date:</strong>
              <span className="text-zinc-500">
                {formatDate(subscription.createdAt)}
              </span>
            </p>
          </li>
          <li className="flex items-center justify-center gap-2">
            <DollarSign className="size-3.5 text-zinc-700" />
            <p>
              <strong className="font-semibold mr-2">Price:</strong>
              <span className="text-zinc-500">
                ${subscription.pricePerMonth}/month
              </span>
            </p>
          </li>
        </ul>
      </section>

      {/* Vehicle Details */}
      <div className="flex flex-col lg:flex-row gap-4">
        <section className="w-full lg:w-1/3 border border-zinc-200 rounded-xl bg-white">
          <div className="flex items-center justify-between gap-2 px-6 py-3 border-b border-zinc-200">
            <h3 className="text-lg font-medium">Vehicle Information</h3>
          </div>

          <ul className="flex flex-col items-start justify-between gap-y-2 p-6 text-sm">
            <li className="flex items-center justify-center gap-2">
              <Factory className="size-3.5 text-zinc-700" />
              <p>
                <strong className="font-semibold mr-2">Make:</strong>
                <span className="text-zinc-500">{subscription.make}</span>
              </p>
            </li>
            <li className="flex items-center justify-center gap-2">
              <Car className="size-3.5 text-zinc-700" />
              <p>
                <strong className="font-semibold mr-2">Model:</strong>
                <span className="text-zinc-500">{subscription.model}</span>
              </p>
            </li>
            <li className="flex items-center justify-center gap-2">
              <Calendar1 className="size-3.5 text-zinc-700" />
              <p>
                <strong className="font-semibold mr-2">Year:</strong>
                <span className="text-zinc-500">{subscription.year}</span>
              </p>
            </li>
            <li className="flex items-center justify-center gap-2">
              <PaintBucket className="size-3.5 text-zinc-700" />
              <p>
                <strong className="font-semibold mr-2">Color:</strong>
                <span className="text-zinc-500">{subscription.color}</span>
              </p>
            </li>
          </ul>
        </section>

        {/* Customer Information */}
        <section className="w-full lg:w-2/3 flex flex-col border border-zinc-200 bg-white rounded-xl *:px-6 *:py-6 *:first:py-3">
          <div className="flex items-center justify-between gap-2 px-6 py-4">
            <h3 className="text-lg font-medium">Customer Information</h3>

            <Button variant="ghost" asChild>
              <Link
                href={`/customers/${subscription.customerId}`}
                className="flex items-center gap-2">
                View Profile
                <ChevronRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="flex items-start justify-between border-t border-zinc-200">
            <div className="flex items-start gap-4">
              <User className="hidden md:inline-block size-20 p-4 rounded-full bg-zinc-200 text-zinc-500" />
              <div className="flex flex-col items-start gap-y-4">
                <h2 className="text-xl leading-4 font-semibold">
                  {subscription.customerName}
                </h2>

                <ul className="flex flex-col items-start gap-y-2">
                  <li className="flex items-center justify-center gap-2">
                    <Mail className="size-3.5 text-zinc-700" />
                    <span className="text-sm text-zinc-500">
                      {subscription.customerEmail}
                    </span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <Phone className="size-3.5 text-zinc-700" />
                    <span className="text-sm text-zinc-500">
                      {subscription.customerPhone}
                    </span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <Calendar className="size-3.5 text-zinc-700" />
                    <span className="text-sm text-zinc-500">
                      Customer Since{" "}
                      {formatDate(subscription.customerCreatedAt)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <CarWashProviderCard carWashProvider={subscription.customerBrand} />
          </div>
        </section>
      </div>
    </>
  );
};

export default SubscriptionPage;
