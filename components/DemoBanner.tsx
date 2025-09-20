import { AlertCircle } from 'lucide-react'

export function DemoBanner() {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <strong>デモモード:</strong> このサイトはデモ用のサンプルデータを使用しています。
            実際のShopifyストアに接続するには、環境変数を設定してください。
          </p>
        </div>
      </div>
    </div>
  )
}
