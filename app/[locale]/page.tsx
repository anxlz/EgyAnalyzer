import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { IdAnalyzer } from '@/components/IdAnalyzer';
import { PrivacyNotice } from '@/components/PrivacyNotice';
import { Footer } from '@/components/Footer';
import { PyramidBackground } from '@/components/PyramidBackground';

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background geo-pattern pyramid-grid">
      <PyramidBackground />
      <Navbar />
      <main className="flex-1 relative z-10">
        <HeroSection />
        <IdAnalyzer />
        <PrivacyNotice />
      </main>
      <Footer />
    </div>
  );
}
