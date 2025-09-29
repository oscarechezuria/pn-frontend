  "use client"

  import "../globals.css"
  import { useState, useEffect } from "react"
  import TopBarContent from "@/components/layout/dashboard/topBarContent"
  import SidebarContent from "@/components/layout/dashboard/sidebarContent"
  import Main from "@/components/layout/dashboard/main"
  import { usePathname } from "next/navigation"



  export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const pathname = usePathname();
    


    return (
      <html>
        <body className="flex min-h-screen lg:px-24">
              <SidebarContent sidebarOpen={sidebarOpen} onSelect={() => setSidebarOpen(!sidebarOpen)} pathname={pathname} />
              <div className="flex flex-col flex-1">
                <TopBarContent onMenuClick={() => setSidebarOpen(!sidebarOpen)} pathname={pathname} />
                <Main>{children}</Main>
              </div>
        </body>
    </html>
    )
  } 