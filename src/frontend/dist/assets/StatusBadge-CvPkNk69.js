import { j as jsxRuntimeExports, k as Badge, N as cn } from "./index-D0FyCSZw.js";
import { O as OrderStatus } from "./backend.d-C24xlPzP.js";
const STATUS_CONFIG = {
  [OrderStatus.pending]: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
  },
  [OrderStatus.confirmed]: {
    label: "Confirmed",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
  },
  [OrderStatus.shipped]: {
    label: "Shipped",
    className: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
  },
  [OrderStatus.delivered]: {
    label: "Delivered",
    className: "bg-accent/20 text-accent dark:bg-accent/30"
  },
  [OrderStatus.cancelled]: {
    label: "Cancelled",
    className: "bg-destructive/15 text-destructive"
  }
};
function StatusBadge({ status, className }) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "secondary",
      className: cn(
        "text-xs font-medium border-0",
        config.className,
        className
      ),
      children: config.label
    }
  );
}
export {
  StatusBadge as S
};
