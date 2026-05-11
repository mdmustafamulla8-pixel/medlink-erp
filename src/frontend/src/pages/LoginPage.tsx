import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { BarChart3, Pill, Shield, Zap } from "lucide-react";
import { useEffect } from "react";

const FEATURES = [
  {
    icon: Shield,
    title: "Secure & Compliant",
    desc: "GST-ready invoicing with full audit trail",
  },
  {
    icon: Zap,
    title: "Fast Billing",
    desc: "Complete a sale in under 10 seconds with keyboard shortcuts",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    desc: "Real-time sales, expiry, and reorder intelligence",
  },
] as const;

export default function LoginPage() {
  const { login, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (String(loginStatus) === "logged-in") {
      navigate({ to: "/" });
    }
  }, [loginStatus, navigate]);

  return (
    <div className="min-h-screen bg-background flex" data-ocid="login.page">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col bg-card border-r border-border p-10 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-2xl translate-y-1/2 -translate-x-1/2" />
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-elevated">
            <Pill className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <p className="font-display font-bold text-xl text-foreground leading-none">
              MedLink ERP
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Pharmacy Management Cloud
            </p>
          </div>
        </div>

        {/* Hero image */}
        <div className="flex-1 flex items-center justify-center relative z-10">
          <img
            src="/assets/generated/medlink-hero.dim_1200x600.jpg"
            alt="MedLink ERP Dashboard Preview"
            className="w-full max-w-md rounded-2xl shadow-elevated object-cover"
            loading="lazy"
          />
        </div>

        {/* Tagline */}
        <div className="relative z-10">
          <h2 className="font-display font-bold text-2xl text-foreground leading-tight mb-2">
            Modern pharmacy management
            <br />
            designed for speed.
          </h2>
          <p className="text-sm text-muted-foreground">
            Billing, inventory, purchase orders — all in one cloud platform
            built for Indian pharmacy businesses.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div
        className="flex-1 flex flex-col items-center justify-center p-8"
        data-ocid="login.form_panel"
      >
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Pill className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-lg">MedLink ERP</span>
          </div>

          <div className="mb-8">
            <h1 className="font-display font-bold text-2xl text-foreground mb-2">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in with Internet Identity to access your pharmacy dashboard.
            </p>
          </div>

          <Button
            type="button"
            size="lg"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base h-12"
            onClick={() => login()}
            disabled={String(loginStatus) === "logging-in"}
            data-ocid="login.submit_button"
          >
            {String(loginStatus) === "logging-in"
              ? "Connecting..."
              : "Sign in with Internet Identity"}
          </Button>

          <div className="mt-8 space-y-3">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {f.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-8">
            &copy; {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
