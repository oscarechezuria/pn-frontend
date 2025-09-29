import React from 'react'

export default function Main({ children } : { children: React.ReactNode }) {
  return (
    <main className="flex-1 p-6 bg-white rounded-lg mb-4">
        {children}
    </main>
  )
}
