import CopyChip from "@/components/CopyChip";
import TechCloud from "@/components/TechCloud";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section className="hero page" id="home" data-page>
      <TechCloud />
      <h1 className="hero__title">
        <span>{profile.name}</span>
        <span className="hero__role">{profile.title}</span>
      </h1>
      <div className="hero__actions">
        <a className="pill" href="#work">See my work</a>
        <CopyChip prefix="mail" value={profile.email} />
      </div>
    </section>
  );
}
