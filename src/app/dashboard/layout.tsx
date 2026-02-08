"use client"

import "../globals.css"
import { useState } from "react"
import TopBarContent from "@/components/layout/header"
import SidebarContent from "@/components/layout/sidebar"
import Main from "@/components/layout/main/MainWrapper"
import { usePathname } from "next/navigation"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanstackqueryProvider } from "@/lib/providers/tanstackqueryProvider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const pathname = usePathname()

  return (
    <div className="flex h-screen overflow-hidden lg:px-24" role="document">
      {/* Sidebar */}
      <SidebarContent
        sidebarOpen={sidebarOpen}
        onSelect={() => setSidebarOpen(!sidebarOpen)}
        pathname={pathname}
      />

      <TanstackqueryProvider>
        {/* Main content */}
        <div className="flex flex-col flex-1 min-w-0">
          <TopBarContent
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            pathname={pathname}
          />

          {/* Main area */}
          <Main>
            {children}
            <ReactQueryDevtools />
          </Main>
        </div>
      </TanstackqueryProvider>
    </div>
  )
}
