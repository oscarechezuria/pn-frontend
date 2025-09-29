import React from 'react'
import { Menu } from "lucide-react"; 
import { currentPathname } from '@/lib/utils';


interface LeftContentProps {
  onMenuClick: () => void;
  itemsValue: string[];
  pathname?: string;
}

export default function LeftContent({ onMenuClick, itemsValue, pathname }: LeftContentProps) {

  return (
    <div className="flex items-center gap-4">
        <div className="lg:hidden flex justify-center"> {/* Botón hamburguesa solo visible en mobile */}
            <Menu size={36}  onClick={onMenuClick} className="text-primary h-10 w-10 rounded-full p-1 cursor-pointer" />
        </div>
        <div>
            <h1 className="text-2xl font-bold text-primary">{currentPathname(pathname)}</h1>
        </div>
    </div>
  )
}
