import { useState, useRef, type DragEvent, type ChangeEvent } from "react"
import { processFile } from "@/services/dashboard/fileUploadService"
import { AccountsReceivableWithCustomer } from "@/app/types/Common"
import type { QueryObserverResult } from "@tanstack/react-query"

type FileUploadProps = {
  refetch: () => Promise<QueryObserverResult<AccountsReceivableWithCustomer[], Error>>
}

export function useFileUpload({ refetch }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => fileInputRef.current?.click()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) setFile(files[0])
  }

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
    if (files && files.length > 0) setFile(files[0])
  }

  const handleProcessFile = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (!file) {
      alert("Primero selecciona un archivo")
      return
    }

    try {
      setIsLoading(true)
      const result = await processFile(file)
      if (result && result.length > 0) {
       await refetch() 
      }

    } catch (error) {
      console.error("Error al procesar el archivo:", error)
      alert("❌ Ocurrió un error al procesar el archivo")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return {
    file,
    isDragging,
    isLoading,
    fileInputRef,
    handleClick,
    handleFileChange,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleProcessFile,
    handleRemoveFile,
  }
}
