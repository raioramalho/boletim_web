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
      <span className="flex flex-row justify-center text-gray-500 dark:text-gray-900">
        Copyright © 2023 Alan Ramalho. Todos os direitos reservados. Contato:
        ramalho.sit@gmail.com
      </span>
    </html>
  );
}
