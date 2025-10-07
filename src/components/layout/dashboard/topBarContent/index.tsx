"use client";
import { Menu } from "lucide-react"; 
import { currentPathname } from "@/lib/utils";
import LeftContent from "./LeftContent";

type TopbarProps = {
  onMenuClick: () => void;
  pathname?: string;
};

export default function TopBarContent({ onMenuClick, pathname }: TopbarProps) {


  return (
    <header className="flex justify-between items-center gap-2 py-4 px-4 lg:pt-16 lg:pb-3 lg:px-0">

        <div className="flex items-center gap-4">
          <div className="lg:hidden flex justify-center"> {/* Botón hamburguesa solo visible en mobile */}
              <Menu size={36}  onClick={onMenuClick} className="text-primary h-10 w-10 rounded-full p-1 cursor-pointer" />
          </div>
            
          <h1 className="text-2xl font-bold text-primary">{currentPathname(pathname)}</h1>
        </div>
      
        <div>
            <LeftContent pathname={pathname}/>
        </div>
      
    </header>
  );
}