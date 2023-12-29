import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const urbanist = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dash of PDF',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <Toaster position="top-right"/>
        {children}
      </body>
    </html>
  )
}
