"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { CarFront, Edit } from "lucide-react";
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
import { useState } from "react";
import FormErrorMessage from "@/components/shared/form-error-message";
import type { Subscription, Vehicle } from "@/types";
import { updateSubscription } from "@/lib/db/actions";
import { toast } from "sonner";

interface EditSubscriptionModalProps {
  subscriptionId: string;
  vehicle: Pick<Vehicle, "make" | "model" | "year">;
}

type EditFormStateType = Subscription["plan"];

const defaultFormState: EditFormStateType = "";

const EditSubscriptionModal: React.FC<EditSubscriptionModalProps> = ({
  subscriptionId,
  vehicle
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [subscriptionPlan, setSubscriptionPlan] =
    useState<EditFormStateType>(defaultFormState);

  const [formError, setFormError] = useState<EditFormStateType>(defaultFormState);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let newError = "";

    if (!subscriptionPlan.trim()) {
      newError = "Please pick a wash plan";
    }

    setFormError(newError);
    return newError.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the form errors before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Update subscription
      await updateSubscription(subscriptionId, {
        plan: subscriptionPlan,
        status: "Active",
        pricePerMonth: UNIVERSAL_PLANS[subscriptionPlan]
      });

      // Close dialog and reset form state
      setIsDialogOpen(false);
      setSubscriptionPlan(defaultFormState);

      toast.success("Subscription updated successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update subscription. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Edit
          <Edit className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="pb-2 border-b border-zinc-100">
          <DialogTitle>Edit Subscription</DialogTitle>
          <DialogDescription>
            Update the subscription plan information
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4 py-2">
          <div className="w-auto inline-flex items-center gap-4 border border-zinc-200 px-3 py-2 rounded-lg text-sm bg-zinc-50">
            <CarFront className="size-8 p-1.5 rounded-full bg-zinc-900 text-zinc-100" />
            <span>
              {vehicle.make} {vehicle.model} ({vehicle.year})
            </span>
          </div>

          <div>
            <Label className="mb-2">Pick a Plan</Label>

            <Select
              value={subscriptionPlan}
              onValueChange={(value) => {
                setFormError(defaultFormState);

                setSubscriptionPlan(value);
              }}>
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

            <FormErrorMessage errorMessage={formError} />
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isSubmitting} variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={handleSubmit} type="submit" disabled={isSubmitting}>
            Update Subscription
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditSubscriptionModal;
