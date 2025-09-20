'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import { storefront, GET_PRODUCTS_QUERY, isDemo } from '@/lib/shopify'
import { useCart } from '@/contexts/CartContext'

interface Product {
  id: string
  title: string
  description: string
  handle: string
  images: Array<{
    url: string
    altText?: string
  }>
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  variants: Array<{
    id: string
    availableForSale: boolean
  }>
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    async function fetchProducts() {
      if (isDemo || !storefront) {
        // Demo mode - use fallback data
        setProducts([
          {
            id: '1',
            title: 'ワイヤレスヘッドフォン',
            description: '高音質のワイヤレスヘッドフォン',
            handle: 'wireless-headphones',
            images: [{ url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', altText: 'Wireless Headphones' }],
            priceRange: { minVariantPrice: { amount: '15000', currencyCode: 'JPY' } },
            variants: [{ id: '1', availableForSale: true }]
          },
          {
            id: '2',
            title: 'スマートウォッチ',
            description: '健康管理機能付きスマートウォッチ',
            handle: 'smartwatch',
            images: [{ url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', altText: 'Smartwatch' }],
            priceRange: { minVariantPrice: { amount: '25000', currencyCode: 'JPY' } },
            variants: [{ id: '2', availableForSale: true }]
          },
          {
            id: '3',
            title: 'カジュアルTシャツ',
            description: 'オーガニックコットン製Tシャツ',
            handle: 'casual-tshirt',
            images: [{ url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', altText: 'Casual T-shirt' }],
            priceRange: { minVariantPrice: { amount: '3500', currencyCode: 'JPY' } },
            variants: [{ id: '3', availableForSale: true }]
          },
          {
            id: '4',
            title: 'デスクライト',
            description: '目に優しいLEDデスクライト',
            handle: 'desk-lamp',
            images: [{ url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', altText: 'Desk Lamp' }],
            priceRange: { minVariantPrice: { amount: '8000', currencyCode: 'JPY' } },
            variants: [{ id: '4', availableForSale: true }]
          }
        ])
        setLoading(false)
        return
      }

      try {
        const response = await storefront.request(GET_PRODUCTS_QUERY, {
          variables: { first: 8 }
        })
        
        if ((response as any).data?.products?.edges) {
          const productsData = (response as any).data.products.edges.map((edge: any) => edge.node)
          setProducts(productsData)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
        // Fallback data for demo
        setProducts([
          {
            id: '1',
            title: 'ワイヤレスヘッドフォン',
            description: '高音質のワイヤレスヘッドフォン',
            handle: 'wireless-headphones',
            images: [{ url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', altText: 'Wireless Headphones' }],
            priceRange: { minVariantPrice: { amount: '15000', currencyCode: 'JPY' } },
            variants: [{ id: '1', availableForSale: true }]
          },
          {
            id: '2',
            title: 'スマートウォッチ',
            description: '健康管理機能付きスマートウォッチ',
            handle: 'smartwatch',
            images: [{ url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', altText: 'Smartwatch' }],
            priceRange: { minVariantPrice: { amount: '25000', currencyCode: 'JPY' } },
            variants: [{ id: '2', availableForSale: true }]
          },
          {
            id: '3',
            title: 'カジュアルTシャツ',
            description: 'オーガニックコットン製Tシャツ',
            handle: 'casual-tshirt',
            images: [{ url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', altText: 'Casual T-shirt' }],
            priceRange: { minVariantPrice: { amount: '3500', currencyCode: 'JPY' } },
            variants: [{ id: '3', availableForSale: true }]
          },
          {
            id: '4',
            title: 'デスクライト',
            description: '目に優しいLEDデスクライト',
            handle: 'desk-lamp',
            images: [{ url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', altText: 'Desk Lamp' }],
            priceRange: { minVariantPrice: { amount: '8000', currencyCode: 'JPY' } },
            variants: [{ id: '4', availableForSale: true }]
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    const variant = product.variants[0]
    if (variant && variant.availableForSale) {
      addItem({
        id: product.id,
        title: product.title,
        price: parseFloat(product.priceRange.minVariantPrice.amount),
        quantity: 1,
        image: product.images[0]?.url,
        variantId: variant.id
      })
    }
  }

  const formatPrice = (amount: string, currencyCode: string) => {
    const price = parseFloat(amount)
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: currencyCode === 'JPY' ? 'JPY' : 'USD',
    }).format(price)
  }

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">おすすめ商品</h2>
            <p className="text-gray-600">厳選された人気商品をご紹介</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-64 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">おすすめ商品</h2>
          <p className="text-gray-600">厳選された人気商品をご紹介</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card group hover:shadow-lg transition-shadow duration-300">
              <div className="relative overflow-hidden">
                <Link href={`/products/${product.handle}`}>
                  <Image
                    src={product.images[0]?.url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'}
                    alt={product.images[0]?.altText || product.title}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </Link>
                
                {/* Wishlist button */}
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
                </button>

                {/* Quick add to cart */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-white bg-opacity-95 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>カートに追加</span>
                  </button>
                </div>
              </div>

              <div className="p-4">
                <Link href={`/products/${product.handle}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {product.title}
                  </h3>
                </Link>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">(4.5)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary-600">
                    {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
                  </span>
                  
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    product.variants[0]?.availableForSale 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.variants[0]?.availableForSale ? '在庫あり' : '売り切れ'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products" className="btn-primary">
            すべての商品を見る
          </Link>
        </div>
      </div>
    </section>
  )
}
