
import { AccountsReceivableWithCustomer } from "@/app/types/Common";

export function transformInvoices(data: AccountsReceivableWithCustomer[]): AccountsReceivableWithCustomer[] {
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

export const filterInvoices = (data: AccountsReceivableWithCustomer[]): AccountsReceivableWithCustomer[] => {
    // 1. Filtrar únicamente facturas
    const onlyInvoices = data.filter(
        (item) => item.document_type.toLowerCase() === "facturas"
    );

    // 2. Encontrar la factura más antigua por cliente
    const oldestInvoicesMap = new Map<string, AccountsReceivableWithCustomer>();

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

/* -------------------------------
*  Agrupar facturas por cliente
* ------------------------------- */
export const groupInvoicesByCustomer = (data: AccountsReceivableWithCustomer[]) => {
    const groups: Record<string, AccountsReceivableWithCustomer[]> = {};

    data.forEach((invoice) => {
        if (!groups[invoice.customer_name]) {
            groups[invoice.customer_name] = [];
        }
        groups[invoice.customer_name].push(invoice);
    });

    // 🔥 ORDENAR cada grupo antes de retornarlo
    Object.keys(groups).forEach((customerName) => {
        groups[customerName].sort((a, b) => {
            // 1️⃣ Si tienen los mismos días vencidos → ordenar por monto
            if (b.days_expired === a.days_expired) {
                return b.net_amount - a.net_amount; // monto mayor primero
            }

            // 2️⃣ Si no → ordenar por días vencidos
            return b.days_expired - a.days_expired; // más viejo primero
        });
    });

    return groups;
};


/* -------------------------------
 *  Calcular subtotales por cliente
 * ------------------------------- */
export const calculateInvoiceSubtotals = (groups: Record<string, AccountsReceivableWithCustomer[]>) => {
    const subs: Record<string, number> = {};

    Object.keys(groups).forEach((client) => {
        subs[client] = groups[client].reduce(
            (sum, f) => sum + f.net_amount,
            0
        );
    });

    return subs;
};

/* -------------------------------
 *  Calcular total general
 * ------------------------------- */
export const calculateTotalReceivables = (subs: Record<string, number>) => {
    return Object.values(subs).reduce((sum, val) => sum + val, 0);
};
