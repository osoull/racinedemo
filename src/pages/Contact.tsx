import React from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import Newsletter from '../components/Newsletter';
import { formatPhoneNumber } from '../utils/formatters';

export default function Contact() {
  const phoneNumber = '+966112452116';
  const formattedPhone = formatPhoneNumber(phoneNumber);

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Hero Section */}
      <div className="relative bg-[#2B227C] text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
            alt="Riyadh Skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2B227C]/95 to-[#2B227C]/80"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">تواصل معنا في أي وقت</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            يسعدنا تواصلك مع ممثلين خدمة العملاء
          </p>
        </div>
      </div>

      {/* Contact Information & Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-[#2B227C] mb-8">معلومات التواصل</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#2B227C]/10 p-3 rounded-xl">
                  <MapPin className="h-6 w-6 text-[#2B227C]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">العنوان</h3>
                  <p className="text-gray-600">
                    مركز الملك عبدالله المالي<br />
                    مبنى 4.07، الطابق السابع<br />
                    شارع الابتكار، العقيق<br />
                    الرياض 13519<br />
                    المملكة العربية السعودية
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#2B227C]/10 p-3 rounded-xl">
                  <Phone className="h-6 w-6 text-[#2B227C]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">الهاتف</h3>
                  <a href={`tel:${phoneNumber}`} className="text-gray-600 hover:text-[#E63946] font-mono">
                    {formattedPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#2B227C]/10 p-3 rounded-xl">
                  <Mail className="h-6 w-6 text-[#2B227C]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">البريد الإلكتروني</h3>
                  <a href="mailto:info@racine.sa" className="text-gray-600 hover:text-[#E63946]">
                    info@racine.sa
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#2B227C]/10 p-3 rounded-xl">
                  <Clock className="h-6 w-6 text-[#2B227C]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">ساعات العمل</h3>
                  <p className="text-gray-600">
                    الأحد - الخميس: 9:00 صباحاً - 5:00 مساءً
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.5486620204766!2d46.6772!3d24.7708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0x5f5e8e33c8c7c56b!2sKing%20Abdullah%20Financial%20District!5e0!3m2!1sen!2ssa!4v1645454545454!5m2!1sen!2ssa"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '0.75rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقعنا"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-[#2B227C] mb-8">هل لديك أي أسئلة؟</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2B227C] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2B227C] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الموضوع
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2B227C] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الرسالة
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2B227C] focus:border-transparent"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#2B227C] text-white px-8 py-3 rounded-lg hover:bg-[#1a1648] transition-colors"
              >
                <Send className="h-5 w-5" />
                <span>إرسال الرسالة</span>
              </button>

              <p className="text-sm text-gray-500 text-center">
                في حال كان لديك سؤالاً جديداً فنرجو استخدام النموذج بمشاركتنا به وسنقوم بالإجابة عليه في أقرب فرصة
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
}