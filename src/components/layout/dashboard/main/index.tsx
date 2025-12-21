import React from "react"

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 overflow-auto bg-white rounded-lg mb-4 min-h-0">
      {children}
    </main>
  )
}
