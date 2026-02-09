import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Foster Care Dashboard',
  description: 'Visualizing foster care data across United States',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
