"use client";

import { useState } from "react";
import Link from "next/link";
import { Settings, LogOut, ChartNoAxesCombined as BarChart3, ShoppingCart, Users, HandCoins, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button"
import { ModalMenuDashboard } from "./ModalMenuDashboard";

interface SidebarProps {
  sidebarOpen?: boolean;
  onSelect?: () => void;
  pathname?: string;
}

const menuGroups = [
  {
    header: "Finanzas",
    items: [
      { title: "Cxc", path: "/dashboard?tab=cxc", icon: HandCoins },
    ],
  },
  {
    header: "Ventas",
    items: [
      { title: "Analítica", path: "/dashboard?tab=analytics", icon: BarChart3 },
      { title: "Pedidos", path: "/dashboard?tab=orders", icon: ShoppingCart },
      { title: "Clientes", path: "/dashboard?tab=customers", icon: Users },
    ],
  },
  {
    header: "General",
    items: [
      { title: "Ajustes", path: "/dashboard?tab=settings", icon: Settings },
    ]
  }
];


export default function Sidebar({ sidebarOpen, onSelect, pathname }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const router = useRouter()
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "cxc";

  // Sign out function
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error("Error signing out:", error)

    router.push("/")
  }

  const isActive = (path: string) => {
    // Check if it's a query param link
    if (path.includes("?tab=")) {
      const tab = path.split("?tab=")[1];
      return currentTab === tab;
    }
    // Fallback for standard routes (like usersettings)
    return pathname === path;
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <>
      <ModalMenuDashboard sidebarOpen={sidebarOpen} onSelect={onSelect} handleSignout={handleSignOut} />
      <aside className={`hidden lg:flex lg:flex-col lg:justify-between bg-secondary lg:p-4 lg:pt-16 transition-all duration-300 ${isCollapsed ? "lg:w-20 lg:px-2" : "lg:w-64 lg:pl-12 lg:pr-4"}`}>

        {/* Sidebar Header - Hidden when collapsed */}
        {!isCollapsed && (

          <div className="flex justify-center items-center mb-8">
            <div className="w-24 h-24 bg-primary rounded-lg" />
          </div>

        )}

        {/* Collapse Toggle Button */}
        <button
          onClick={toggleCollapse}
          className={`flex items-center justify-center p-2 mb-4 w-12 m-auto rounded-md hover:bg-black/10 transition-colors cursor-pointer ${isCollapsed ? "mx-auto" : ""}`}
          aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
          title={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        >
          {isCollapsed ? (
            <PanelLeftOpen size={20} className="text-red-500" />
          ) : (
            <PanelLeftClose size={20} className="text-red-500" />
          )}
        </button>


        {/* Sidebar Content */}
        <div className={`flex flex-col gap-6 justify-start overflow-y-auto flex-1 ${isCollapsed ? "items-center" : "w-full"}`}>
          {menuGroups.map((group, groupIndex) => (
            <div key={groupIndex} className={`flex flex-col gap-2 ${isCollapsed ? "items-center w-full" : ""}`}>
              {/* Section Header - Hidden when collapsed */}
              {!isCollapsed && group.header && (
                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {group.header}
                </h3>
              )}

              {/* Items */}
              {group.items.map(({ title, path, icon: Icon }) => (
                <Link
                  key={path}
                  href={path}
                  title={isCollapsed ? title : undefined}
                  className={`flex items-center gap-4 py-2 px-2 text-label text-primary ${isActive(path) ? "bg-primary text-secondary hover:text-secondary hover:bg-primary" : ""} rounded-md hover:bg-black/10 transition-colors ${isCollapsed ? "justify-center w-10 h-10 p-0" : ""}`}
                >
                  <Icon size={20} />
                  {!isCollapsed && title}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Footer content */}
        <div className={`flex justify-center mt-auto ${isCollapsed ? "w-full" : "w-full"}`}>
          <Button
            onClick={handleSignOut}
            title={isCollapsed ? "Cerrar Sesión" : undefined}
            className={`flex justify-center bg-red-200 text-red-600 hover:bg-red-300 cursor-pointer font-bold rounded-xl transition-all ${isCollapsed ? "w-10 h-10 p-0" : "py-2 px-6 w-full"}`}
          >
            <LogOut size={isCollapsed ? 20 : 24} className={isCollapsed ? "" : "mr-2"} />
            {!isCollapsed && "Cerrar Sesión"}
          </Button>
        </div>
      </aside>
    </>
  );
}
