import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import SystemDemo from "@/components/SystemDemo";
import SpaceBackground from "@/components/SpaceBackground";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import PromoBar from "@/components/PromoBar";
import PurchaseNotifications from "@/components/PurchaseNotifications";

const Testimonials = lazy(() => import("@/components/Testimonials"));
const Pricing = lazy(() => import("@/components/Pricing"));
const Footer = lazy(() => import("@/components/Footer"));

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "MuseTera — Sistema para Musicoterapeutas" },
      {
        name: "description",
        content:
          "Sistema completo para musicoterapeutas: anamnese, evolução, prontuários e gestão de pacientes.",
      },
    ],
  }),
});

const SectionFallback = () => <div className="min-h-[200px]" />;

const CurveDivider = ({
  flip = false,
  color = "hsl(var(--muted))",
}: {
  flip?: boolean;
  color?: string;
}) => (
  <div
    className={`relative w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}
    style={{ marginTop: flip ? 0 : -1, marginBottom: flip ? -1 : 0 }}
  >
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className="w-full h-[50px] md:h-[70px]"
    >
      <path
        d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
        fill={color}
      />
    </svg>
  </div>
);

function Index() {
  return (
    <div
      className="min-h-screen relative"
      style={{ paddingTop: "var(--promo-h, 0px)" }}
    >
      <SpaceBackground />
      <div className="noise-overlay" />
      <PromoBar />

      <Navigation />
      <Hero />

      <CurveDivider color="hsl(var(--muted))" />
      <AboutUs />
      <SystemDemo />

      <Suspense fallback={<SectionFallback />}>
        <Testimonials />
        <Pricing />
        <Footer />
      </Suspense>

      <WhatsAppFloat />
      <PurchaseNotifications />
    </div>
  );
}
