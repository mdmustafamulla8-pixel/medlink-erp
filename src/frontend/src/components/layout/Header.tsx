import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLowStockAlerts } from "@/hooks/use-inventory";
import { useExpiryAlerts } from "@/hooks/use-inventory";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Bell, ChevronDown, LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { loginStatus, clear } = useInternetIdentity();
  const { data: lowStock } = useLowStockAlerts();
  const { data: expiry } = useExpiryAlerts();

  const alertCount = (lowStock?.length ?? 0) + (expiry?.length ?? 0);
  const isLoggedIn = String(loginStatus) === "logged-in";

  return (
    <header
      data-ocid="header"
      className={cn(
        "flex items-center justify-between px-4 py-2.5 bg-card border-b border-border shadow-subtle h-14 flex-shrink-0",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span className="font-display font-bold text-foreground text-lg leading-none">
          MedLink ERP
        </span>
        <Badge variant="secondary" className="text-[10px] font-mono px-1.5">
          Cloud
        </Badge>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Dark/Light toggle */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          data-ocid="header.theme_toggle"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Moon className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>

        {/* Notifications */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 relative"
          aria-label={`Notifications${alertCount > 0 ? ` (${alertCount})` : ""}`}
          data-ocid="header.notifications_button"
        >
          <Bell className="w-4 h-4 text-muted-foreground" />
          {alertCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
          )}
        </Button>

        {/* User menu */}
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 gap-1.5 px-2"
                data-ocid="header.user_menu_trigger"
              >
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-accent" />
                </div>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem
                className="text-sm"
                data-ocid="header.profile_item"
              >
                <User className="w-3.5 h-3.5 mr-2" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive text-sm"
                onClick={() => clear()}
                data-ocid="header.logout_button"
              >
                <LogOut className="w-3.5 h-3.5 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            data-ocid="header.login_button"
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
}
