import React, {useState} from 'react'
import {Button} from '@/components/ui/button'
import { Users, UserCheck, UserX } from "lucide-react";



export default function LeftContent({pathname}: {pathname?: string}) {

  // Datos de ejemplo para los cards de clientes

  const clientesData = [
  { codigo: "C001", nombre: "Acme Corporation", dias: 30, region: "Norte", vendedor: "Juan Pérez", activo: false },
  { codigo: "C002", nombre: "Global Industries", dias: 45, region: "Sur", vendedor: "María García", activo: false },
  { codigo: "C003", nombre: "Tech Solutions", dias: 60, region: "Este", vendedor: "Carlos López", activo: true },
  { codigo: "C004", nombre: "Comercial del Pacífico", dias: 30, region: "Oeste", vendedor: "Ana Martínez", activo: false },
  { codigo: "C005", nombre: "Distribuidora Central", dias: 15, region: "Centro", vendedor: "Juan Pérez", activo: true },
]
  const [clientes, setClientes] = useState(clientesData)

  // Calcular estadísticas
  const totalClientes = clientes.length
  const clientesActivos = clientes.filter((c) => c.activo).length
  const clientesInactivos = clientes.filter((c) => !c.activo).length

  const toggleClienteEstado = (codigo: string) => {
    setClientes(clientes.map((c) => (c.codigo === codigo ? { ...c, activo: !c.activo } : c)))
  }

    




  const [isOpen, setIsOpen] = useState<boolean>(false)


  if (pathname == "/dashboard") 
  return (
    <div className='gap-4 hidden lg:flex'>
        <Button className='bg-yellow-600/40 text-yellow-600 hover:bg-yellow-600/50 cursor-pointer'>Barquisimeto</Button>
        <Button className='bg-blue-300 text-blue-600 hover:bg-blue-600/40 cursor-pointer'>Portuguesa</Button>
        <Button className='bg-purple-300 text-purple-600 hover:bg-purple-600/40 cursor-pointer'>Trujillo</Button>
        <Button className='bg-green-300 text-green-600 hover:bg-green-600/40 cursor-pointer'>Caracas</Button>
    </div>
  )
    
  
  if (pathname == "/dashboard/customers") 
  return (
      <div className="flex items-center gap-3">
          {/* Card Total Clientes */}
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 h-10">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">Total:</span>
              <span className="text-sm font-bold text-foreground">{totalClientes}</span>
            </div>
          </div>

          {/* Card Clientes Activos */}
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 h-10">
            <UserCheck className="h-4 w-4 text-green-600" />
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">Activos:</span>
              <span className="text-sm font-bold text-green-600">{clientesActivos}</span>
            </div>
          </div>

          {/* Card Clientes Inactivos */}
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 h-10">
            <UserX className="h-4 w-4 text-red-600" />
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">Inactivos:</span>
              <span className="text-sm font-bold text-red-600">{clientesInactivos}</span>
            </div>
          </div>

          {/* Botón Triguer Modal */}
          <div className="hidden lg:block">
            <Button size="lg" className="bg-black text-white hover:bg-black/90 h-10 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
              <span className="truncate">Nuevo Cliente</span>
            </Button>
          </div>
        </div>
  )

  return null

}
