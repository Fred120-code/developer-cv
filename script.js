/* ==========================================================================
   CV — script.js
   Génère intégralement le rendu du CV à partir de assets/data.js.
   Aucune donnée n'est écrite ici : ce fichier ne contient que la logique
   de construction du DOM.
   ========================================================================== */

import { cvData } from "./assets/data.js";

/* --------------------------------------------------------------------------
   Helpers génériques
   -------------------------------------------------------------------------- */

/** Raccourci document.getElementById */
const $ = (id) => document.getElementById(id);

/**
 * Crée un élément DOM avec attributs, classes et enfants.
 * @param {string} tag
 * @param {object} [opts] - { className, text, html, attrs, children }
 */
function createEl(tag, opts = {}) {
  const node = document.createElement(tag);

  if (opts.className) node.className = opts.className;
  if (opts.text !== undefined) node.textContent = opts.text;
  if (opts.html !== undefined) node.innerHTML = opts.html;

  if (opts.attrs) {
    for (const [key, value] of Object.entries(opts.attrs)) {
      node.setAttribute(key, value);
    }
  }

  if (opts.children) {
    opts.children.forEach((child) => child && node.appendChild(child));
  }

  return node;
}

/** Transforme une chaîne SVG en noeud DOM utilisable. */
function parseSVG(svgString) {
  const template = document.createElement("template");
  template.innerHTML = svgString.trim();
  return template.content.firstElementChild;
}

/* --------------------------------------------------------------------------
   Bibliothèque d'icônes (style Lucide — traits fins, monochromes)
   -------------------------------------------------------------------------- */

const ICON_BASE_ATTRS =
  'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';

