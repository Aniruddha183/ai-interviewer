import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Testimonials } from "@/components/landing/testimonials";
import { CTA } from "@/components/landing/cta";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { PricingPage } from "@/components/landing/pricing";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <PricingPage />
      <Footer />
    </main>
  );
}
