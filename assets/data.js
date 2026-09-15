export const cvData = {
  // =========================
  // INFORMATIONS PERSONNELLES
  // =========================
  personal: {
    firstName: "Ayemtsa Djouda Joran Fred",
    displayName: "Joran Fred",
    role: "Full Stack JavaScript Developer • DevOps Enthusiast",

    location: "Yaoundé, Cameroun",

    email: "fredayemtsa@gmail.com",
    phone: "+237 652 87 24 41",

    github: "github.com/Fred120-code",
  },

  // =========================
  // PROFIL
  // =========================
  profile: {
    title: "Profil",

    description: `
Développeur Full Stack JavaScript en 3ᵉ année de licence à l'université de Yaoundé I, avec une solide expérience dans la conception d'applications SaaS modernes. J'aime construire des solutions complètes, du frontend jusqu'au déploiement avec Docker et GitHub Actions. Je me spécialise progressivement vers le DevOps et le DevSecOps afin de concevoir des applications performantes, sécurisées et facilement déployables.
    `.trim(),

    highlights: [
      "Développement d'applications SaaS avec Next.js et Node.js.",
      "Conception d'API REST sécurisées avec authentification et gestion des rôles (RBAC).",
      "Déploiement et conteneurisation avec Docker.",
      "Mise en place de pipelines CI/CD avec GitHub Actions.",
      "Bases solides en Linux, Git, Prisma ORM et PostgreSQL.",
    ],
  },

  // =========================
  // COMPÉTENCES
  // =========================
  skills: [
    {
      category: "Frontend",
      items: [
        "HTML5",
        "CSS3",
        "JavaScript (ES6+)",
        "TypeScript",
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "Responsive Design",
      ],
    },

    {
      category: "Backend",
      items: [
        "Node.js",
        "Express.js",
        "REST API",
        "Authentication (JWT, Clerk)",
        "RBAC",
        "MVC Architecture",
      ],
    },

    {
      category: "Bases de données",
      items: ["PostgreSQL", "MongoDB", "SQLite", "Prisma ORM", "Supabase"],
    },

    {
      category: "DevOps",
      items: [
        "Docker",
        "Docker Compose",
        "Git",
        "GitHub",
        "GitHub Actions",
        "CI/CD",
        "Linux (Ubuntu)",
      ],
    },

    {
      category: "Outils & Technologies",
      items: [
        "VS Code",
        "Cursor",
        "Postman",
        "Figma",
        "Prisma Studio",
        "Vercel",
        "Netlify",
      ],
    },

    {
      category: "Réseaux & Systèmes",
      items: [
        "TCP/IP",
        "OSI",
        "Routage",
        "Adressage IP",
        "eNSP",
        "Virtualisation (bases)",
      ],
    },
  ],

  // =========================
  // PROJETS
  // =========================
  projects: [
    {
      name: "SmartStock",
      type: "Application SaaS de gestion de stock",

      problem:
        "Les petites entreprises et associations gèrent souvent leurs stocks avec des cahiers ou des fichiers Excel, ce qui entraîne des erreurs, des ruptures de stock et un manque de visibilité sur les ventes.",

      solution:
        "Développement d'une plateforme SaaS permettant de gérer les produits, les mouvements de stock, les ventes, les alertes de rupture, plusieurs organisations, ainsi que des rapports intelligents générés par IA.",

      stack: [
        "Next.js",
        "TypeScript",
        "Prisma ORM",
        "PostgreSQL",
        "Supabase Storage",
        "Clerk",
        "Tailwind CSS",
        "Docker",
        "GitHub Actions",
      ],

      features: [
        "Gestion multi-organisations.",
        "RBAC (administrateur, gestionnaire, employé).",
        "Rapports et statistiques.",
        "Notifications intelligentes.",
      ],

      github: "https://github.com/Fred120-code/SmartStock.git",
      demo: "",
    },

    {
      name: "Spendly AI",
      type: "Application SaaS de gestion des finances personnelles",

      problem:
        "Les utilisateurs ont du mal à suivre leurs dépenses et à comprendre leurs habitudes financières au quotidien.",

      solution:
        "Création d'une application qui centralise les revenus et dépenses, affiche des statistiques interactives et produit des analyses financières personnalisées grâce à l'intelligence artificielle.",

      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "MongoDB",
        "Prisma ORM",
        "Clerk Authentication",
        "Gemini API",
        "Recharts",
        "Tailwind CSS",
      ],

      features: [
        "Suivi des revenus et dépenses.",
        "Tableaux de bord interactifs.",
        "Rapports financiers IA.",
        "Catégorisation automatique des dépenses.",
      ],

      github: "https://github.com/Fred120-code/spendly-saas.git",
      demo: "",
    },

    {
      name: "Project Management SaaS",
      type: "Plateforme collaborative de gestion de projets",

      problem:
        "Les équipes ont besoin d'un espace unique pour organiser les tâches, collaborer et suivre l'avancement des projets.",

      solution:
        "Développement d'une plateforme collaborative avec espaces de travail, tableaux Kanban, rôles utilisateurs, gestion des membres et statistiques des projets.",

      stack: [
        "Next.js",
        "TypeScript",
        "Prisma ORM",
        "PostgreSQL",
        "Tailwind CSS",
        "Inngest",
        "Docker",
      ],

      features: [
        "Workspaces collaboratifs.",
        "Gestion des tâches.",
        "Kanban.",
        "RBAC.",
        "Dashboard analytique.",
      ],

      github: "https://github.com/Fred120-code/project-manager.git",
      demo: "https://project-manager-client-gold.vercel.app/",
    },
  ],

  // =========================
  // FORMATION
  // =========================
  education: [
    {
      school: "Université de Yaoundé I",
      degree: "Licence Informatique",
      period: "2024 — présent",
      description:
        "Fondamentaux de l'informatique : algorithmique, structures de données, systèmes d'exploitation, réseaux, bases de données et programmation.",
    },

    {
      school: "Formation Professionnelle en Développement Web",
      degree: "Développement Full Stack JavaScript",
      period: "2024 — 2025",
      description:
        "Apprentissage pratique du développement frontend et backend avec React, Next.js, Node.js, Express et bases de données.",
    },
  ],

  // =========================
  // EXPÉRIENCE
  // =========================
  experience: [
    {
      company: "Projets personnels & Freelance",
      role: "Développeur Full Stack",
      period: "2025 — Présent",

      achievements: [
        "Conception et développement d'applications SaaS complètes.",
        "Création d'API REST sécurisées.",
        "Gestion de bases de données relationnelles et NoSQL.",
        "Conteneurisation d'applications avec Docker.",
        "Mise en place de pipelines CI/CD avec GitHub Actions.",
      ],
    },
  ],

  // =========================
  // CERTIFICATIONS / APPRENTISSAGE
  // =========================
  learning: [
    "DevOps",
    "DevSecOps",
    "Docker & Docker Compose",
    "GitHub Actions CI/CD",
    "Linux Administration",
    "Réseaux Informatiques",
    "Sécurité des applications Web",
  ],

  // =========================
  // LANGUES
  // =========================
  languages: [
    {
      name: "Français",
      level: "Courant",
    },
    {
      name: "Anglais",
      level: "Technique / Professionnel",
    },
  ],

  // =========================
  // CENTRES D'INTÉRÊT
  // =========================
  interests: [
    "Développement Full Stack",
    "DevOps & Cloud",
    "Cybersécurité",
    "Architecture logicielle",
    "Open Source",
    "Résolution de problèmes",
  ],
};
