import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
  breadcrumb?: string;
}

export function PageHeader({
  title,
  subtitle,
  actions,
  className,
  breadcrumb,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 px-6 py-4 bg-card border-b border-border",
        className,
      )}
    >
      <div className="min-w-0">
        {breadcrumb && (
          <p className="text-xs text-muted-foreground font-medium mb-0.5 uppercase tracking-wider">
            {breadcrumb}
          </p>
        )}
        <h1 className="font-display font-bold text-xl text-foreground leading-tight truncate">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>
      )}
    </div>
  );
}
