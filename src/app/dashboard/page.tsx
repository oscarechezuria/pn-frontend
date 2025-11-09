"use client"
import FileUpload from '@/components/layout/dashboard/main/FileUpload'
import React, { useState } from 'react'

export default function Page() {
  const [fileData, setFileData] = useState<[] | null>(null)

  console.log("Dashboard Page Rendered with fileData:", fileData) 

  return fileData == null ? (
    <FileUpload setFileData={setFileData} />
  ) : (
    <div>
    <div>Dashboard Page</div>
      {
        fileData.map(item => (
          <div key={Math.random()}>{JSON.stringify(item)}</div>
        ))
      }
    </div>
  )
}
