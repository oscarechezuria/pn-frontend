"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, BrushCleaning, FunnelPlus } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface CheckboxProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    ariaLabel?: string;
}

const SimpleCheckbox: React.FC<CheckboxProps> = ({ checked, onCheckedChange, ariaLabel }) => (
    <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        aria-label={ariaLabel}
        title={ariaLabel}
        className="w-4 h-4 rounded border-gray-300 cursor-pointer"
    />
);

interface Zone {
    id: string;
    name: string;
    color: string;
    subzones: string[];
}

export const ZONES: Zone[] = [
    {
        id: "barquisimeto-01",
        name: "Barquisimeto",
        color: "bg-amber-200 text-amber-900 hover:bg-amber-300",
        subzones: ["Oeste-Centro", "Este", "Este-Cabudare-Yaracuy"]
    },
    {
        id: "portuguesa-01",
        name: "Portuguesa",
        color: "bg-blue-200 text-blue-900 hover:bg-blue-300",
        subzones: ["Portuguesa"],
    },
    {
        id: "trujillo-01",
        name: "Trujillo",
        color: "bg-purple-200 text-purple-900 hover:bg-purple-300",
        subzones: ["Trujillo"],
    },
    {
        id: "caracas-01",
        name: "Caracas",
        color: "bg-green-200 text-green-900 hover:bg-green-300",
        subzones: ["Caracas"],
    },
];

interface ZonesFilterProps {
    selectedZones: string[];
    onSelectionChange: (zones: string[]) => void;
}

export default function ZonesFilter({ selectedZones, onSelectionChange }: ZonesFilterProps) {
    const [expandedZones, setExpandedZones] = useState<string[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    // Maneja el toggle de subzonas individuales
    const handleSubzoneToggle = (subzone: string): void => {
        onSelectionChange(
            selectedZones.includes(subzone)
                ? selectedZones.filter((z) => z !== subzone)
                : [...selectedZones, subzone]
        );
    };

    // Maneja el click en el botón principal de la zona
    const handleZoneButtonClick = (zone: Zone): void => {
        if (zone.subzones.length > 1) {
            // Si tiene múltiples subzonas, solo expande/contrae
            toggleExpanded(zone.id);
        } else {
            // Si tiene una sola subzona, funciona como toggle
            handleSubzoneToggle(zone.subzones[0]);
        }
    };

    const toggleExpanded = (zoneId: string): void => {
        setExpandedZones((prev) =>
            prev.includes(zoneId)
                ? prev.filter((z) => z !== zoneId)
                : [...prev, zoneId]
        );
    };

    const handleClearFilters = (): void => {
        onSelectionChange([]);
    };

    // Verifica si alguna subzona de una zona está seleccionada
    const isZoneActive = (zone: Zone): boolean => {
        return zone.subzones.some(subzone => selectedZones.includes(subzone));
    };


    const ZonesList = ({ isMobile = false }: { isMobile?: boolean }) => (
        <div className={isMobile ? "flex flex-col gap-3" : "flex gap-3"}>
            {ZONES.map((zone) => (
                <div key={zone.id} className="relative">
                    <button
                        type='button'
                        onClick={() => handleZoneButtonClick(zone)}
                        className={`px-4 py-2 text-sm rounded-full font-semibold transition-all duration-200 flex items-center cursor-pointer ${zone.color} ${isZoneActive(zone) ? "ring-2 ring-offset-2 ring-slate-400" : ""
                            } ${isMobile ? "w-full justify-between" : ""}`}
                    >
                        {zone.name}
                        {zone.subzones.length > 1 && (
                            <ChevronDown
                                size={16}
                                className={`ml-2 transition-transform ${expandedZones.includes(zone.id) ? "rotate-180" : ""}`}
                            />
                        )}
                    </button>

                    {/* Subzones expandidas */}
                    {zone.subzones.length > 1 && expandedZones.includes(zone.id) && (
                        <div
                            className={`${isMobile
                                    ? "mt-2 pl-4"
                                    : "absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg z-10 p-3 border border-slate-200 dark:border-slate-700"
                                }`}
                        >
                            {!isMobile && (
                                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 px-2">Subzonas:</p>
                            )}
                            <div className="space-y-2">
                                {zone.subzones.map((subzone) => (
                                    <label
                                        key={subzone}
                                        className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                    >
                                        <SimpleCheckbox
                                            checked={selectedZones.includes(subzone)}
                                            onCheckedChange={() => handleSubzoneToggle(subzone)}
                                            ariaLabel={`Seleccionar subzona ${subzone}`}
                                        />
                                        <span className="text-sm text-slate-600 dark:text-slate-300">{subzone}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )

    return (
        <div className="dark:bg-slate-900">
            <div className="hidden md:flex gap-2">
                <ZonesList />
                <div onClick={handleClearFilters} className="flex justify-center items-center ml-4 border border-red-100 rounded-xl py-1 px-2 cursor-pointer hover:bg-red-100 transition">
                    <BrushCleaning className="text-red-500" />
                </div>
            </div>

            <div className="md:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <button type="button" aria-label="Filtrar por zona" title="Filtrar por zona" className='bg-black p-1 rounded-md'>
                            <FunnelPlus className='text-white' />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[70vh] rounded-t-xl ">
                        <SheetHeader className="flex flex-row items-center justify-between pr-12">
                            <SheetTitle>Filtrar por zona</SheetTitle>
                            <div onClick={handleClearFilters} className="text-red-500 border border-red-100 rounded-md p-1">
                                <BrushCleaning className="h-5 w-5" />
                            </div>
                        </SheetHeader>
                        <div className="mt-6 overflow-y-auto p-2">
                            <ZonesList isMobile />
                        </div>

                        <SheetFooter>
                            <SheetClose asChild>
                                <Button variant='default' className="w-full">
                                    Cerrar
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}
