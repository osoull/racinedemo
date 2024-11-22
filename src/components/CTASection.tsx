import React from 'react';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2B227C] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            ابدأ رحلة الاستثمار مع رسين
          </h2>
          <Link 
            to="/login"
            className="inline-block bg-white text-[#2B227C] px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            افتح حساب الآن
          </Link>
        </div>
      </div>
    </section>
  );
}