'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Heart, Star, ArrowLeft } from 'lucide-react'
import { storefront, GET_COLLECTION_PRODUCTS_QUERY, isDemo } from '@/lib/shopify'
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

interface Collection {
  id: string
  title: string
  description: string
  handle: string
  image?: {
    url: string
    altText?: string
  }
}

export default function CollectionPage() {
  const params = useParams()
  const handle = params.handle as string
  const [collection, setCollection] = useState<Collection | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const { addItem } = useCart()

  useEffect(() => {
    async function fetchCollectionData() {
      if (isDemo || !storefront) {
        // Demo mode - use fallback data
        const demoCollections: Record<string, Collection> = {
          'electronics': {
            id: '1',
            title: 'エレクトロニクス',
            description: '最新のテクノロジー製品',
            handle: 'electronics',
            image: {
              url: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop',
              altText: 'Electronics'
            }
          },
          'fashion': {
            id: '2',
            title: 'ファッション',
            description: 'トレンドのファッションアイテム',
            handle: 'fashion',
            image: {
              url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
              altText: 'Fashion'
            }
          },
          'home-garden': {
            id: '3',
            title: 'ホーム&ガーデン',
            description: 'おしゃれなインテリア用品',
            handle: 'home-garden',
            image: {
              url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
              altText: 'Home & Garden'
            }
          },
          'sports-outdoor': {
            id: '4',
            title: 'スポーツ&アウトドア',
            description: 'アクティブなライフスタイル',
            handle: 'sports-outdoor',
            image: {
              url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
              altText: 'Sports & Outdoor'
            }
          },
          'beauty': {
            id: '5',
            title: 'ビューティー',
            description: '美しさを追求する商品',
            handle: 'beauty',
            image: {
              url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop',
              altText: 'Beauty'
            }
          },
          'books-media': {
            id: '6',
            title: '本&メディア',
            description: '知識とエンターテイメント',
            handle: 'books-media',
            image: {
              url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
              altText: 'Books & Media'
            }
          }
        }

        const demoProducts: Record<string, Product[]> = {
          'electronics': [
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
              id: '5',
              title: 'Bluetoothスピーカー',
              description: 'ポータブルBluetoothスピーカー',
              handle: 'bluetooth-speaker',
              images: [{ url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', altText: 'Bluetooth Speaker' }],
              priceRange: { minVariantPrice: { amount: '12000', currencyCode: 'JPY' } },
              variants: [{ id: '5', availableForSale: true }]
            }
          ],
          'fashion': [
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
              id: '6',
              title: 'ランニングシューズ',
              description: '軽量ランニングシューズ',
              handle: 'running-shoes',
              images: [{ url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', altText: 'Running Shoes' }],
              priceRange: { minVariantPrice: { amount: '18000', currencyCode: 'JPY' } },
              variants: [{ id: '6', availableForSale: true }]
            }
          ],
          'home-garden': [
            {
              id: '4',
              title: 'デスクライト',
              description: '目に優しいLEDデスクライト',
              handle: 'desk-lamp',
              images: [{ url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', altText: 'Desk Lamp' }],
              priceRange: { minVariantPrice: { amount: '8000', currencyCode: 'JPY' } },
              variants: [{ id: '4', availableForSale: true }]
            }
          ],
          'sports-outdoor': [
            {
              id: '6',
              title: 'ランニングシューズ',
              description: '軽量ランニングシューズ',
              handle: 'running-shoes',
              images: [{ url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', altText: 'Running Shoes' }],
              priceRange: { minVariantPrice: { amount: '18000', currencyCode: 'JPY' } },
              variants: [{ id: '6', availableForSale: true }]
            }
          ],
          'beauty': [],
          'books-media': []
        }

        setCollection(demoCollections[handle] || null)
        setProducts(demoProducts[handle] || [])
        setLoading(false)
        return
      }

      try {
        const response = await storefront.request(GET_COLLECTION_PRODUCTS_QUERY, {
          variables: { handle, first: 20 }
        })
        
        if ((response as any).data?.collection) {
          const collectionData = (response as any).data.collection
          setCollection(collectionData)
          setProducts(collectionData.products?.edges?.map((edge: any) => edge.node) || [])
        }
      } catch (error) {
        console.error('Error fetching collection:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCollectionData()
  }, [handle])

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

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
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
      </div>
    )
  }

  if (!collection) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">カテゴリーが見つかりません</h1>
          <Link href="/collections" className="btn-primary">
            カテゴリー一覧に戻る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link href="/collections" className="inline-flex items-center text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-4 w-4 mr-2" />
          カテゴリー一覧に戻る
        </Link>
      </div>

      {/* Collection Header */}
      <div className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{collection.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{collection.description}</p>
            <div className="flex items-center space-x-4">
              <span className="text-gray-500">
                {filteredProducts.length}件の商品
              </span>
            </div>
          </div>
          {collection.image && (
            <div className="relative">
              <Image
                src={collection.image.url}
                alt={collection.image.altText || collection.title}
                width={600}
                height={400}
                className="w-full h-64 lg:h-80 object-cover rounded-lg"
                unoptimized
              />
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="商品を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
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

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">このカテゴリーに商品が見つかりませんでした</p>
          <p className="text-gray-400 text-sm mt-2">検索条件を変更してお試しください</p>
        </div>
      )}
    </div>
  )
}
