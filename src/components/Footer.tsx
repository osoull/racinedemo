import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { formatPhoneNumber } from '../utils/formatters';

interface FooterProps {
  minimal?: boolean;
}

export default function Footer({ minimal = false }: FooterProps) {
  const phoneNumber = '+966112452116';

  if (minimal) {
    return (
      <footer className="bg-[#2B227C] py-4" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <img 
              src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F8fefc08ff6352b1f82851d81737a6460.cdn.bubble.io%2Ff1729676645537x190880546208797250%2Flogo-horizontal-full.png"
              alt="رسين للاستثمار"
              className="h-40 w-auto brightness-0 invert"
            />
            <p className="text-xs text-white/60">
              © {new Date().getFullYear()} رسين للاستثمار. جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[#2B227C] pt-12 pb-6" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Logo and Social */}
          <div className="md:col-span-4">
            <img 
              src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F8fefc08ff6352b1f82851d81737a6460.cdn.bubble.io%2Ff1729676645537x190880546208797250%2Flogo-horizontal-full.png"
              alt="رسين للاستثمار"
              className="h-40 w-auto brightness-0 invert mb-6"
            />
            <div className="flex items-center gap-4 mb-6">
              <a 
                href="https://www.linkedin.com/company/racine-investment" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="bg-white/10 p-2 rounded-full text-white hover:bg-white/20 transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/racineinvestment" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="bg-white/10 p-2 rounded-full text-white hover:bg-white/20 transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <div className="flex gap-4">
              <a href="https://apps.apple.com/app/racine" target="_blank" rel="noopener noreferrer">
                <img 
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-10"
                />
              </a>
              <a href="https://play.google.com/store/apps/details?id=sa.racine.app" target="_blank" rel="noopener noreferrer">
                <img 
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/ar_badge_web_generic.png"
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-white mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-white/70 hover:text-[#E63946] transition-colors">
                  عن رسين
                </Link>
              </li>
              <li>
                <Link to="/investments" className="text-white/70 hover:text-[#E63946] transition-colors">
                  استثماراتنا
                </Link>
              </li>
              <li>
                <Link to="/social" className="text-white/70 hover:text-[#E63946] transition-colors">
                  المسؤولية الاجتماعية
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-bold text-white mb-4">معلومات التواصل</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#E63946]" />
                <a href={`tel:${phoneNumber}`} className="text-white/70 hover:text-[#E63946] transition-colors font-mono">
                  {formatPhoneNumber(phoneNumber)}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#E63946]" />
                <a href="mailto:info@racine.sa" className="text-white/70 hover:text-[#E63946] transition-colors">
                  info@racine.sa
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#E63946] mt-1" />
                <span className="text-white/70">
                  مركز الملك عبدالله المالي
                  <br />
                  طريق الملك فهد، الرياض
                  <br />
                  المملكة العربية السعودية
                </span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-bold text-white mb-4">معلومات قانونية</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-white/70 hover:text-[#E63946] transition-colors">
                  الشروط والأحكام
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/70 hover:text-[#E63946] transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link to="/compliance" className="text-white/70 hover:text-[#E63946] transition-colors">
                  الامتثال التنظيمي
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="text-center">
            <p className="text-xs text-white/60">
              © {new Date().getFullYear()} رسين للاستثمار. جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}