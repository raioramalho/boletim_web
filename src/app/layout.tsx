import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Boteim Interno - ECT',
  description: 'Visualizador de boletim interno do Estabelecimento Central de Transportes - Alan Ramalho',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <span className="flex flex-row justify-center text-gray-900">Alan Ramalho - ramalho.sit@gmail.com</span>
    </html>
  )
}