const ICONS = {
  phone: `<svg ${ICON_BASE_ATTRS}><path d="M13.4 17.4c-3.9-1-8-5.1-9-9C4.1 6.6 5 5 6.5 4l2 3.2-1.3 2c-.3.5-.3 1 0 1.4 1.1 1.7 2.3 2.9 4 4 .4.3.9.3 1.4 0l2-1.3L18 15c-1 1.5-2.6 2.4-4.6 2.4Z"/></svg>`,
  mail: `<svg ${ICON_BASE_ATTRS}><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 7.4 5.4a1 1 0 0 0 1.2 0L20 7"/></svg>`,
  github: `<svg ${ICON_BASE_ATTRS}><path d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-2 1.03-2.7-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.3 2.74-1.02 2.74-1.02.56 1.38.2 2.4.1 2.65.65.7 1.03 1.6 1.03 2.7 0 3.85-2.34 4.7-4.57 4.94.36.32.68.94.68 1.9v2.8c0 .27.18.59.69.48A10 10 0 0 0 12 2Z"/></svg>`,
  linkedin: `<svg ${ICON_BASE_ATTRS}><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 10v6.5M7.5 7.5v.01M11.5 16.5V10M11.5 12.8c0-1.5 1-2.8 2.6-2.8 1.7 0 2.4 1.1 2.4 3v3.5"/></svg>`,
  mapPin: `<svg ${ICON_BASE_ATTRS}><path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.3"/></svg>`,
  externalLink: `<svg ${ICON_BASE_ATTRS}><path d="M10 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-4"/><path d="M14 4h6v6"/><path d="M20 4 10 14"/></svg>`,
  download: `<svg ${ICON_BASE_ATTRS}><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>`,
  check: `<svg ${ICON_BASE_ATTRS}><path d="m5 12.5 4.5 4.5L19 7"/></svg>`,
  user: `<svg ${ICON_BASE_ATTRS}><circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c1.3-3.6 4-5.4 7.5-5.4s6.2 1.8 7.5 5.4"/></svg>`,
  layers: `<svg ${ICON_BASE_ATTRS}><path d="m12 3 8.5 4.6L12 12.2 3.5 7.6 12 3Z"/><path d="m3.5 12 8.5 4.6 8.5-4.6"/><path d="m3.5 16.4 8.5 4.6 8.5-4.6"/></svg>`,
  graduationCap: `<svg ${ICON_BASE_ATTRS}><path d="m2 8.5 10-5 10 5-10 5-10-5Z"/><path d="M6 11v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5"/><path d="M22 8.5V15"/></svg>`,
  languages: `<svg ${ICON_BASE_ATTRS}><path d="M4 5h9M8 3v2.2C8 9 6 12 3 13.5"/><path d="M5 9c1 2 3.3 3.7 5.5 4.2"/><path d="m13 21 4-9 4 9"/><path d="M14.5 18h5"/></svg>`,
  heart: `<svg ${ICON_BASE_ATTRS}><path d="M12 20.5s-7.5-4.6-9.7-9.3C.9 8 2.4 4.8 5.6 4.1c1.9-.4 3.7.4 4.8 2 .5.7 1 1.6 1.6 2.4.6-.8 1.1-1.7 1.6-2.4 1.1-1.6 2.9-2.4 4.8-2 3.2.7 4.7 3.9 3.3 7.1C19.5 15.9 12 20.5 12 20.5Z"/></svg>`,
  folderKanban: `<svg ${ICON_BASE_ATTRS}><path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4l1.8 2.2H19.5A1.5 1.5 0 0 1 21 8.7v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-11Z"/><path d="M9 11v5M13 11v3M17 11v6"/></svg>`,
  briefcase: `<svg ${ICON_BASE_ATTRS}><rect x="3" y="7.5" width="18" height="12" rx="2"/><path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5"/><path d="M3 12.5h18"/></svg>`,
  cpu: `<svg ${ICON_BASE_ATTRS}><rect x="6.5" y="6.5" width="11" height="11" rx="1.5"/><rect x="10" y="10" width="4" height="4"/><path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2"/></svg>`,
  code: `<svg ${ICON_BASE_ATTRS}><path d="m9 8-4.5 4L9 16"/><path d="m15 8 4.5 4L15 16"/></svg>`,
  palette: `<svg ${ICON_BASE_ATTRS}><path d="M12 3a9 9 0 1 0 0 18c1 0 1.8-.8 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8h2.1A4.3 4.3 0 0 0 21 10.7C21 6.5 16.9 3 12 3Z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="11" cy="7.3" r="1"/><circle cx="15" cy="7.8" r="1"/></svg>`,
  braces: `<svg ${ICON_BASE_ATTRS}><path d="M8 4C6 4 5.5 5 5.5 6.5v2c0 1-.5 1.5-1.5 1.5 1 0 1.5.5 1.5 1.5v2C5.5 15 6 16 8 16"/><path d="M16 4c2 0 2.5 1 2.5 2.5v2c0 1 .5 1.5 1.5 1.5-1 0-1.5.5-1.5 1.5v2c0 1.5-.5 2.5-2.5 2.5"/></svg>`,
  fileCode: `<svg ${ICON_BASE_ATTRS}><path d="M13 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V8.5L13 3Z"/><path d="M13 3v5.5h5.5"/><path d="m9.5 13-1.5 1.5 1.5 1.5M14.5 13l1.5 1.5-1.5 1.5"/></svg>`,
  atom: `<svg ${ICON_BASE_ATTRS}><circle cx="12" cy="12" r="1.4"/><ellipse cx="12" cy="12" rx="9" ry="3.6"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)"/></svg>`,
  server: `<svg ${ICON_BASE_ATTRS}><rect x="3.5" y="4" width="17" height="6.5" rx="1.5"/><rect x="3.5" y="13.5" width="17" height="6.5" rx="1.5"/><path d="M7 7.2h.01M7 16.7h.01"/></svg>`,
  route: `<svg ${ICON_BASE_ATTRS}><circle cx="6" cy="18" r="2.3"/><circle cx="18" cy="6" r="2.3"/><path d="M8 18h5a4 4 0 0 0 4-4v-1a4 4 0 0 0-4-4H9"/></svg>`,
  box: `<svg ${ICON_BASE_ATTRS}><path d="m3.5 7.5 8.5-4.5 8.5 4.5-8.5 4.5-8.5-4.5Z"/><path d="M3.5 7.5v9l8.5 4.5 8.5-4.5v-9"/><path d="M12 12v9"/></svg>`,
  gitBranch: `<svg ${ICON_BASE_ATTRS}><circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="8.5" r="2"/><path d="M6 7v10"/><path d="M6 12c0-2.2 1.8-4 4-4h4.5"/></svg>`,
  workflow: `<svg ${ICON_BASE_ATTRS}><rect x="3" y="3.5" width="6" height="5" rx="1.2"/><rect x="15" y="3.5" width="6" height="5" rx="1.2"/><rect x="9" y="15.5" width="6" height="5" rx="1.2"/><path d="M6 8.5v3a2 2 0 0 0 2 2h1.5M18 8.5v3a2 2 0 0 1-2 2h-1.5"/></svg>`,
  database: `<svg ${ICON_BASE_ATTRS}><ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6"/><path d="M4.5 12v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6"/></svg>`,
  leaf: `<svg ${ICON_BASE_ATTRS}><path d="M4 20c8.5 0 15-5.5 16-16-9 0-15 5-16 11.2"/><path d="M4 20c0-4.5 1.6-8 4.8-10.4"/></svg>`,
  triangle: `<svg ${ICON_BASE_ATTRS}><path d="m12 4 9 16H3L12 4Z"/></svg>`,
  terminal: `<svg ${ICON_BASE_ATTRS}><rect x="3" y="4.5" width="18" height="15" rx="2"/><path d="m7 9.5 3 2.5-3 2.5"/><path d="M13 15h4"/></svg>`,
};

