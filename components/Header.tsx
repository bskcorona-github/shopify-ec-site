'use client'

import Link from 'next/link'
import { ShoppingCart, Search, Menu, User } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useState } from 'react'

export function Header() {
  const { state } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              ECStore
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              ホーム
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              商品一覧
            </Link>
            <Link href="/collections" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              カテゴリー
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              会社概要
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                placeholder="商品を検索..."
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <User className="h-6 w-6" />
            </button>
            
            <Link href="/cart" className="relative p-2 text-gray-400 hover:text-gray-500">
              <ShoppingCart className="h-6 w-6" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-gray-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium">
                ホーム
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium">
                商品一覧
              </Link>
              <Link href="/collections" className="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium">
                カテゴリー
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium">
                会社概要
              </Link>
            </div>
            
            {/* Mobile search */}
            <div className="px-2 pb-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="商品を検索..."
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
