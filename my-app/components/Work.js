import Image from "next/image";
import Link from "next/link";
import WorkRail from "@/components/WorkRail";
import { projects } from "@/data/profile";

export default function Work() {
  return (
    <section className="section wrap page" id="work" data-page>
      <h2 className="section__head heading" data-reveal>Projects, from interface to server</h2>
      <p className="section__sub" data-reveal>What I&apos;ve built so far, and how each one works.</p>
      <WorkRail>
        {projects.map((project) => (
          <li key={project.id} className="work__item" data-reveal>
            <Link className="work__card" href={`/projects/${project.id}`}>
              <div className={project.image.shot ? "work__pic work__pic--shot" : "work__pic"}>
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  sizes="(max-width: 860px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  style={{ objectPosition: project.image.position }}
                />
              </div>
              <h3 className="work__name">{project.name}</h3>
              <p className="work__text">{project.description}</p>
              <p className="work__kind mono">{project.kind}</p>
              <span className="work__more">View details <span aria-hidden="true">→</span></span>
            </Link>
          </li>
        ))}
      </WorkRail>
    </section>
  );
}
