"use client";
import { usePathname } from "next/navigation"
import LeftContent from "@/components/layout/dashboard/topBarContent/LeftContent";
import RightContent from "@/components/layout/dashboard/topBarContent/RightContent";

type TopbarProps = {
  onMenuClick: () => void;
  pathname?: string;
};

export default function TopBarContent({ onMenuClick, pathname }: TopbarProps) {

  const itemsValue: string[] = ["alias1", "alias2", "alias3"]; // ["alias1", "alias2", "alias3"]

  return (
    <header className="flex justify-between items-center gap-2 py-4 px-4 lg:pt-16 lg:pb-3 lg:px-0">

      {/*Aqui se renderiza el contenido de la izquierda del topbar*/}
      <LeftContent onMenuClick={onMenuClick} itemsValue={itemsValue} pathname={pathname}/>
      
      {/*Aqui se renderiza el contenido de la derecha del topbar*/}
      <RightContent pathname={pathname}/>
      
    </header>
  );
}