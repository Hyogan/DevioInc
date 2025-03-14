'use client'
import Hero from './components/Hero';
import DigitalHabitsSection from './components/DigitalHabitsSection';
import FeaturesSection from './components/FeaturesSection';
// import StatisticsSection from './components/StatisticsSection';
import EcosystemSection from './components/EcosystemSection';
import TestimonialsSection from './components/TestimonialsSection';
import TimelineSection from './components/TimelineSection';
import PricingSection from './components/PricingSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import TokenSale from './components/TokenSale';
import Insider from './components/Insider';
import ShowcaseSection from './components/ShowcaseSection';

export default function Home() {
  return (
    <main className="bg-[var(--primary)]">
      <Hero />
      <div id="features">
        <DigitalHabitsSection />
        <FeaturesSection />
      </div>
      {/* <StatisticsSection /> */}
      <div id="showcase">
        <ShowcaseSection />
      </div>
      <div id="ecosystem">
        <EcosystemSection />
      </div>
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <div id="timeline">
        <TimelineSection />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <div id="token-sale">
        <TokenSale />
      </div>
      <div id='insider'>
        <Insider />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </main>
  );
}
