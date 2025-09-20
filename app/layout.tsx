import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CartProvider } from '@/contexts/CartContext'
import { DemoBanner } from '@/components/DemoBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shopify EC Store',
  description: 'Modern e-commerce store built with Shopify and Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <DemoBanner />
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
