"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CxcView from "@/components/features/cxc/views/CxcView";
import CustomersView from "@/components/features/customers/CustomersView";
import AnalyticsView from "@/components/features/analytics/AnalyticsView";
import OrdersView from "@/components/features/orders/OrdersView";
import SettingsView from "@/components/features/settings/SettingsView";

function DashboardContent() {

  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const renderView = () => {
    switch (tab) {
      case "cxc":
        return <CxcView />;
      case "customers":
        return <CustomersView />;
      case "analytics":
        return <AnalyticsView />;
      case "orders":
        return <OrdersView />;
      case "settings":
        return <SettingsView />;
      default:
        // Default view or redirect could happen here. 
        // For now rendering CxcView as default if no tab provided
        return <CxcView />;
    }
  };

  return <>{renderView()}</>;
}


export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-6">Cargando...</div>}>
      <DashboardContent />
    </Suspense>
  );
}