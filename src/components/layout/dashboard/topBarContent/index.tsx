"use client";
import { ListMinus } from "lucide-react"; 
import { currentPathname } from "@/lib/utils";
import LeftContent from "./LeftContent";

type TopbarProps = {
  onMenuClick: () => void;
  pathname?: string;
};

export default function TopBarContent({ onMenuClick, pathname }: TopbarProps) {


  return (
   <header className="flex justify-between items-center gap-2 py-4 px-4 lg:pt-16 lg:pb-3 lg:px-0 ">
  <div className="flex items-center gap-4 min-w-0 flex-shrink">
    <h1 className="text-2xl font-bold text-primary truncate">
      {currentPathname(pathname)}
    </h1>
  </div>

  <div className="flex-shrink-0">
    <LeftContent pathname={pathname}/>
  </div>
  
  <div className="lg:hidden flex justify-center flex-shrink-0">
    <ListMinus 
      size={36}  
      onClick={onMenuClick} 
      className="h-10 w-10 rounded-full p-1 cursor-pointer" 
    />
  </div>
</header>
  );
}