/** Retourne un noeud SVG (icône) pour la clé donnée. */
function icon(name, extraClass) {
  const node = parseSVG(ICONS[name] || ICONS.code);
  if (extraClass) node.classList.add(extraClass);
  return node;
}

/** Associe un nom de technologie à une icône monochrome. */
const TECH_ICON_MAP = {
  HTML: "code",
  CSS: "palette",
  JavaScript: "braces",
  TypeScript: "fileCode",
  React: "atom",
  "Next.js": "layers",
  "Node.js": "server",
  Express: "route",
  Docker: "box",
  Git: "gitBranch",
  "GitHub Actions": "workflow",
  PostgreSQL: "database",
  MongoDB: "leaf",
  Prisma: "triangle",
  Linux: "terminal",
};

/* --------------------------------------------------------------------------
   Rendu — HEADER
   -------------------------------------------------------------------------- */
function renderHeader() {
  const { personal } = cvData;
  const frag = document.createDocumentFragment();

  const identity = createEl("div", {
    className: "header__identity",
    children: [
      createEl("h1", { className: "header__name", text: personal.displayName }),
      createEl("p", { className: "header__role", text: personal.role }),
    ],
  });

  const contactDefs = [
    {
      key: "phone",
      iconName: "phone",
      href: `tel:${personal.phone.replace(/\s+/g, "")}`,
    },
    { key: "email", iconName: "mail", href: `mailto:${personal.email}` },
    { key: "github", iconName: "github", href: `https://${personal.github}` },
    {
      key: "linkedin",
      iconName: "linkedin",
      href: `https://${personal.linkedin}`,
    },
  ];

  const contacts = createEl("div", { className: "header__contacts" });

  contactDefs.forEach(({ key, iconName, href }) => {
    const value = personal[key];
    if (!value) return;
    contacts.appendChild(
      createEl("a", {
        className: "contact-item",
        attrs: {
          href,
          target: key === "email" || key === "phone" ? "_self" : "_blank",
          rel: "noopener",
        },
        children: [icon(iconName), createEl("span", { text: value })],
      }),
    );
  });

  if (personal.location) {
    contacts.appendChild(
      createEl("span", {
        className: "contact-item",
        children: [
          icon("mapPin"),
          createEl("span", { text: personal.location }),
        ],
      }),
    );
  }

  frag.appendChild(identity);
  frag.appendChild(contacts);

  $("header").appendChild(frag);
}

/* --------------------------------------------------------------------------
   Rendu — COMPÉTENCES (EXPERTISE)
   -------------------------------------------------------------------------- */
