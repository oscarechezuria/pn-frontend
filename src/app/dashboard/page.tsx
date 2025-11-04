"use client"
import FileUpload from '@/components/layout/dashboard/main/FileUpload'
import React, { useState } from 'react'

export default function Page() {

  const [Data] = useState(null)

  
  return Data == null ? 
   (
    <FileUpload/>     
    )
  :
    (
      <div>Dashboard Page</div>
    )

}
