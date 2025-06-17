import AddSubscriptionForm from "@/components/forms/add-subscription-form";
import CarWashProviderCard from "@/components/shared/car-wash-provider-card";
import { getCustomerById, getVehiclesByCustomerId } from "@/lib/db/actions";
import { formatDate } from "@/lib/utils";
import { Calendar, Mail, Phone, User } from "lucide-react";
import { notFound } from "next/navigation";

interface AddSubscriptionPageProps {
  params: Promise<{ id: string }>;
}

const AddSubscriptionPage: React.FC<AddSubscriptionPageProps> = async ({
  params
}) => {
  const { id: customerId } = await params;

  const customer = await getCustomerById(customerId);

  const vehicles = await getVehiclesByCustomerId(customerId);

  if (!customer) {
    notFound();
  }

  return (
    <>
      {/* Current Account Info Card */}
      <section className="flex items-center justify-between max-w-3xl mx-auto rounded-xl border border-zinc-200 bg-white px-6 py-4 *:p-4">
        <div className="flex items-start gap-4">
          <User className="hidden md:inline-block size-20 p-3 rounded-full bg-zinc-200 text-zinc-500" />

          <div className="flex flex-col items-start gap-y-4">
            <h2 className="text-xl leading-4 font-semibold">{customer.name}</h2>

            <ul className="flex flex-col items-start gap-y-2">
              <li className="flex items-center justify-center gap-2">
                <Mail className="size-3.5 text-zinc-700" />
                <span className="text-sm text-zinc-500">{customer.email}</span>
              </li>
              <li className="flex items-center justify-center gap-2">
                <Phone className="size-3.5 text-zinc-700" />
                <span className="text-sm text-zinc-500">{customer.phone}</span>
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
      </section>

      {/* Add New Subscription Form */}
      <AddSubscriptionForm customerId={customerId} vehicles={vehicles} />
    </>
  );
};

export default AddSubscriptionPage;
