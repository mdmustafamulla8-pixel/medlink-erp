import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  LayoutDashboard,
  Pill,
  Receipt,
  ShoppingCart,
  Truck,
} from "lucide-react";

type NavItem = {
  id: string;
  label: string;
  path: string;
  icon: React.ElementType;
  shortcut?: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
    shortcut: "F5",
  },
  {
    id: "inventory",
    label: "Inventory",
    path: "/inventory",
    icon: FlaskConical,
    shortcut: "F2",
  },
  {
    id: "billing",
    label: "Billing",
    path: "/billing",
    icon: Receipt,
    shortcut: "F1",
  },
  {
    id: "purchase-orders",
    label: "Purchase Orders",
    path: "/purchase-orders",
    icon: ShoppingCart,
    shortcut: "F3",
  },
  {
    id: "distributors",
    label: "Distributors",
    path: "/distributors",
    icon: Truck,
  },
  { id: "reports", label: "Reports", path: "/reports", icon: BarChart3 },
];

export function Sidebar() {
  const collapsed = useAppStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <aside
      data-ocid="sidebar"
      className={cn(
        "flex flex-col h-full bg-card border-r border-border transition-smooth z-10",
        collapsed ? "w-16" : "w-60",
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-4 border-b border-border",
          collapsed ? "justify-center" : "justify-between",
        )}
      >
        {!collapsed && (
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Pill className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-base text-foreground truncate">
              MedLink
            </span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Pill className="w-4 h-4 text-accent-foreground" />
          </div>
        )}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="w-6 h-6 flex-shrink-0"
          onClick={toggleSidebar}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          data-ocid="sidebar.toggle"
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </Button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-3 overflow-y-auto" aria-label="Main navigation">
        <ul className="space-y-0.5 px-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  data-ocid={`nav.${item.id}.link`}
                  className={cn(
                    "flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm font-medium transition-smooth group",
                    active
                      ? "bg-accent/15 text-accent"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    collapsed && "justify-center px-2",
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon
                    className={cn(
                      "flex-shrink-0 w-4 h-4",
                      active ? "text-accent" : "",
                    )}
                  />
                  {!collapsed && (
                    <span className="flex-1 truncate">{item.label}</span>
                  )}
                  {!collapsed && item.shortcut && (
                    <kbd className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">
                      {item.shortcut}
                    </kbd>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-border">
          <p className="text-[10px] text-muted-foreground truncate">
            MedLink ERP v1.0
          </p>
        </div>
      )}
    </aside>
  );
}
