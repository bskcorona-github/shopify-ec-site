'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Package, ShoppingCart, Users, BarChart3, Settings } from 'lucide-react'

export default function AdminLogin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 簡単なパスワード認証（本番では適切な認証システムを使用）
    if (password === 'admin123') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('パスワードが正しくありません')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Lock className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            管理画面ログイン
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ECサイト管理システム
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  パスワード
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    placeholder="パスワードを入力"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center">
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full btn-primary"
                >
                  ログイン
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">デモ用</span>
                </div>
              </div>
              <div className="mt-6 text-center text-sm text-gray-500">
                デモパスワード: <code className="bg-gray-100 px-2 py-1 rounded">admin123</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">管理画面</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="text-gray-500 hover:text-gray-700"
              >
                サイトに戻る
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="btn-secondary"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Dashboard */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Package className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        総商品数
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        24
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ShoppingCart className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        今日の注文
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        8
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BarChart3 className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        今月の売上
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        ¥125,000
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">クイックアクション</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => router.push('/admin/products')}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-left"
              >
                <Package className="h-8 w-8 text-primary-600 mb-2" />
                <h3 className="font-medium text-gray-900">商品管理</h3>
                <p className="text-sm text-gray-500 mt-1">商品の追加・編集・削除</p>
              </button>

              <button
                onClick={() => router.push('/admin/orders')}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-left"
              >
                <ShoppingCart className="h-8 w-8 text-primary-600 mb-2" />
                <h3 className="font-medium text-gray-900">注文管理</h3>
                <p className="text-sm text-gray-500 mt-1">注文の確認・処理</p>
              </button>

              <button
                onClick={() => router.push('/admin/customers')}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-left"
              >
                <Users className="h-8 w-8 text-primary-600 mb-2" />
                <h3 className="font-medium text-gray-900">顧客管理</h3>
                <p className="text-sm text-gray-500 mt-1">顧客情報の管理</p>
              </button>

              <button
                onClick={() => router.push('/admin/settings')}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-left"
              >
                <Settings className="h-8 w-8 text-primary-600 mb-2" />
                <h3 className="font-medium text-gray-900">設定</h3>
                <p className="text-sm text-gray-500 mt-1">サイト設定・管理</p>
              </button>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">最近の注文</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {[
                  { id: '1', customer: '田中太郎', amount: '¥15,000', status: '処理中', date: '2024-01-20' },
                  { id: '2', customer: '佐藤花子', amount: '¥8,500', status: '配送中', date: '2024-01-19' },
                  { id: '3', customer: '鈴木一郎', amount: '¥12,000', status: '完了', date: '2024-01-18' },
                ].map((order) => (
                  <li key={order.id}>
                    <div className="px-4 py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {order.customer.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {order.customer}
                          </div>
                          <div className="text-sm text-gray-500">
                            注文 #{order.id} • {order.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-900">
                          {order.amount}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === '完了' ? 'bg-green-100 text-green-800' :
                          order.status === '配送中' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
