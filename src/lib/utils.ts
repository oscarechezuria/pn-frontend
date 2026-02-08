
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

// Función helper para formatear números
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).replace(/,/g, 'X').replace(/\./g, '.').replace(/X/g, ',');
};