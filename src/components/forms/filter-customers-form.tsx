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
import { ListRestart, Search } from "lucide-react";
import { STATUSES } from "@/lib/constants";
import { parseAsString, useQueryStates } from "nuqs";
import { useTransition } from "react";
import type { MembershipStatus } from "@/types";
import { Button } from "@/components/ui/button";

const FilterCustomersForm = () => {
  const [_, startTransition] = useTransition();

  const [filters, setFilters] = useQueryStates(
    { q: parseAsString.withDefault(""), status: parseAsString.withDefault("") },
    {
      shallow: false,
      startTransition
    }
  );

  // Update state and url parameters for search and status
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || ""
    }));
  };

  const handleFilterReset = () => {
    setFilters({
      q: "",
      status: ""
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 p-6">
      <div className="relative w-full">
        <Search className="w-9 h-9 p-2.5 absolute left-0 flex items-center justify-center text-sm text-zinc-500" />
        <Input
          data-testid="customers-table-search"
          type="search"
          placeholder="Search by name, email, or phone..."
          className="pl-8"
          value={filters.q || ""}
          onChange={(e) => handleFilterChange("q", e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <Select
          value={filters.status || ""}
          onValueChange={(value) =>
            handleFilterChange("status", value as MembershipStatus)
          }>
          <SelectTrigger
            className="w-full"
            data-testid="customers-table-filter">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          aria-label="Reset Filters"
          variant="outline"
          className="h-9 px-4 py-2 has-[>svg]:px-3"
          onClick={handleFilterReset}>
          <ListRestart />
        </Button>
      </div>
    </div>
  );
};

export default FilterCustomersForm;
