import { certificates, education, experience } from "@/data/profile";

function Group({ title, items }) {
  return (
    <div>
      <h3 data-reveal>{title}</h3>
      <ol className="rows">
        {items.map((item) => (
          <li key={`${item.role}-${item.date}`} data-reveal>
            <div className="rows__row">
              <p className="rows__role">{item.role}</p>
              <span className="rows__date">{item.date}</span>
            </div>
            <p className="rows__org">{item.org}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Certificates() {
  return (
    <div>
      <h3 data-reveal>Certificates</h3>
      <ul className="rows rows--links">
        {certificates.map((certificate) => (
          <li key={certificate.file} data-reveal>
            <a className="rows__link" href={certificate.file} target="_blank" rel="noopener noreferrer">
              <span className="rows__role">{certificate.title}</span>
              <span className="rows__date">{certificate.issuer}, {certificate.date}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function History() {
  return (
    <section className="section wrap page" id="experience" data-page>
      <h2 className="section__head heading" data-reveal>Experience and education</h2>
      <p className="section__sub" data-reveal>Where I&apos;ve worked, and what I&apos;ve studied.</p>
      <div className="history">
        <Group title="Experience" items={experience} />
        <div className="history__side">
          <Group title="Education" items={education} />
          <Certificates />
        </div>
      </div>
    </section>
  );
}
