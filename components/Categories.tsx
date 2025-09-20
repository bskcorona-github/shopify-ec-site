'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { storefront, GET_COLLECTIONS_QUERY, isDemo } from '@/lib/shopify'

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

export function Categories() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCollections() {
      if (isDemo || !storefront) {
        // Demo mode - use fallback data
        setCollections([
          {
            id: '1',
            title: 'エレクトロニクス',
            description: '最新のテクノロジー製品',
            handle: 'electronics',
            image: {
              url: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
              altText: 'Electronics'
            }
          },
          {
            id: '2',
            title: 'ファッション',
            description: 'トレンドのファッションアイテム',
            handle: 'fashion',
            image: {
              url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
              altText: 'Fashion'
            }
          },
          {
            id: '3',
            title: 'ホーム&ガーデン',
            description: 'おしゃれなインテリア用品',
            handle: 'home-garden',
            image: {
              url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
              altText: 'Home & Garden'
            }
          },
          {
            id: '4',
            title: 'スポーツ&アウトドア',
            description: 'アクティブなライフスタイル',
            handle: 'sports-outdoor',
            image: {
              url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
              altText: 'Sports & Outdoor'
            }
          },
          {
            id: '5',
            title: 'ビューティー',
            description: '美しさを追求する商品',
            handle: 'beauty',
            image: {
              url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
              altText: 'Beauty'
            }
          },
          {
            id: '6',
            title: '本&メディア',
            description: '知識とエンターテイメント',
            handle: 'books-media',
            image: {
              url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
              altText: 'Books & Media'
            }
          }
        ])
        setLoading(false)
        return
      }

      try {
        const response = await storefront.request(GET_COLLECTIONS_QUERY, {
          variables: { first: 6 }
        })
        
        if (response.data?.collections?.edges) {
          const collectionsData = response.data.collections.edges.map((edge: any) => edge.node)
          setCollections(collectionsData)
        }
      } catch (error) {
        console.error('Error fetching collections:', error)
        // Fallback data for demo
        setCollections([
          {
            id: '1',
            title: 'エレクトロニクス',
            description: '最新のテクノロジー製品',
            handle: 'electronics',
            image: {
              url: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
              altText: 'Electronics'
            }
          },
          {
            id: '2',
            title: 'ファッション',
            description: 'トレンドのファッションアイテム',
            handle: 'fashion',
            image: {
              url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
              altText: 'Fashion'
            }
          },
          {
            id: '3',
            title: 'ホーム&ガーデン',
            description: 'おしゃれなインテリア用品',
            handle: 'home-garden',
            image: {
              url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
              altText: 'Home & Garden'
            }
          },
          {
            id: '4',
            title: 'スポーツ&アウトドア',
            description: 'アクティブなライフスタイル',
            handle: 'sports-outdoor',
            image: {
              url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
              altText: 'Sports & Outdoor'
            }
          },
          {
            id: '5',
            title: 'ビューティー',
            description: '美しさを追求する商品',
            handle: 'beauty',
            image: {
              url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
              altText: 'Beauty'
            }
          },
          {
            id: '6',
            title: '本&メディア',
            description: '知識とエンターテイメント',
            handle: 'books-media',
            image: {
              url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
              altText: 'Books & Media'
            }
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">カテゴリー</h2>
            <p className="text-gray-600">お好みのカテゴリーから商品を探してみてください</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">カテゴリー</h2>
          <p className="text-gray-600">お好みのカテゴリーから商品を探してみてください</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="card group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={collection.image?.url || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'}
                  alt={collection.image?.altText || collection.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {collection.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {collection.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/collections" className="btn-primary">
            すべてのカテゴリーを見る
          </Link>
        </div>
      </div>
    </section>
  )
}
