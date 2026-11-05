import CopyChip from "@/components/CopyChip";
import { profile, socials } from "@/data/profile";

export default function Contact() {
  const linkedin = socials.find((social) => social.label === "LinkedIn");

  return (
    <section className="cta">
      <h2 className="heading" data-reveal>Building something? Tell me about it.</h2>
      <div data-reveal><CopyChip prefix="mail" value={profile.email} /></div>
      <div className="cta__actions" data-reveal>
        <a className="pill pill--ghost" href={linkedin.href} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </section>
  );
}
