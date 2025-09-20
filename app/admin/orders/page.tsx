'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, Package, Truck, CheckCircle, Clock } from 'lucide-react'

export default function OrderManagement() {
  const router = useRouter()
  const [selectedStatus, setSelectedStatus] = useState('all')

  // サンプル注文データ
  const [orders] = useState([
    {
      id: 'ORD-001',
      customer: '田中太郎',
      email: 'tanaka@example.com',
      amount: '¥15,000',
      status: '処理中',
      date: '2024-01-20',
      items: ['ワイヤレスヘッドフォン', 'スマートウォッチ']
    },
    {
      id: 'ORD-002',
      customer: '佐藤花子',
      email: 'sato@example.com',
      amount: '¥8,500',
      status: '配送中',
      date: '2024-01-19',
      items: ['カジュアルTシャツ', 'デスクライト']
    },
    {
      id: 'ORD-003',
      customer: '鈴木一郎',
      email: 'suzuki@example.com',
      amount: '¥12,000',
      status: '完了',
      date: '2024-01-18',
      items: ['ワイヤレスヘッドフォン']
    },
    {
      id: 'ORD-004',
      customer: '高橋美咲',
      email: 'takahashi@example.com',
      amount: '¥25,000',
      status: '新規',
      date: '2024-01-21',
      items: ['スマートウォッチ', 'デスクライト']
    }
  ])

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '新規':
        return <Clock className="h-5 w-5 text-blue-500" />
      case '処理中':
        return <Package className="h-5 w-5 text-yellow-500" />
      case '配送中':
        return <Truck className="h-5 w-5 text-blue-500" />
      case '完了':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '新規':
        return 'bg-blue-100 text-blue-800'
      case '処理中':
        return 'bg-yellow-100 text-yellow-800'
      case '配送中':
        return 'bg-blue-100 text-blue-800'
      case '完了':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

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
              <h1 className="text-2xl font-bold text-gray-900">注文管理</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Status Filter */}
          <div className="mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedStatus === 'all'
                    ? 'bg-primary-100 text-primary-800'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                すべて ({orders.length})
              </button>
              <button
                onClick={() => setSelectedStatus('新規')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedStatus === '新規'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                新規 ({orders.filter(o => o.status === '新規').length})
              </button>
              <button
                onClick={() => setSelectedStatus('処理中')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedStatus === '処理中'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                処理中 ({orders.filter(o => o.status === '処理中').length})
              </button>
              <button
                onClick={() => setSelectedStatus('配送中')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedStatus === '配送中'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                配送中 ({orders.filter(o => o.status === '配送中').length})
              </button>
              <button
                onClick={() => setSelectedStatus('完了')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedStatus === '完了'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                完了 ({orders.filter(o => o.status === '完了').length})
              </button>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                注文一覧 ({filteredOrders.length}件)
              </h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <li key={order.id}>
                  <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getStatusIcon(order.status)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            注文 #{order.id}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.customer} ({order.email}) • {order.date}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            商品: {order.items.join(', ')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            {order.amount}
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <Eye className="h-5 w-5" />
                          </button>
                          {order.status !== '完了' && (
                            <button className="text-green-600 hover:text-green-900">
                              <CheckCircle className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Statistics */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        新規注文
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {orders.filter(o => o.status === '新規').length}
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
                    <Package className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        処理中
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {orders.filter(o => o.status === '処理中').length}
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
                    <Truck className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        配送中
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {orders.filter(o => o.status === '配送中').length}
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
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        完了
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {orders.filter(o => o.status === '完了').length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
