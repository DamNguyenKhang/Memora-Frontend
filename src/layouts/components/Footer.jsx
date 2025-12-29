import { BookOpen, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl text-white">FlashLearn</span>
            </div>
            <p className="text-sm mb-4">
              Học thông minh hơn với phương pháp flashcard được khoa học chứng minh.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white mb-4">Sản phẩm</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Tạo flashcard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Thư viện</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ứng dụng mobile</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Giá cả</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white mb-4">Về chúng tôi</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Giới thiệu</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Nghiên cứu</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tuyển dụng</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Trung tâm trợ giúp</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Điều khoản</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>© 2025 FlashLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
