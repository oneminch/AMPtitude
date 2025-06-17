"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UNIVERSAL_PLANS } from "@/lib/constants";
import Link from "next/link";
import React, { useState } from "react";
import FormErrorMessage from "@/components/shared/form-error-message";
import type { Subscription, Vehicle } from "@/types";
import { addSubscription } from "@/lib/db/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AddSubscriptionFormProps {
  customerId: string;
  vehicles: Vehicle[];
}

type AddSubscriptionFormState = Pick<
  Subscription,
  "plan" | "startDate" | "status" | "pricePerMonth" | "vehicleId"
>;

const defaultFormState: AddSubscriptionFormState = {
  plan: "",
  startDate: "",
  status: "Active",
  pricePerMonth: 0,
  vehicleId: ""
};

const AddSubscriptionForm: React.FC<AddSubscriptionFormProps> = ({
  customerId,
  vehicles
}) => {
  const router = useRouter();

  const [formState, setFormState] =
    useState<AddSubscriptionFormState>(defaultFormState);

  const [errors, setErrors] = useState<Partial<AddSubscriptionFormState>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<AddSubscriptionFormState> = {};

    if (!formState.plan.trim()) {
      newErrors.plan = "Please pick a wash plan";
    }

    if (!formState.vehicleId.trim()) {
      newErrors.vehicleId = "Please pick a vehicle";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelectChange = (key: string, value: string) => {
    setErrors({ ...errors, [key]: "" });

    setFormState({ ...formState, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the form errors before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Add subscription to database
      await addSubscription({
        ...formState,
        customerId,
        pricePerMonth: UNIVERSAL_PLANS[formState.plan],
        startDate: new Date().toISOString()
      });

      toast.success("Subscription added successfully!");

      // Reset form and redirect
      setFormState(defaultFormState);
      router.push(`/customers/${customerId}`);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to add subscription. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-4 sm:px-6 py-4 max-w-3xl mx-auto">
      <h2 className="text-lg mb-6 font-semibold">Add New Subscription</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 py-2">
        <div className="flex flex-col md:flex-row items-start gap-3 w-full *:w-full">
          <div className="flex items-start gap-4 w-full *:w-full">
            <div>
              <Label className="mb-2">Plan</Label>

              <Select
                value={formState.plan}
                onValueChange={(value) => handleSelectChange("plan", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Wash Plan" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {Object.entries(UNIVERSAL_PLANS).map(([plan, price]) => (
                      <SelectItem key={plan} value={plan}>
                        {plan} - ${price}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <FormErrorMessage errorMessage={errors.plan} />
            </div>
          </div>

          <div>
            <Label className="mb-2">Vehicle</Label>

            <Select
              value={formState.vehicleId}
              onValueChange={(value) => handleSelectChange("vehicleId", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Vehicle" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.make} {vehicle.model} ({vehicle.year})
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <FormErrorMessage errorMessage={errors.vehicleId} />
          </div>
        </div>

        <div className="py-6 *:w-full sm:*:w-auto flex flex-col sm:flex-row items-center gap-4">
          <Button disabled={isSubmitting}>Add Subscription</Button>
          <Button variant="outline" asChild>
            <Link href={isSubmitting ? "#" : `/customers/${customerId}`}>
              Cancel
            </Link>
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddSubscriptionForm;
