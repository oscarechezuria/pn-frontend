import Link from "next/link";
import { TvMinimal, User, Settings, LogOut } from "lucide-react"; 
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import {Button} from "@/components/ui/button"
import {ModalMenuDashboard} from "./ModalMenuDashboard";

interface SidebarProps {
  sidebarOpen?: boolean;
  onSelect?: () => void;
  pathname?: string;
}

const sidebarItems = [
  { title: "General", path: "/dashboard", icon: TvMinimal},
  { title: "Clientes", path: "/dashboard/customers", icon: User },
  { title: "Configuración", path: "/dashboard/usersettings", icon: Settings },
];


export default function Sidebar({sidebarOpen, onSelect, pathname }: SidebarProps) {

  const router = useRouter()

  // Sign out function
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut() 
    if (error) console.error("Error signing out:", error)

    router.push("/")
  } 
  

  return (
     <>
      <ModalMenuDashboard sidebarOpen={sidebarOpen} onSelect={onSelect} handleSignout={handleSignOut} />
      <aside className={`hidden lg:flex lg:flex-col lg:justify-between bg-secondary lg:p-4 lg:pt-16 lg:w-64 lg:pl-12 lg:pr-4`}>
      
          {/* Sidebar Header */}
          <div className=" flex justify-center items-center">
              <div className="w-24 h-24 bg-primary rounded-lg"/>
          </div>
          
          {/* Sidebar Content */}
          <div className="flex flex-col gap-2 justify-center w-[196px] mx-auto lg:w-full">
              {sidebarItems.map(({ title, path, icon: Icon }) => (
                title !== "Cerrar Sesión" ? 
                (
                  <Link key={path} href={path} className={`flex items-center gap-4 py-2 px-6 text-label text-primary ${pathname === path ? "bg-primary text-secondary" : ""} hover:text-secondary hover:bg-primary rounded-xl transition-colors`}>
                  <Icon size={24} />
                  {title}
                  </Link>
                ) : (
                  <Link key={path} href={path} className="flex items-center gap-4 py-2 px-6 text-body text-red-500 hover:text-red-500 hover:bg-red-200/80 font-bold rounded-xl transition-colors duration-200 ">
                    <Icon size={24} />
                    {title}
                  </Link>
                )
              ) )}  
          </div>

          {/* footer content */}   
            <div className="flex justify-center w-[196px] mx-auto lg:w-full">
                <Button  onClick={handleSignOut} className="flex justify-center bg-red-300 text-red-600 hover:bg-red-300 cursor-pointer font-bold py-2 px-6 rounded-xl w-full">
                  <LogOut size={24} className="mr-2"/>
                  Cerrar Sesión
                </Button>
            </div>
      </aside>
      </>
  );
}
