import { Invoice } from "@/app/types/Common";
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



export function transformInvoices(data: Invoice[]): Invoice[] {
  if (!Array.isArray(data)) return [];

  return data.map((item) => {
    // Si es Nota de Crédito, days_expired es siempre 0
    if (item.document_type === "Notas de Crédito") {
      return {
        ...item,
        days_expired: 0,
      };
    }

    // Para otros tipos de documento, calcular días vencidos
    const parseDate = (str: string | null | undefined): Date | null => {
      if (!str) return null;
      const [day, month, year] = str.split("/").map(Number);
      return new Date(year, month - 1, day);
    };

    const dueDate = parseDate(item.due_date);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let daysExpired = 0;

    if (dueDate instanceof Date && !isNaN(dueDate.getTime())) {
      const diffMs = today.getTime() - dueDate.getTime();
      daysExpired = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    }

    return {
      ...item,
      days_expired: daysExpired,
    };
  });
}


export const filterInvoices = (data: Invoice[]): Invoice[] => {
  // 1. Filtrar únicamente facturas
  const onlyInvoices = data.filter(
    (item) => item.document_type.toLowerCase() === "facturas"
  );

  // 2. Encontrar la factura más antigua por cliente
  const oldestInvoicesMap = new Map<string, Invoice>();

  for (const invoice of onlyInvoices) {
    const existing = oldestInvoicesMap.get(invoice.customer_name);

    if (!existing || invoice.days_expired > existing.days_expired) {
      oldestInvoicesMap.set(invoice.customer_name, invoice);
    }
  }

  // 3. Extraemos todos los objetos Invoice guardados en el Map y los recopilamos en un array. 
  const oldestInvoices = Array.from(oldestInvoicesMap.values());

  // 4. ORDENAR → Primero por monto, luego por días vencidos
  oldestInvoices.sort((a, b) => {
    // Si tienen igual días vencidos, ordenar por monto mayor
    if (b.days_expired === a.days_expired) {
      return b.net_amount - a.net_amount;
    }

    // Si no, ordenar por días vencidos
    return b.days_expired - a.days_expired;
  });

  // 5. Crear un Set para saber cuáles facturas ya usamos
  const oldestSet = new Set(
    oldestInvoices.map(inv => `${inv.customer_name}-${inv.document_number}`)
  );

  // 6. Recuperar TODA la data excluida manteniendo su orden original
  const remainingData = data.filter(
    (item) =>
      !oldestSet.has(`${item.customer_name}-${item.document_number}`)
  );

  // 7. Unir resultados sin romper orden
  return [...oldestInvoices, ...remainingData];
};




// Función helper para formatear números
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).replace(/,/g, 'X').replace(/\./g, '.').replace(/X/g, ',');
};