"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CAR_WASH_PROVIDERS } from "@/lib/constants";
import Link from "next/link";
import { useState } from "react";
import FormErrorMessage from "@/components/shared/form-error-message";
import type { Customer } from "@/types";
import { updateCustomer } from "@/lib/db/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EditCustomerFormProps {
  customerId: string;
}

type ProfileFormState = Pick<Customer, "name" | "email" | "phone" | "brand">;

const defaultFormState = {
  name: "",
  email: "",
  phone: "",
  brand: ""
};

const EditCustomerForm: React.FC<EditCustomerFormProps> = ({ customerId }) => {
  const router = useRouter();

  const [formState, setFormState] =
    useState<ProfileFormState>(defaultFormState);

  const [errors, setErrors] = useState<Partial<ProfileFormState>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<ProfileFormState> = {};

    if (!formState.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (
      !formState.phone.trim() ||
      !/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(formState.phone.trim())
    ) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!formState.brand) {
      newErrors.brand = "Please choose an option from the dropdown";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setErrors({ ...errors, [key]: "" });

    setFormState({ ...formState, [key]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the form errors before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Update customer information
      await updateCustomer(customerId, formState);

      toast.success("Profile updated successfully!");

      // Reset form and redirect
      setFormState(defaultFormState);
      router.push(`/customers/${customerId}`);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update profile. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-4 sm:px-6 py-4 max-w-3xl mx-auto">
      <h2 className="text-lg mb-6 font-semibold">Edit Customer Information</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 py-2">
        <div className="flex items-start gap-4 w-full *:w-full">
          <div>
            <Label className="mb-2" htmlFor="full-name">
              Full Name
            </Label>

            <Input
              id="full-name"
              type="text"
              placeholder="Full Name"
              value={formState.name}
              onChange={(e) => handleInputChange(e, "name")}
            />

            <FormErrorMessage errorMessage={errors.name} />
          </div>
        </div>

        <div>
          <Label className="mb-2" htmlFor="email">
            Email
          </Label>

          <Input
            id="email"
            type="text"
            placeholder="name@example.com"
            value={formState.email}
            onChange={(e) => handleInputChange(e, "email")}
          />

          <FormErrorMessage errorMessage={errors.email} />
        </div>

        <div>
          <Label className="mb-2" htmlFor="phone">
            Phone
          </Label>

          <Input
            id="phone"
            type="text"
            placeholder="(000)-000-0000"
            value={formState.phone}
            onChange={(e) => handleInputChange(e, "phone")}
          />

          <FormErrorMessage errorMessage={errors.phone} />
        </div>

        <div className="flex items-start gap-4 w-full *:w-full">
          <div>
            <Label className="mb-2">Car Wash Provider</Label>

            <Select
              value={formState.brand}
              onValueChange={(value) =>
                setFormState({ ...formState, brand: value })
              }>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CAR_WASH_PROVIDERS.map((provider) => (
                    <SelectItem key={provider} value={provider}>
                      {provider}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <FormErrorMessage errorMessage={errors.brand} />
          </div>
        </div>

        <div className="py-6 *:w-full sm:*:w-auto flex flex-col sm:flex-row items-center gap-4">
          <Button disabled={isSubmitting}>Save Changes</Button>
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

export default EditCustomerForm;
