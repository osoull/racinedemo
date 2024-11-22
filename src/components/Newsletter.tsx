import React from 'react';
import { Mail } from 'lucide-react';

interface NewsletterProps {
  darkMode?: boolean;
}

export default function Newsletter({ darkMode = false }: NewsletterProps) {
  return (
    <div className={darkMode ? 'py-12' : 'bg-[#2B227C]/5 py-16'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center" dir="rtl">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
            darkMode ? 'bg-white/10' : 'bg-white'
          }`}>
            <Mail className={`h-8 w-8 ${darkMode ? 'text-white' : 'text-[#2B227C]'}`} />
          </div>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#2B227C]'}`}>
            اشترك في النشرة الإخبارية لرسين للاستثمار
          </h2>
          <p className={`mb-8 ${darkMode ? 'text-white/80' : 'text-gray-600'}`}>
            ابق على اطلاع بأحدث الأخبار والعروض لدينا
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="يرجى إدخال عنوان بريد إلكتروني"
              className={`flex-1 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#2B227C] focus:border-transparent outline-none text-right ${
                darkMode ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50' : 'bg-white border-gray-200 text-gray-900'
              }`}
            />
            <button
              type="submit"
              className={`px-6 py-3 rounded-lg transition-colors duration-300 whitespace-nowrap ${
                darkMode 
                  ? 'bg-white text-[#2B227C] hover:bg-white/90' 
                  : 'bg-[#2B227C] text-white hover:bg-[#1a1648]'
              }`}
            >
              اشتراك
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}