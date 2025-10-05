import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function currentPathname(pathname: string | undefined) {

    switch (pathname) {
      case "/dashboard":
        return "General"
      case "/dashboard/customers":
        return "Clientes"
      default:
      case "/dashboard/usersettings":
        return "Configuración"
        break;
    }
}