function renderSkills() {
  const card = $("skills-card");
  const frag = document.createDocumentFragment();

  frag.appendChild(
    createEl("h2", {
      className: "section-title",
      children: [icon("cpu"), createEl("span", { text: "Expertise" })],
    }),
  );

  cvData.skills.forEach((group) => {
    const pillGroup = createEl("div", { className: "pill-group" });
    group.items.forEach((item) => {
      pillGroup.appendChild(
        createEl("span", { className: "pill", text: item }),
      );
    });

    frag.appendChild(
      createEl("div", {
        className: "skills-group",
        children: [
          createEl("h3", {
            className: "skills-group__label",
            text: group.category,
          }),
          pillGroup,
        ],
      }),
    );
  });

  card.appendChild(frag);
}

/* --------------------------------------------------------------------------
   Rendu — FORMATION
   -------------------------------------------------------------------------- */
function renderEducation() {
  const card = $("education-card");
  const frag = document.createDocumentFragment();

  frag.appendChild(
    createEl("h2", {
      className: "section-title",
      children: [
        icon("graduationCap"),
        createEl("span", { text: "Formation" }),
      ],
    }),
  );

  const list = createEl("div", { className: "timeline timeline--compact" });

  cvData.education.forEach((edu) => {
    list.appendChild(
      createEl("div", {
        className: "timeline-item",
        children: [
          createEl("h3", {
            className: "timeline-item__title",
            text: edu.school,
          }),
          createEl("p", {
            className: "timeline-item__subtitle",
            text: edu.degree,
          }),
          createEl("span", {
            className: "timeline-item__period",
            text: edu.period,
          }),
        ],
      }),
    );
  });

  frag.appendChild(list);
  card.appendChild(frag);
}

/* --------------------------------------------------------------------------
   Rendu — LANGUES
   -------------------------------------------------------------------------- */
function renderLanguages() {
  const card = $("languages-card");
  const frag = document.createDocumentFragment();

  frag.appendChild(
    createEl("h2", {
      className: "section-title",
      children: [icon("languages"), createEl("span", { text: "Langues" })],
    }),
  );

  const list = createEl("div", { className: "lang-list" });

  cvData.languages.forEach((lang) => {
    list.appendChild(
      createEl("div", {
        className: "lang-item",
        children: [
          createEl("span", { className: "lang-item__name", text: lang.name }),
          createEl("span", { className: "lang-item__level", text: lang.level }),
        ],
      }),
    );
  });

  frag.appendChild(list);
  card.appendChild(frag);
}

/* --------------------------------------------------------------------------
   Rendu — CENTRES D'INTÉRÊT
   -------------------------------------------------------------------------- */
function renderInterests() {
  const card = $("interests-card");
  const frag = document.createDocumentFragment();

  frag.appendChild(
    createEl("h2", {
      className: "section-title",
      children: [
        icon("heart"),
        createEl("span", { text: "Centres d'intérêt" }),
      ],
    }),
  );

  const pillGroup = createEl("div", { className: "pill-group" });
  cvData.interests.forEach((interest) => {
    pillGroup.appendChild(
      createEl("span", { className: "pill", text: interest }),
    );
  });

  frag.appendChild(pillGroup);
  card.appendChild(frag);
}

/* --------------------------------------------------------------------------
   Rendu — ABOUT / PROFIL
   -------------------------------------------------------------------------- */
function renderProfile() {
  const card = $("profile-card");
  const frag = document.createDocumentFragment();

  frag.appendChild(
    createEl("h2", {
      className: "section-title",
      children: [icon("user"), createEl("span", { text: "About" })],
    }),
  );

  frag.appendChild(
    createEl("p", {
      className: "about__text",
      text: cvData.profile.description,
    }),
  );

  const highlights = createEl("div", { className: "about__highlights" });
  cvData.profile.highlights.forEach((h) => {
    highlights.appendChild(
      createEl("div", {
        className: "about__highlight",
        children: [icon("check"), createEl("span", { text: h })],
      }),
    );
  });

  frag.appendChild(highlights);
  card.appendChild(frag);
}

/* --------------------------------------------------------------------------
   Rendu — PROJETS
   -------------------------------------------------------------------------- */
