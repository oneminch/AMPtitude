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
import { transferSubscription } from "@/lib/db/actions";
import { ArrowRightLeft, BadgeDollarSign } from "lucide-react";
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
import { useState } from "react";
import FormErrorMessage from "@/components/shared/form-error-message";
import type { Subscription, Vehicle } from "@/types";
import { toast } from "sonner";

interface TransferSubscriptionModalProps {
  subscription: Pick<Subscription, "id" | "plan" | "pricePerMonth">;
  vehicles: Vehicle[];
}

type TransferFormStateType = Vehicle["id"];

const defaultFormState: TransferFormStateType = "";

const TransferSubscriptionModal: React.FC<TransferSubscriptionModalProps> = ({
  subscription,
  vehicles
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [newVehicleId, setNewVehicleId] =
    useState<TransferFormStateType>(defaultFormState);

  const [formError, setFormError] =
    useState<TransferFormStateType>(defaultFormState);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let newError = "";

    if (!newVehicleId.trim()) {
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

      // Transfer subscription
      const res = await transferSubscription(subscription.id, newVehicleId);

      if (res && res.error) {
        return toast.error(res.error);
      }

      toast.success("Subscription transferred successfully!");

      // Close dialog and reset form state
      setIsDialogOpen(false);
      setNewVehicleId(defaultFormState);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to transfer subscription. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Transfer
          <ArrowRightLeft className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="pb-2 border-b border-zinc-100">
          <DialogTitle>Transfer Subscription</DialogTitle>
          <DialogDescription>
            Trasfer this subscription to a different vehicle
          </DialogDescription>
        </DialogHeader>

        <div className="w-auto inline-flex items-center gap-4 border border-zinc-200 px-3 py-2 rounded-lg text-sm bg-zinc-50">
          <BadgeDollarSign className="size-8 p-1.5 rounded-full bg-zinc-900 text-zinc-100" />
          <span>
            {subscription.plan} (${subscription.pricePerMonth}/month)
          </span>
        </div>

        <form className="flex flex-col gap-4 py-2">
          <div>
            <Label className="mb-2">Pick a Vehicle</Label>

            <Select
              value={newVehicleId}
              onValueChange={(value) => {
                setFormError("");

                setNewVehicleId(value);
              }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Vehicle" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {vehicles.length > 0 ? (
                    vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.make} {vehicle.model} ({vehicle.year})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem
                      value="None"
                      disabled
                      className="justify-center">
                      No Vehicles on Account
                    </SelectItem>
                  )}
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
            Transfer Subscription
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransferSubscriptionModal;
