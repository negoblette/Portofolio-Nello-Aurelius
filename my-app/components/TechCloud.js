import { techLogos } from "@/data/techLogos";

export default function TechCloud() {
  return (
    <ul className="tech" aria-label="Tech stack">
      {techLogos.map((logo) => (
        <li
          key={logo.name}
          className="tech__item"
          style={{
            "--x": `${logo.x}%`,
            "--y": `${logo.y}%`,
            "--size": `${logo.size}px`,
            "--logo": logo.color,
            "--duration": `${logo.duration}s`,
            "--delay": `${logo.delay}s`,
          }}
        >
          <span className="tech__tile">
            <svg viewBox="0 0 24 24" role="img" aria-label={logo.name}><path d={logo.path} /></svg>
          </span>
        </li>
      ))}
    </ul>
  );
}
