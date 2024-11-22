import React from 'react';
import HeroSection from '../components/HeroSection';
import InvestmentProcess from '../components/InvestmentProcess';
import InvestmentTypes from '../components/InvestmentTypes';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <HeroSection />
      <InvestmentProcess />
      <InvestmentTypes />
      <CTASection />
    </div>
  );
}