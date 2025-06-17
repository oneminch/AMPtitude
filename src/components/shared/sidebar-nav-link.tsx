"use client";

import { cn } from "@/lib/utils";
import type { SidebarLink } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface SidebarNavLinkProps {
  link: SidebarLink;
  className?: string;
}

const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({ link, className }) => {
  const pathname = usePathname();
  const isActive = pathname === link.href;

  return (
    <Button variant="ghost" asChild>
      <Link
        href={link.href}
        className={cn(
          "relative",
          className,
          isActive &&
            "bg-zinc-50 ring-[0.5px] ring-zinc-300 before:content-[''] before:w-0.5 before:h-2/3 before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-1 before:bg-zinc-800 before:rounded-lg"
        )}>
        {link.icon}
        <span className="text-sm">{link.label}</span>
      </Link>
    </Button>
  );
};

export default SidebarNavLink;
