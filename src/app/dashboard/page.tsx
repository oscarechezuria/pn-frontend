"use client"
import FileUpload from '@/components/layout/dashboard/main/FileUpload'
import React, { useState } from 'react'

export default function page() {

  const [data, setData] = useState(null)

  
  return data == null ? 
   (
    <FileUpload/>     
    )
  :
    (
      <div>Dashboard Page</div>
    )

}
