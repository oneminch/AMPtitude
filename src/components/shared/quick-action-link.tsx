import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuickActionLinkProps {
  href: string;
  label: string;
  className?: string;
}

const QuickActionLink: React.FC<QuickActionLinkProps> = ({
  href,
  label,
  className
}) => {
  return (
    <Button
      variant="secondary"
      size="sm"
      className={cn("rounded-full h-7 py-1 px-3 text-xs", className)}
      asChild>
      <Link href={href}>
        <span>{label}</span>
        <ChevronRight className="size-3" />
      </Link>
    </Button>
  );
};

export default QuickActionLink;
