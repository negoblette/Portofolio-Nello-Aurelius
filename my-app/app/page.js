import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import History from "@/components/History";
import Motion from "@/components/Motion";
import SectionScroller from "@/components/SectionScroller";
import SiteNav from "@/components/SiteNav";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Motion />
      <SectionScroller />
      <SiteNav />
      <main>
        <Hero />
        <Work />
        <History />
        <About />
      </main>
      <div className="page page-end" id="contact" data-page>
        <Contact />
        <Footer />
      </div>
    </>
  );
}
