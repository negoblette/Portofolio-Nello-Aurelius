import AboutTerminal from "@/components/AboutTerminal";
import PortraitCode from "@/components/PortraitCode";

export default function About() {
  return (
    <section className="section wrap page" id="about" data-page>
      <div className="about">
        <PortraitCode />
        <div className="about__main">
          <p className="small soft" data-reveal>About me</p>
          <h2 className="about__title" data-reveal>
            I build software
            <span>from the screen</span>
            <span className="about__accent">to the database.</span>
          </h2>
          <AboutTerminal />
        </div>
      </div>
    </section>
  );
}
