import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            最高品質の商品を
            <br />
            <span className="text-primary-200">お手頃価格</span>で
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
            モダンで使いやすいECサイトで、あなたのライフスタイルに合った商品を見つけましょう。
            無料配送、簡単返品、24時間サポートで安心してお買い物をお楽しみください。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/products" className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3 flex items-center space-x-2">
              <span>商品を見る</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <Link href="/collections" className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-3">
              カテゴリー別
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-white bg-opacity-20 rounded-full p-3 mb-3">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">高品質保証</h3>
              <p className="text-primary-200 text-sm">厳選された商品のみを取り扱い</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-white bg-opacity-20 rounded-full p-3 mb-3">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">無料配送</h3>
              <p className="text-primary-200 text-sm">5,000円以上のご注文で配送料無料</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-white bg-opacity-20 rounded-full p-3 mb-3">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">24時間サポート</h3>
              <p className="text-primary-200 text-sm">いつでもお気軽にお問い合わせください</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-white bg-opacity-10 rounded-full"></div>
      </div>
    </section>
  )
}
