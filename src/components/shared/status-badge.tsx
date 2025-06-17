import { Badge } from "@/components/ui/badge";
import { STATUS_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { MembershipStatus } from "@/types";
import { BadgeAlert, BadgeCheck, TriangleAlert } from "lucide-react";

interface StatusBadgeProps {
  status: MembershipStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const isActive = status.toLocaleLowerCase() === "active";
  const isInactive = status.toLocaleLowerCase() === "inactive";
  const isOverdue = status.toLocaleLowerCase() === "overdue";

  return (
    <Badge
      title="Membership Status"
      className={cn("text-white", STATUS_COLORS[status])}>
      {isActive && <BadgeCheck className="size-3" />}
      {isInactive && <BadgeAlert className="size-3" />}
      {isOverdue && <TriangleAlert className="size-3" />}

      {status}
    </Badge>
  );
};

export default StatusBadge;
