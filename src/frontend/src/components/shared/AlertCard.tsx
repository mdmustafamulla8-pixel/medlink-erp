import { cn } from "@/lib/utils";
import type { AlertSeverity } from "@/types";
import { AlertTriangle, Info, XCircle } from "lucide-react";

interface AlertCardProps {
  severity: AlertSeverity;
  title: string;
  description?: string;
  count?: number;
  className?: string;
  action?: React.ReactNode;
  "data-ocid"?: string;
}

const SEVERITY_CONFIG: Record<
  AlertSeverity,
  { icon: React.ElementType; className: string }
> = {
  critical: {
    icon: XCircle,
    className: "bg-destructive/10 border-destructive/30 text-destructive",
  },
  warning: {
    icon: AlertTriangle,
    className:
      "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-700/40 dark:text-yellow-300",
  },
  info: {
    icon: Info,
    className: "bg-primary/10 border-primary/30 text-primary",
  },
};

export function AlertCard({
  severity,
  title,
  description,
  count,
  className,
  action,
  "data-ocid": dataOcid,
}: AlertCardProps) {
  const { icon: Icon, className: severityClass } = SEVERITY_CONFIG[severity];

  return (
    <div
      data-ocid={dataOcid}
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg border",
        severityClass,
        className,
      )}
    >
      <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold truncate">{title}</p>
          {count !== undefined && (
            <span className="text-xs font-bold bg-current/20 px-1.5 py-0.5 rounded">
              {count}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs mt-0.5 opacity-80 line-clamp-2">
            {description}
          </p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
