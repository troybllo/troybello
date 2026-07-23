import { AboutDrawer } from "@/components/AboutDrawer";
import { CloseTheGap } from "@/components/CloseTheGap";
import { ContactCta } from "@/components/ContactCta";
import { Cursor } from "@/components/Cursor";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { FooterNav } from "@/components/FooterNav";
import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { Manifesto } from "@/components/Manifesto";
import { MobileMenu } from "@/components/MobileMenu";
import { Nav } from "@/components/Nav";
import { Preloader } from "@/components/Preloader";
import { ProjectJourney } from "@/components/ProjectJourney";
import { SectionCounter } from "@/components/SectionCounter";
import { Services } from "@/components/Services";
import { SuccessStories } from "@/components/SuccessStories";
import { WordMarquee } from "@/components/WordMarquee";

export default function Home() {
  return (
    <>
      <Preloader />
      <Cursor />
      <Nav />
      <MobileMenu />
      <AboutDrawer />
      <SectionCounter />
      <main>
        <Hero />
        <WordMarquee />
        <Manifesto />
        <LogoMarquee />
        <CloseTheGap />
        <SuccessStories />
        <Services />
        <ProjectJourney />
        <Faq />
        <ContactCta />
        <FooterNav />
      </main>
      <Footer />
    </>
  );
}
