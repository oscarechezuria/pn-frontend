"use client"
import { useEffect, useState } from "react"
import { X, LaptopMinimal as TvMinimal, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const sidebarItems = [
  { title: "General", path: "/dashboard", icon: TvMinimal },
  { title: "Clientes", path: "/dashboard/customers", icon: User },
  { title: "Configuración", path: "/dashboard/usersettings", icon: Settings },
]

interface ModalProps {
  sidebarOpen?: boolean
  onSelect?: () => void
  handleSignout?: () => void
}

export function ModalMenuDashboard({ sidebarOpen, onSelect, handleSignout }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animationState, setAnimationState] = useState<"enter" | "exit">("enter")

  useEffect(() => {
    if (sidebarOpen) {
      setIsVisible(true)
      setAnimationState("enter")
    } else if (isVisible) {
      // Inicia la animación de salida
      setAnimationState("exit")
      // Espera que termine la animación antes de desmontar
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [sidebarOpen, isVisible])

  if (!isVisible) return null

  return (
    <>
      {/*Backdrop*/}
      <div
        className={`
          fixed inset-0 z-50 bg-black/20 backdrop-blur-sm transition-opacity duration-300
          ${animationState === "enter" ? "animate-in fade-in" : "animate-out fade-out"}
        `}
        onClick={onSelect}
      >
        {/* Modal */}
        <div
          className={`
            fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 duration-300
            ${animationState === "enter" ? "animate-in fade-in zoom-in-95" : "animate-out fade-out zoom-out-95"}
          `}
        >
          <div className="relative mx-4 rounded-lg border-2 border-dashed border-gray-300 bg-white/90 p-6 shadow-xl backdrop-blur-md">
           
            {/* Modal Header */}
            <div className="mb-8 flex items-center justify-between">
              <span className="text-xl font-bold text-foreground">Menú</span>
              <Button
                onClick={onSelect}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white transition-colors cursor-pointer"
                aria-label="Cerrar menú"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/*Modal Body*/}
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={onSelect}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-lg font-medium text-primary transition-colors hover:bg-gray-100"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    {item.title}
                  </Link>
                )
              })}
            </nav>

            {/* Separador */}
            <div className="my-6 border-t border-dashed border-gray-300" />

            {/*Modal Footer*/}
            <div className="flex justify-center">
              <Button
                onClick={handleSignout}
                className="bg-red-300 text-red-600 hover:bg-red-300 cursor-pointer text-lg"
              >
                <LogOut className="h-5 w-5" />
                Cerrar sesión
              </Button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
