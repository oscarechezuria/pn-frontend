// useInvoice.js (MODIFICADO)
"use client";

import { useEffect, useState } from "react";
import { fetchInvoices, type Invoice } from "@/services/dashboard/invoiceService";

export function useInvoice() {
  const [data, setData] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Definir la función de carga (la misma lógica que el load inicial)
  const loadInvoices = async () => {
    try {
      setLoading(true);
      setError(null); // Limpiar errores anteriores al recargar
      const result = await fetchInvoices();
      setData(result);
    } catch (err) {
      // Normalizar el error de tipo desconocido a un mensaje string
      const message = err instanceof Error ? err.message : String(err) || "Error desconocido al recargar";
      setError(message);
      setData([]); // Vaciar la data si hay error
      throw err; // Propagar el error
    } finally {
      setLoading(false);
    }
  };

  // 2. Ejecutar la carga inicial al montar el componente
  useEffect(() => {
    loadInvoices();
  }, []);

  // 3. Devolver la función de carga como refetch
  return {
    data,
    loading,
    error,
    refetch: loadInvoices, // <-- ¡ESTE ES EL CAMBIO CLAVE!
  };
}