import { c as createLucideIcon, j as jsxRuntimeExports, k as Badge, N as cn } from "./index-D0FyCSZw.js";
import { G as GstRate } from "./backend.d-C24xlPzP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
const GST_CONFIG = {
  [GstRate.gst5]: {
    label: "GST 5%",
    className: "bg-accent/10 text-accent"
  },
  [GstRate.gst12]: {
    label: "GST 12%",
    className: "bg-primary/10 text-primary"
  },
  [GstRate.gst18]: {
    label: "GST 18%",
    className: "bg-destructive/10 text-destructive"
  }
};
function GstBadge({ rate, className }) {
  const config = GST_CONFIG[rate] ?? {
    label: rate,
    className: "bg-muted text-muted-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "secondary",
      className: cn(
        "text-[11px] font-mono font-medium border-0 px-1.5",
        config.className,
        className
      ),
      children: config.label
    }
  );
}
export {
  GstBadge as G,
  LoaderCircle as L
};
