'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react'

export default function ProductManagement() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  // サンプル商品データ
  const [products] = useState([
    {
      id: '1',
      name: 'ワイヤレスヘッドフォン',
      price: '¥15,000',
      category: 'エレクトロニクス',
      stock: 25,
      status: '販売中',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
    },
    {
      id: '2',
      name: 'スマートウォッチ',
      price: '¥25,000',
      category: 'エレクトロニクス',
      stock: 12,
      status: '販売中',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop'
    },
    {
      id: '3',
      name: 'カジュアルTシャツ',
      price: '¥3,500',
      category: 'ファッション',
      stock: 0,
      status: '在庫切れ',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop'
    },
    {
      id: '4',
      name: 'デスクライト',
      price: '¥8,000',
      category: 'ホーム&ガーデン',
      stock: 8,
      status: '販売中',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    }
  ])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/admin')}
                className="text-gray-500 hover:text-gray-700 mr-4"
              >
                ← 管理画面に戻る
              </button>
              <h1 className="text-2xl font-bold text-gray-900">商品管理</h1>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>商品を追加</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Search and Filter */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="商品名またはカテゴリーで検索..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              <button className="btn-secondary flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>フィルター</span>
              </button>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                商品一覧 ({filteredProducts.length}件)
              </h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <li key={product.id}>
                  <div className="px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-16">
                        <img
                          className="h-16 w-16 rounded-lg object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.category} • 在庫: {product.stock}個
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {product.price}
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.status === '販売中' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.status}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Add Product Form Modal */}
          {showAddForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    新しい商品を追加
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        商品名
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="商品名を入力"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        価格
                      </label>
                      <input
                        type="number"
                        className="input-field"
                        placeholder="価格を入力"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        カテゴリー
                      </label>
                      <select className="input-field">
                        <option>エレクトロニクス</option>
                        <option>ファッション</option>
                        <option>ホーム&ガーデン</option>
                        <option>スポーツ&アウトドア</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        在庫数
                      </label>
                      <input
                        type="number"
                        className="input-field"
                        placeholder="在庫数を入力"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        商品説明
                      </label>
                      <textarea
                        className="input-field"
                        rows={3}
                        placeholder="商品説明を入力"
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="btn-secondary"
                      >
                        キャンセル
                      </button>
                      <button
                        type="submit"
                        className="btn-primary"
                      >
                        商品を追加
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
