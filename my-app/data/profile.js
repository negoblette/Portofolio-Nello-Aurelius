// Isi situs ada di folder content dan bisa diubah lewat /keystatic.
// File ini hanya merapikannya untuk komponen.
import certificateData from "@/content/certificates.json";
import educationData from "@/content/education.json";
import experienceData from "@/content/experience.json";
import profileData from "@/content/profile.json";
import projectData from "@/content/projects.json";
import skillData from "@/content/skills.json";
import socialData from "@/content/socials.json";

export const profile = { ...profileData, cv: "/Nello-Aurelius-CV.pdf" };

export const portrait = {
  "src": "/portrait-nello-v2.webp",
  "alt": "Formal portrait of Nello Aurelius in a dark suit"
};

export const socials = socialData.items;
export const experience = experienceData.items;
export const education = educationData.items;
export const certificates = certificateData.items;
export const softSkills = skillData.soft;
export const hardSkills = skillData.hard;

export const projects = projectData.items.map(({ identity, flow, notes, ...project }) => ({
  ...project,
  id: identity.slug,
  name: identity.name,
  infrastructure: { flow, notes },
}));
