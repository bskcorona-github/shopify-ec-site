import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">ECStore</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              高品質な商品をお手頃な価格でお届けする、モダンなECサイトです。
              お客様の満足を第一に、常に新しい商品とサービスを提供しています。
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">info@ecstore.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">03-1234-5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">東京都渋谷区1-2-3</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">クイックリンク</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  会社概要
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  よくある質問
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-white transition-colors">
                  配送について
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">カスタマーサービス</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-white transition-colors">
                  返品・交換
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-300 hover:text-white transition-colors">
                  サイズガイド
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Media */}
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>

            {/* Newsletter */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">ニュースレター:</span>
              <input
                type="email"
                placeholder="メールアドレス"
                className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <button className="btn-primary text-sm py-1 px-3">
                登録
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 ECStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
