'use client'

import { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubscribed(true)
    setIsLoading(false)
    setEmail('')
  }

  if (isSubscribed) {
    return (
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">登録完了！</h2>
            <p className="text-gray-600">
              ニュースレターの登録が完了しました。最新の商品情報やお得なキャンペーン情報をお届けします。
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-primary-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-white">
          <h2 className="text-3xl font-bold mb-4">ニュースレターに登録</h2>
          <p className="text-xl text-primary-100 mb-8">
            最新の商品情報、お得なキャンペーン、特別オファーをいち早くお届けします
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="メールアドレスを入力"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-gray-900"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="bg-white text-primary-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                ) : (
                  '登録する'
                )}
              </button>
            </div>
          </form>

          <p className="text-sm text-primary-200 mt-4">
            いつでも配信停止できます。プライバシーポリシーに同意の上、ご登録ください。
          </p>
        </div>
      </div>
    </section>
  )
}
