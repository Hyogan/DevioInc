import Hero from '@/app/components/Hero';
import DigitalHabitsSection from '@/app/components/DigitalHabitsSection';
import FeaturesSection from '@/app/components/FeaturesSection';
import EcosystemSection from '@/app/components/EcosystemSection';
import PricingSection from '@/app/components/PricingSection';
import Footer from '@/app/components/Footer';

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <DigitalHabitsSection />
      <FeaturesSection />
      <EcosystemSection />
      <PricingSection />
      <Footer />
    </main>
  );
} 
