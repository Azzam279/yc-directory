import { Suspense } from "react"
import Navbar from "@/components/Navbar"
import Provider from '@/components/Provider'

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <Provider>
        <Navbar />

        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </Provider>
    </main>
  )
}
