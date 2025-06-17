"use client";

import { Button } from "@/components/ui/button";
import { OctagonX } from "lucide-react";

interface ErrorPageProps {
  // error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ reset }) => {
  return (
    <section className="absolute inset-0 w-full min-h-full flex flex-col items-center justify-center gap-6">
      <OctagonX className="size-20" />

      <h2 className="text-2xl font-medium">Something went wrong!</h2>

      <Button onClick={() => reset()}>Try again</Button>
    </section>
  );
};

export default ErrorPage;
