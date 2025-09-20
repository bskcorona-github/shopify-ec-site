'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

export default function CartPage() {
  const { state, updateQuantity, removeItem, clearCart } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(price)
  }

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">カートが空です</h1>
          <p className="text-gray-600 mb-8">お気に入りの商品をカートに追加してみてください</p>
          <Link href="/products" className="btn-primary">
            商品を見る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700">
          <ArrowLeft className="h-5 w-5 mr-2" />
          ショッピングを続ける
        </Link>
        
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          カートを空にする
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">ショッピングカート</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {state.items.map((item) => (
              <div key={item.id} className="card p-6">
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <Image
                      src={item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop'}
                      alt={item.title}
                      width={150}
                      height={150}
                      className="w-24 h-24 object-cover rounded-lg"
                      unoptimized
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      単価: {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">注文概要</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">小計 ({state.itemCount}点)</span>
                <span className="font-medium">{formatPrice(state.total)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">配送料</span>
                <span className="font-medium">
                  {state.total >= 5000 ? '無料' : formatPrice(500)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">消費税</span>
                <span className="font-medium">{formatPrice(state.total * 0.1)}</span>
              </div>
              
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>合計</span>
                  <span className="text-primary-600">
                    {formatPrice(state.total + (state.total >= 5000 ? 0 : 500) + state.total * 0.1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="w-full btn-primary text-center block mb-4"
            >
              レジに進む
            </Link>

            {/* Free Shipping Notice */}
            {state.total < 5000 && (
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
                <p className="text-sm text-primary-800">
                  あと {formatPrice(5000 - state.total)} で配送料無料！
                </p>
              </div>
            )}

            {/* Security Notice */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                🔒 安全な決済で保護されています
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
