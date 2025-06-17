"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { removeSubscription } from "@/lib/db/actions";
import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface RemoveSubscriptionModalProps {
  subscriptionId: string;
}

const RemoveSubscriptionModal: React.FC<RemoveSubscriptionModalProps> = ({
  subscriptionId
}) => {
  const router = useRouter();

  const handleConfirmDelete = async () => {
    try {
      // Remove subscription
      const customerId = await removeSubscription(subscriptionId);

      toast.success("Subscription has been successfully removed!");

      // Redirect to customer profile page
      router.push(`/customers/${customerId}`);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to remove subscription. Please try again."
      );
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          Remove
          <Trash2 className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to remove this subscription?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            subscription and remove the data from the customer&apos;s account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-rose-500 hover:bg-red-400"
            onClick={handleConfirmDelete}>
            Remove Subscription
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveSubscriptionModal;
