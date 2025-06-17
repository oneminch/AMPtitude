"use client";

import { usePathname } from "next/navigation";
import { GLOBAL_HEADING_MAP } from "@/lib/constants";
import { useEffect, useState } from "react";
import type { SidebarLink } from "@/types";

const GlobalHeading: React.FC = () => {
  const pathname = usePathname();
  const [heading, setHeading] = useState<Partial<SidebarLink>>({});

  useEffect(() => {
    const currentLink = GLOBAL_HEADING_MAP.find((link) => {
      if (link.href.endsWith("/*")) {
        const base = link.href.replace("/*", "");
        return pathname.startsWith(base);
      }
      return pathname === link.href;
    });

    if (currentLink) {
      setHeading(currentLink);
    } else {
      setHeading({});
    }
  }, [pathname]);

  return (
    heading.label && (
      <div className="flex items-center gap-4 min-h-8">
        <span className="*:size-6">{heading.icon}</span>

        <h1 className="text-2xl font-medium">{heading.label}</h1>
      </div>
    )
  );
};

export default GlobalHeading;
