import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import ProjectCarousel from "@/components/ProjectCarousel";
import SiteNav from "@/components/SiteNav";
import { projects } from "@/data/profile";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  if (!project) return {};
  return { title: `${project.name} | Nello Aurelius`, description: project.description };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.id === slug);
  if (index < 0) notFound();

  const project = projects[index];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const pictures = [project.image, ...project.gallery];

  return (
    <>
      <SiteNav />
      <main className="wrap detail">
        <div className="detail__intro">
          <Link className="detail__back" href="/#work">← All projects</Link>

          <header className="detail__head">
            <h1 className="detail__title">{project.name}</h1>
            <p className="detail__summary">{project.summary}</p>
            <p className="detail__kind mono">{project.kind}</p>
            {project.links.length > 0 && (
              <p className="detail__links">
                {project.links.map((link) => (
                  <a key={link.href} className="pill pill--ghost pill--sm" href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label} →
                  </a>
                ))}
              </p>
            )}
          </header>

          <ProjectCarousel slides={pictures} title={project.name} />
        </div>

        <section className="detail__block">
          <h2 className="detail__heading">Overview</h2>
          <div className="detail__text">
            {project.overview.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="detail__block">
          <h2 className="detail__heading">What it does</h2>
          <ul className="detail__features">
            {project.features.map((feature) => (
              <li key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="detail__block">
          <h2 className="detail__heading">Tech stack</h2>
          <dl className="detail__stack">
            {project.stack.map((group) => (
              <div key={group.label}>
                <dt className="mono">{group.label}</dt>
                <dd>{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="detail__block">
          <h2 className="detail__heading">Infrastructure</h2>
          <div className="detail__infra">
            <ol className="flow" aria-label="How a request moves through the system">
              {project.infrastructure.flow.map((step) => (
                <li key={step.name}>
                  <strong>{step.name}</strong>
                  <span>{step.role}</span>
                </li>
              ))}
            </ol>
            <ul className="detail__notes">
              {project.infrastructure.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </section>

        <nav className="detail__pager" aria-label="More projects">
          <Link className="detail__next" href={`/projects/${previous.id}`}>
            <span className="small soft">Previous project</span>
            <span className="detail__next-name">← {previous.name}</span>
          </Link>
          <Link className="detail__next detail__next--forward" href={`/projects/${next.id}`}>
            <span className="small soft">Next project</span>
            <span className="detail__next-name">{next.name} →</span>
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}
