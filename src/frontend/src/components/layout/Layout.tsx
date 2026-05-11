import { Toaster } from "@/components/ui/sonner";
import { useNavigate } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

function KeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      switch (e.key) {
        case "F1":
          e.preventDefault();
          navigate({ to: "/billing" });
          break;
        case "F2":
          e.preventDefault();
          navigate({ to: "/inventory" });
          break;
        case "F3":
          e.preventDefault();
          navigate({ to: "/purchase-orders" });
          break;
        case "F5":
          e.preventDefault();
          navigate({ to: "/" });
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);

  return null;
}

function InnerLayout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-background">{children}</main>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <KeyboardShortcuts />
      <InnerLayout>{children}</InnerLayout>
    </ThemeProvider>
  );
}
