import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { GstRate } from "@/types";

interface GstBadgeProps {
  rate: GstRate | string;
  className?: string;
}

const GST_CONFIG: Record<string, { label: string; className: string }> = {
  [GstRate.gst5]: {
    label: "GST 5%",
    className: "bg-accent/10 text-accent",
  },
  [GstRate.gst12]: {
    label: "GST 12%",
    className: "bg-primary/10 text-primary",
  },
  [GstRate.gst18]: {
    label: "GST 18%",
    className: "bg-destructive/10 text-destructive",
  },
};

export function GstBadge({ rate, className }: GstBadgeProps) {
  const config = GST_CONFIG[rate] ?? {
    label: rate,
    className: "bg-muted text-muted-foreground",
  };

  return (
    <Badge
      variant="secondary"
      className={cn(
        "text-[11px] font-mono font-medium border-0 px-1.5",
        config.className,
        className,
      )}
    >
      {config.label}
    </Badge>
  );
}
