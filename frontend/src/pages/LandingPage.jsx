import { Navbar } from '../components/layout/Navbar.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { HeroSection } from '../sections/HeroSection.jsx';
import { ProblemsSection } from '../sections/ProblemsSection.jsx';
import { ServicesSection } from '../sections/ServicesSection.jsx';
import { MethodologySection } from '../sections/MethodologySection.jsx';
import { ValuePropsSection } from '../sections/ValuePropsSection.jsx';
import { FaqSection } from '../sections/FaqSection.jsx';
import { ContactSection } from '../sections/ContactSection.jsx';

export function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemsSection />
        <ServicesSection />
        <MethodologySection />
        <ValuePropsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
