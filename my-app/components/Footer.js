import Link from "next/link";
import FootWordmark from "@/components/FootWordmark";
import { profile, socials } from "@/data/profile";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
];

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__grid">
        <div className="foot__brand">
          <a className="pill pill--sm" href={profile.cv} download>Download CV</a>
          <p className="small soft">© {profile.name}</p>
        </div>
        <div>
          <h2>Pages</h2>
          <ul className="foot__list">
            {links.map((link) => (
              <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Social</h2>
          <ul className="foot__list">
            {socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">{social.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap">
        <FootWordmark name={profile.name} />
      </div>
    </footer>
  );
}
