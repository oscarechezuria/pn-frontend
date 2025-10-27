"use client"

import { useState, useRef, type DragEvent, type ChangeEvent } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function FileUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      setFile(files[0])
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setFile(files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative w-full p-12 rounded-2xl border-2 border-dashed
          transition-all duration-300 cursor-pointer flex items-center justify-center h-full
          ${
            file
              ? "bg-blue-50 border-blue-400 text-white"
              : isDragging
                ? "bg-blue-50 border-blue-400 scale-105"
                : "bg-white border-slate-300 hover:border-blue-400 hover:bg-blue-50"
          }
        `}
      >
        <Input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" />

        <div className="flex flex-col items-center gap-4">
          <div
            className={`
            p-4 rounded-full transition-colors
            ${file ? "bg-blue-700" : "bg-blue-100"}
          `}
          >
            <Upload className={`w-8 h-8 ${file ? "text-white" : "text-blue-600"}`} />
          </div>

          <div className="text-center">
            <p className={`text-lg font-semibold mb-2 ${file ? "text-blue-600" : "text-slate-700"}`}>
              {file ? file.name : "Arrastra y suelta tu archivo"}
            </p>
            <p className={`text-sm ${file ? "text-blue-400" : "text-slate-500"}`}>
              {file ? `Tamaño: ${(file.size / 1024).toFixed(2)} KB` : "o haz clic para seleccionar"}
            </p>
          </div>


          {file && (
            <div className="flex flex-col gap-2">
              <Button 
                onClick={(e) => {
                  e.stopPropagation()
                  alert("Procesando archivo...")
                }}
                className="bg-blue-300 hover:bg-blue-400/70 text-blue-700 cursor-pointer">
                Procesar Data
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  setFile(null)
                  if (fileInputRef.current) {
                    fileInputRef.current.value = ""
                  }
                }}
                className="mt-2 px-4 py-2 bg-red-300 hover:bg-red-400/70 text-red-700 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                Eliminar archivo  
              </Button>
            </div>
          )}
        </div>
      </div>
  )
}
