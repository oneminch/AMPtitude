"use client";

import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="absolute inset-0 w-full min-h-full flex flex-col items-center justify-center gap-6">
      <TriangleAlert className="size-20" />

      <h2 className="text-2xl font-medium">Page Doesn&apos;t Exist!</h2>

      <Button>
        <Link href="/">Go Home</Link>
      </Button>
    </section>
  );
};

export default NotFound;
