import { Layout } from "@/components/layout/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const LoginPage = lazy(() => import("@/pages/LoginPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const InventoryPage = lazy(() => import("@/pages/InventoryPage"));
const BillingPage = lazy(() => import("@/pages/BillingPage"));
const PurchaseOrdersPage = lazy(() => import("@/pages/PurchaseOrdersPage"));
const NewPurchaseOrderPage = lazy(() => import("@/pages/NewPurchaseOrderPage"));
const DistributorsPage = lazy(() => import("@/pages/DistributorsPage"));
const ReportsPage = lazy(() => import("@/pages/ReportsPage"));

function PageFallback() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96" />
      <div className="grid grid-cols-4 gap-4 mt-6">
        {["a", "b", "c", "d"].map((k) => (
          <Skeleton key={k} className="h-28 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function withLayout(Component: React.ComponentType) {
  return function LayoutWrapper() {
    return (
      <Layout>
        <Suspense fallback={<PageFallback />}>
          <Component />
        </Suspense>
      </Layout>
    );
  };
}

const rootRoute = createRootRoute();

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/login",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <LoginPage />
    </Suspense>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: withLayout(DashboardPage),
});

const inventoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/inventory",
  component: withLayout(InventoryPage),
});

const billingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/billing",
  component: withLayout(BillingPage),
});

const billingInvoiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/billing/$invoiceId",
  component: withLayout(BillingPage),
});

const purchaseOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/purchase-orders",
  component: withLayout(PurchaseOrdersPage),
});

const newPurchaseOrderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/purchase-orders/new",
  component: withLayout(NewPurchaseOrderPage),
});

const distributorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/distributors",
  component: withLayout(DistributorsPage),
});

const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reports",
  component: withLayout(ReportsPage),
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  dashboardRoute,
  inventoryRoute,
  billingRoute,
  billingInvoiceRoute,
  purchaseOrdersRoute,
  newPurchaseOrderRoute,
  distributorsRoute,
  reportsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
