import { Users, Award, Heart, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">会社概要</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          私たちは、お客様に最高品質の商品とサービスを提供することを使命としています。
          テクノロジーとイノベーションを通じて、より良いショッピング体験を創造します。
        </p>
      </div>

      {/* Mission Section */}
      <div className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">私たちのミッション</h2>
            <p className="text-gray-600 mb-6">
              お客様一人ひとりに寄り添い、ニーズに応じた商品とサービスを提供することで、
              より豊かで便利な生活をサポートします。品質、信頼性、革新性を追求し、
              持続可能なビジネスモデルを通じて社会に貢献します。
            </p>
            <p className="text-gray-600">
              私たちは単なる商品販売ではなく、お客様のライフスタイルを向上させる
              パートナーであり続けたいと考えています。
            </p>
          </div>
          <div className="bg-primary-50 rounded-lg p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="bg-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">顧客第一</h3>
                <p className="text-sm text-gray-600">お客様の満足を最優先</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">品質重視</h3>
                <p className="text-sm text-gray-600">厳選された商品のみ</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">情熱</h3>
                <p className="text-sm text-gray-600">仕事への情熱と愛情</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">革新</h3>
                <p className="text-sm text-gray-600">常に新しい挑戦</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">私たちのストーリー</h2>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">創業</h3>
                <p className="text-gray-600">
                  2020年、私たちは「より良いショッピング体験を提供したい」という想いから
                  この会社を設立しました。小さなチームから始まり、お客様の声を聞きながら
                  成長を続けています。
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">成長</h3>
                <p className="text-gray-600">
                  お客様の信頼を得るために、商品の品質管理、配送システムの改善、
                  カスタマーサービスの向上に力を注いできました。その結果、
                  多くのお客様にご愛顧いただけるようになりました。
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">未来</h3>
                <p className="text-gray-600">
                  これからも、テクノロジーを活用した革新的なサービスを提供し、
                  お客様の生活をより豊かにする商品を厳選してご紹介していきます。
                  持続可能なビジネスモデルを通じて、社会に貢献し続けます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">チーム</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">田中太郎</h3>
            <p className="text-primary-600 mb-2">CEO & 創設者</p>
            <p className="text-gray-600 text-sm">
              10年以上のEC業界経験を持つ。お客様第一の理念を掲げ、
              会社の方向性を決定しています。
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">佐藤花子</h3>
            <p className="text-primary-600 mb-2">CTO</p>
            <p className="text-gray-600 text-sm">
              最新のテクノロジーを活用し、お客様により良い体験を
              提供するシステムの開発を担当しています。
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">鈴木一郎</h3>
            <p className="text-primary-600 mb-2">マーケティング責任者</p>
            <p className="text-gray-600 text-sm">
              お客様のニーズを分析し、最適な商品とサービスを
              提供するための戦略を立案しています。
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">お問い合わせ</h2>
        <p className="text-gray-600 mb-6">
          ご質問やご要望がございましたら、お気軽にお問い合わせください。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="text-center">
            <p className="font-semibold text-gray-900">メール</p>
            <p className="text-gray-600">info@ecstore.com</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-900">電話</p>
            <p className="text-gray-600">03-1234-5678</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-900">住所</p>
            <p className="text-gray-600">東京都渋谷区1-2-3</p>
          </div>
        </div>
      </div>
    </div>
  )
}