function renderProjects() {
  const card = $("projects-card");
  const frag = document.createDocumentFragment();

  frag.appendChild(
    createEl("h2", {
      className: "section-title",
      children: [icon("folderKanban"), createEl("span", { text: "Projets" })],
    }),
  );

  const list = createEl("div", { className: "timeline timeline--full" });

  cvData.projects.forEach((project) => {
    const head = createEl("div", {
      className: "project__head",
      children: [
        createEl("div", {
          children: [
            createEl("h3", { className: "project__name", text: project.name }),
            createEl("p", { className: "project__type", text: project.type }),
          ],
        }),
        project.period
          ? createEl("span", {
              className: "badge-period",
              text: project.period,
            })
          : null,
      ],
    });

    const body = createEl("div", { className: "project__body" });

    if (project.problem) {
      body.appendChild(
        createEl("div", {
          className: "project__block",
          children: [
            createEl("span", {
              className: "tag-label tag-label--problem",
              text: "Problem",
            }),
            createEl("p", { text: project.problem }),
          ],
        }),
      );
    }

    if (project.solution) {
      body.appendChild(
        createEl("div", {
          className: "project__block",
          children: [
            createEl("span", {
              className: "tag-label tag-label--solution",
              text: "Solution",
            }),
            createEl("p", { text: project.solution }),
          ],
        }),
      );
    }

    if (project.stack && project.stack.length) {
      const stackList = createEl("div", { className: "stack-list" });
      project.stack.forEach((tech) => {
        stackList.appendChild(
          createEl("span", { className: "stack-tag", text: tech }),
        );
      });
      body.appendChild(
        createEl("div", { className: "project__block", children: [stackList] }),
      );
    }

    const actions = createEl("div", { className: "project__actions" });

    if (project.demo) {
      actions.appendChild(
        createEl("a", {
          className: "project__action-btn",
          attrs: {
            href: project.demo,
            target: "_blank",
            rel: "noopener noreferrer",
            title: "Voir la démo",
            "aria-label": "Voir la démo du projet",
          },
          children: [icon("externalLink")],
        }),
      );
    }

    if (project.github) {
      actions.appendChild(
        createEl("a", {
          className: "project__action-btn",
          attrs: {
            href: project.github,
            target: "_blank",
            rel: "noopener noreferrer",
            title: "Voir le dépôt GitHub",
            "aria-label": "Voir le dépôt GitHub du projet",
          },
          children: [icon("github")],
        }),
      );
    }

    if (actions.children.length) {
      body.appendChild(actions);
    }

    list.appendChild(
      createEl("div", { className: "project", children: [head, body] }),
    );
  });

  frag.appendChild(list);
  card.appendChild(frag);
}

/* --------------------------------------------------------------------------
   Rendu — EXPÉRIENCE
   -------------------------------------------------------------------------- */
function renderExperience() {
  const card = $("experience-card");
  const frag = document.createDocumentFragment();

  frag.appendChild(
    createEl("h2", {
      className: "section-title",
      children: [icon("briefcase"), createEl("span", { text: "Expérience" })],
    }),
  );

  const list = createEl("div", { className: "timeline timeline--full" });

  cvData.experience.forEach((exp) => {
    const head = createEl("div", {
      className: "project__head",
      children: [
        createEl("div", {
          children: [
            createEl("h3", { className: "exp-item__role", text: exp.role }),
            createEl("p", {
              className: "exp-item__company",
              text: exp.company,
            }),
          ],
        }),
        exp.period
          ? createEl("span", { className: "badge-period", text: exp.period })
          : null,
      ],
    });

    const ul = createEl("ul", { className: "exp-item__list" });
    exp.achievements.forEach((a) => {
      ul.appendChild(createEl("li", { text: a }));
    });

    list.appendChild(
      createEl("div", { className: "exp-item", children: [head, ul] }),
    );
  });

  frag.appendChild(list);
  card.appendChild(frag);
}


/* --------------------------------------------------------------------------
   Initialisation
   -------------------------------------------------------------------------- */
function init() {
  renderHeader();
  renderSkills();
  renderEducation();
  renderLanguages();
  renderInterests();
  renderProfile();
  renderProjects();
  renderExperience();
}

document.addEventListener("DOMContentLoaded", init);
