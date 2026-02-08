import Link from "next/link";
import { TvMinimal, Settings, LogOut, ChartNoAxesCombined as BarChart3, ShoppingCart, Users, HandCoins } from "lucide-react";
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


  return (
    <>
      <ModalMenuDashboard sidebarOpen={sidebarOpen} onSelect={onSelect} handleSignout={handleSignOut} />
      <aside className={`hidden lg:flex lg:flex-col lg:justify-between bg-secondary lg:p-4 lg:pt-16 lg:w-64 lg:pl-12 lg:pr-4`}>

        {/* Sidebar Header */}
        <div className=" flex justify-center items-center mb-8">
          <div className="w-24 h-24 bg-primary rounded-lg" />
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col gap-6 justify-start w-[196px] mx-auto lg:w-full overflow-y-auto">
          {menuGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-col gap-2">
              {/* Section Header */}
              {group.header && (
                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {group.header}
                </h3>
              )}

              {/* Items */}
              {group.items.map(({ title, path, icon: Icon }) => (
                <Link
                  key={path}
                  href={path}
                  className={`flex items-center gap-4 py-1 px-2 text-label text-primary ${isActive(path) ? "bg-primary text-secondary hover:text-secondary hover:bg-primary" : ""} rounded-md hover:bg-black/10 transition-colors`}
                >
                  <Icon size={20} />
                  {title}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* footer content */}
        <div className="flex justify-center w-[196px] mx-auto lg:w-full mt-auto">
          <Button onClick={handleSignOut} className="flex justify-center bg-red-300 text-red-600 hover:bg-red-300 cursor-pointer font-bold py-2 px-6 rounded-xl w-full">
            <LogOut size={24} className="mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>
    </>
  );
}
