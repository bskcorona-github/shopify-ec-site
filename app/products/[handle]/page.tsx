'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart, Star, ArrowLeft, Minus, Plus, CheckCircle } from 'lucide-react'
import { storefront, GET_PRODUCT_QUERY, isDemo } from '@/lib/shopify'
import { useCart } from '@/contexts/CartContext'

interface ProductVariant {
  id: string
  title: string
  availableForSale: boolean
  price: {
    amount: string
    currencyCode: string
  }
  selectedOptions: Array<{
    name: string
    value: string
  }>
}

interface Product {
  id: string
  title: string
  description: string
  handle: string
  images: Array<{
    url: string
    altText?: string
  }>
  variants: Array<ProductVariant>
  options: Array<{
    name: string
    values: string[]
  }>
}

export default function ProductPage() {
  const params = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    async function fetchProduct() {
      if (isDemo || !storefront) {
        // Demo mode - use fallback data
        setProduct({
          id: '1',
          title: 'ワイヤレスヘッドフォン',
          description: '高音質のワイヤレスヘッドフォン。ノイズキャンセリング機能付きで、どこでも快適に音楽をお楽しみいただけます。',
          handle: 'wireless-headphones',
          images: [
            { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop', altText: 'Wireless Headphones' },
            { url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop', altText: 'Wireless Headphones Side' },
            { url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop', altText: 'Wireless Headphones Detail' }
          ],
          variants: [
            {
              id: '1',
              title: 'Default Title',
              availableForSale: true,
              price: { amount: '15000', currencyCode: 'JPY' },
              selectedOptions: []
            }
          ],
          options: []
        })
        setSelectedVariant({
          id: '1',
          title: 'Default Title',
          availableForSale: true,
          price: { amount: '15000', currencyCode: 'JPY' },
          selectedOptions: []
        })
        setLoading(false)
        return
      }

      try {
        const response = await storefront.request(GET_PRODUCT_QUERY, {
          variables: { handle: params.handle }
        })
        
        if ((response as any).data?.product) {
          const productData = (response as any).data.product
          setProduct(productData)
          if (productData.variants.edges.length > 0) {
            setSelectedVariant(productData.variants.edges[0].node)
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        // Fallback data for demo
        setProduct({
          id: '1',
          title: 'ワイヤレスヘッドフォン',
          description: '高音質のワイヤレスヘッドフォン。ノイズキャンセリング機能付きで、どこでも快適に音楽をお楽しみいただけます。',
          handle: 'wireless-headphones',
          images: [
            { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop', altText: 'Wireless Headphones' },
            { url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop', altText: 'Wireless Headphones Side' },
            { url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop', altText: 'Wireless Headphones Detail' }
          ],
          variants: [
            {
              id: '1',
              title: 'Default Title',
              availableForSale: true,
              price: { amount: '15000', currencyCode: 'JPY' },
              selectedOptions: []
            }
          ],
          options: []
        })
        setSelectedVariant({
          id: '1',
          title: 'Default Title',
          availableForSale: true,
          price: { amount: '15000', currencyCode: 'JPY' },
          selectedOptions: []
        })
      } finally {
        setLoading(false)
      }
    }

    if (params.handle) {
      fetchProduct()
    }
  }, [params.handle])

  const handleAddToCart = () => {
    if (selectedVariant && product) {
      addItem({
        id: product.id,
        title: product.title,
        price: parseFloat(selectedVariant.price.amount),
        quantity,
        image: product.images[0]?.url,
        variantId: selectedVariant.id
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-32 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-300 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">商品が見つかりません</h1>
          <Link href="/products" className="btn-primary">
            商品一覧に戻る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <Link href="/products" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
        <ArrowLeft className="h-5 w-5 mr-2" />
        商品一覧に戻る
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.images[selectedImageIndex]?.url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop'}
              alt={product.images[selectedImageIndex]?.altText || product.title}
              width={800}
              height={800}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
          
          {/* Thumbnail images */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${
                    selectedImageIndex === index ? 'border-primary-500' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.altText || product.title}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">(4.5) レビュー 128件</span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-primary-600 mb-6">
              {selectedVariant && formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">商品説明</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">数量:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
                className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>カートに追加</span>
              </button>
              
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
              </button>
            </div>

            {!selectedVariant?.availableForSale && (
              <p className="text-red-600 text-sm">この商品は現在在庫切れです</p>
            )}
          </div>

          {/* Features */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">商品の特徴</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                高品質な音質
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                長時間バッテリー
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                ノイズキャンセリング
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                1年間保証
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
