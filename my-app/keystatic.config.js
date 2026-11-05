import { config, fields, singleton } from "@keystatic/core";

const text = (label, options) => fields.text({ label, ...options });
const required = (label, options) => fields.text({ label, validation: { isRequired: true }, ...options });
const textList = (label, itemLabel) =>
  fields.array(required(itemLabel), { label, itemLabel: (props) => props.value });

const picture = (label) =>
  fields.object(
    {
      src: fields.image({
        label: "Image",
        directory: "public/projects",
        publicPath: "/projects/",
        validation: { isRequired: true },
      }),
      alt: required("Alt text", { description: "A short description of the image." }),
      caption: text("Caption"),
      position: text("Crop position", { defaultValue: "50% 0%", description: "Used for the card on the home page." }),
      shot: fields.checkbox({ label: "Screenshot", description: "Shows the whole image, in full colour.", defaultValue: true }),
    },
    { label },
  );

const timeline = (label) =>
  singleton({
    label,
    path: `content/${label.toLowerCase()}`,
    format: "json",
    schema: {
      items: fields.array(
        fields.object({
          date: required("Date"),
          role: required("Role"),
          org: required("Organisation"),
        }),
        { label, itemLabel: (props) => props.fields.role.value },
      ),
    },
  });

export default config({
  // Lokal menulis ke file saat development. Produksi menyimpan commit ke GitHub.
  storage:
    process.env.NODE_ENV === "development"
      ? { kind: "local" }
      : {
          kind: "github",
          repo: { owner: "negoblette", name: "Portofolio-Nello-Aurelius" },
          pathPrefix: "my-app",
        },
  ui: {
    brand: { name: "Portofolio Nello Aurelius" },
  },
  singletons: {
    profile: singleton({
      label: "Profile",
      path: "content/profile",
      format: "json",
      schema: {
        name: required("Name"),
        title: required("Title"),
        email: required("Email"),
      },
    }),
    projects: singleton({
      label: "Projects",
      path: "content/projects",
      format: "json",
      schema: {
        items: fields.array(
          fields.object({
            identity: fields.slug({
              name: { label: "Name", validation: { isRequired: true } },
              slug: { label: "URL slug", description: "Part of the address: /projects/your-slug" },
            }),
            kind: required("Made for", { description: "Example: Artha Mitra Interdata" }),
            description: required("Card text", { multiline: true }),
            summary: required("Summary", { multiline: true }),
            overview: fields.array(required("Paragraph", { multiline: true }), {
              label: "Overview",
              itemLabel: (props) => props.value,
            }),
            features: fields.array(
              fields.object({ title: required("Title"), text: required("Text", { multiline: true }) }),
              { label: "What it does", itemLabel: (props) => props.fields.title.value },
            ),
            stack: fields.array(
              fields.object({ label: required("Group"), items: textList("Items", "Item") }),
              { label: "Tech stack", itemLabel: (props) => props.fields.label.value },
            ),
            flow: fields.array(
              fields.object({ name: required("Name"), role: required("Role") }),
              { label: "Infrastructure flow", itemLabel: (props) => props.fields.name.value },
            ),
            notes: textList("Infrastructure notes", "Note"),
            links: fields.array(
              fields.object({ label: required("Label"), href: required("Address") }),
              { label: "Links", itemLabel: (props) => props.fields.label.value },
            ),
            image: picture("Main image"),
            gallery: fields.array(picture("Image"), {
              label: "More images",
              itemLabel: (props) => props.fields.caption.value || props.fields.alt.value,
            }),
          }),
          {
            label: "Projects",
            slugField: "identity",
            itemLabel: (props) => props.fields.identity.value.name,
          },
        ),
      },
    }),
    experience: timeline("Experience"),
    education: timeline("Education"),
    certificates: singleton({
      label: "Certificates",
      path: "content/certificates",
      format: "json",
      schema: {
        items: fields.array(
          fields.object({
            title: required("Title"),
            issuer: required("Issuer"),
            date: required("Date"),
            file: fields.file({
              label: "PDF",
              directory: "public/certificates",
              publicPath: "/certificates/",
              validation: { isRequired: true },
            }),
          }),
          { label: "Certificates", itemLabel: (props) => props.fields.title.value },
        ),
      },
    }),
    skills: singleton({
      label: "Skills",
      path: "content/skills",
      format: "json",
      schema: {
        soft: textList("Soft skills", "Skill"),
        hard: fields.array(
          fields.object({ label: required("Category"), items: textList("Items", "Item") }),
          { label: "Hard skills", itemLabel: (props) => props.fields.label.value },
        ),
      },
    }),
    socials: singleton({
      label: "Social links",
      path: "content/socials",
      format: "json",
      schema: {
        items: fields.array(
          fields.object({ label: required("Label"), href: required("Address") }),
          { label: "Links", itemLabel: (props) => props.fields.label.value },
        ),
      },
    }),
  },
});
