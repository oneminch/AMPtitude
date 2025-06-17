import type { MembershipStatus, SidebarLink } from "@/types";
import {
  CarFront,
  Users,
  Headset,
  BookMarked,
  Headphones,
  Smile,
  User
} from "lucide-react";

export const PRIMARY_SIDEBAR_LINKS: SidebarLink[] = [
  {
    label: "Customers",
    href: "/customers",
    icon: <Users className="size-5 text-zinc-500" />
  },
  {
    label: "Subscriptions",
    href: "/subscriptions",
    icon: <CarFront className="size-5 text-zinc-500" />
  },
  {
    label: "Tickets",
    href: "#",
    icon: <Headset className="size-5 text-zinc-500" />
  }
];

export const GLOBAL_HEADING_MAP: SidebarLink[] = [
  ...PRIMARY_SIDEBAR_LINKS,
  {
    label: "Profile",
    href: "/customers/*",
    icon: <User className="size-5 text-zinc-500" />
  },
  {
    label: "Subscription",
    href: "/subscriptions/*",
    icon: <CarFront className="size-5 text-zinc-500" />
  }
];

export const SECONDARY_SIDEBAR_LINKS: SidebarLink[] = [
  {
    label: "Knowledge Hub",
    href: "#",
    icon: <BookMarked className="size-5 text-zinc-500" />
  },
  {
    label: "Support",
    href: "#",
    icon: <Headphones className="size-5 text-zinc-500" />
  },
  {
    label: "Feedback",
    href: "#",
    icon: <Smile className="size-5 text-zinc-500" />
  }
];

export const STATUSES: MembershipStatus[] = ["Active", "Inactive", "Overdue"];

export const STATUS_COLORS: Record<MembershipStatus, string> = {
  Active: "bg-lime-500",
  Inactive: "bg-amber-500",
  Overdue: "bg-rose-500"
};

export const UNIVERSAL_PLANS: Record<string, number> = {
  "Basic Wash": 19.99,
  "Ultimate Wash": 29.99
};

export const CAR_WASH_PROVIDERS = [
  "AUTOBELL",
  "Autowash",
  "TAGG-n-GO",
  "Whistle Express",
  "Woodies Wash Shack",
  "Zips Express"
];
