import Image from "next/image";
import Link from "next/link";
import { TvMinimal, User, X } from "lucide-react"; 

interface SidebarProps {
  sidebarOpen?: boolean;
  onSelect?: () => void;
  pathname?: string;
}

const sidebarItems = [
  { title: "General", path: "/dashboard", icon: TvMinimal},
  { title: "Clientes", path: "/dashboard/customers", icon: User },
];


export default function Sidebar({ onSelect, sidebarOpen, pathname }: SidebarProps) {

  const sidebarClassname = `flex flex-col gap-12 bg-secondary p-4 pt-12 lg:w-64 lg:pl-12 lg:pr-4 fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 `;


  return (
    <aside className={sidebarClassname}>

        {/* Menu icon */}
        <div className="flex justify-center">
            <X size={36}  onClick={onSelect} className="lg:hidden text-secondary bg-primary rounded-full p-1 cursor-pointer" />
        </div>
    
        {/* Sidebar Header */}
        <div className=" flex justify-center items-center gap-2">
            <div className="w-24 h-24 bg-primary rounded-lg"/>
        </div>
        
        {/* Sidebar Content */}
        <div className="flex flex-col gap-2 justify-center items-center">
            {sidebarItems.map(({ title, path, icon: Icon }) => (
              title !== "Cerrar Sesión" ? 
              (
                <Link key={path} href={path} onClick={onSelect} className={`flex items-center gap-4 py-2 px-6 text-label text-primary ${pathname === path ? "bg-primary text-secondary" : ""} hover:text-secondary hover:bg-primary rounded-xl transition-colors`}>
                <Icon size={24} />
                {title}
                </Link>
              ) : (
                <Link key={path} href={path} onClick={onSelect} className="flex items-center gap-4 py-2 px-6 text-body text-red-500 hover:text-red-500 hover:bg-red-200/80 font-bold rounded-xl transition-colors duration-200 ">
                  <Icon size={24} />
                  {title}
                </Link>
              )
            ) )}  
        </div>
    </aside>
  );
}
