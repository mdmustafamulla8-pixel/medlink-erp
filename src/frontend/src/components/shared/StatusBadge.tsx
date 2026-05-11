import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@/types";

interface StatusBadgeProps {
  status: OrderStatus | string;
  className?: string;
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  [OrderStatus.pending]: {
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  [OrderStatus.confirmed]: {
    label: "Confirmed",
    className:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  },
  [OrderStatus.shipped]: {
    label: "Shipped",
    className:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  },
  [OrderStatus.delivered]: {
    label: "Delivered",
    className: "bg-accent/20 text-accent dark:bg-accent/30",
  },
  [OrderStatus.cancelled]: {
    label: "Cancelled",
    className: "bg-destructive/15 text-destructive",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground",
  };

  return (
    <Badge
      variant="secondary"
      className={cn(
        "text-xs font-medium border-0",
        config.className,
        className,
      )}
    >
      {config.label}
    </Badge>
  );
}
