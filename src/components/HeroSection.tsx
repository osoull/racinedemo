import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-90"
        >
          <source 
            src="//8fefc08ff6352b1f82851d81737a6460.cdn.bubble.io/f1729676441038x966784396947765400/HD_1104677421.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            استثمر في<br />مستقبلك الآن
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            منصة رسين تقدم فرصاً استثمارية متنوعة ومتوافقة مع الشريعة الإسلامية بعوائد مجزية تصل إلى 18% سنوياً
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/login"
              className="bg-[#E63946] text-white px-8 py-4 rounded-xl hover:bg-[#E63946]/90 transition-colors text-lg font-medium text-center"
            >
              ابدأ الاستثمار
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-white" />
              <span className="text-sm text-white">مرخصة من ساما</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-white" />
              <span className="text-sm text-white">متوافقة مع الشريعة</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}