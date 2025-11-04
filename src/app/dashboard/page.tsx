"use client"
import FileUpload from '@/components/layout/dashboard/main/FileUpload'
import React, { useState } from 'react'

export default function Page() {
  const [fileData, setFileData] = useState<File | null>(null)

  return fileData == null ? (
    <FileUpload setFileData={setFileData} />
  ) : (
    <div>Dashboard Page</div>
  )
}
