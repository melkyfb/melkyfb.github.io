export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  skills: string[];
  referenceFile?: string; // path to letter or document
}

export interface Certification {
  name: string;
  issuer: string;
  status: 'active' | 'roadmap-2026';
  date?: string;
  credlyUrl?: string;
  referenceFile?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details?: string;
  referenceFile?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export const PERSONAL_DATA = {
  name: "Melky Fernandes",
  titles: ["Software Engineer", "AWS Cloud Architect", "DevSecOps Specialist"],
  location: "Munich, Bavaria, Germany",
  address: "Marktplatz 5, 85.456, Wartenberg, Germany",
  email: "itsalem@gmx.de",
  phone: "0176 3154 7936",
  languages: "Portuguese (Native), English (B2), German (A2)",
  birthDate: "08.11.1988",
  tacticalSummary: "Com mais de uma década a atuar em arquiteturas distribuídas, combino a engenharia de software com uma visão agressiva em segurança e infraestrutura cloud. Da escalabilidade na IBM à modernização SaaS na Planerio, a minha missão é projetar plataformas cloud-native resilientes por conceção, seguras por norma e escaláveis sem esforço.",
  socials: {
    linkedin: "https://www.linkedin.com/in/devsalem/",
    github: "https://github.com/melkyfb",
    instagram: "http://instagram.com/melkyfb"
  },
  documents: {
    cv: "/references/Curriculum Vitae.pdf",
    coverLetter: "/references/Example_Cover_Letter_Melky_Fernandes.pdf",
    presentationLetter: "/references/Presentation Letter JobMesse München.pdf",
    horizonsPlan: "/references/New Horizons Melky-Salem Fernandes Batista da Silva Security&IT.pdf"
  }
};

export const EXPERIENCES: Experience[] = [
  {
    company: "Independent Professional Development",
    role: "Professional Development & Specialized Training",
    period: "06.2025 - Present",
    description: [
      "German A2 classes, AI Agent Architectures, and Advanced Cybersecurity.",
      "Preparing for CompTIA Security+, CompTIA A+, and CompTIA CySA+ certifications."
    ],
    skills: ["German A2", "AI Agents", "Cybersecurity", "CompTIA Exam Prep"],
   },
  {
    company: "Planerio",
    role: "Software Developer (Full Stack)",
    period: "07.2022 - 05.2025",
    description: [
      "Utilized AWS services (Lambda, S3, Quicksight) to enhance infrastructure and data analysis.",
      "Employed Terraform for Infrastructure as Code (IaC) automation to achieve efficient SaaS scaling.",
      "Developed the frontend using TypeScript and React to design user-friendly, high-performance interfaces.",
      "Maintained and optimized the existing SaaS platform, guaranteeing system stability.",
      "Performed technical upgrades and modernized the software architecture for application scalability.",
      "Integrated and expanded backend functionalities with Python to improve data processing and analysis."
    ],
    skills: ["React", "TypeScript", "AWS (Lambda, S3, Quicksight)", "Terraform", "Python", "Docker", "SaaS Scaling"],
    referenceFile: "/references/Planerio_Reference_Letter.pdf"
  },
  {
    company: "Planerio (Outsourced)",
    role: "Software Developer (Full Stack)",
    period: "11.2019 - 06.2022",
    description: [
      "Built and improved core features with PHP and Symfony to grow the SaaS platform.",
      "Fixed critical issues across backend and frontend to keep everything running smoothly.",
      "Created interactive screens with TypeScript and React.",
      "Upgraded legacy parts of the system to support future growth."
    ],
    skills: ["PHP", "Symfony", "React", "TypeScript", "MySQL", "Legacy Modernization"],
    referenceFile: "/references/Planerio_Reference_Letter.pdf"
  },
  {
    company: "InnoScripta",
    role: "Software Developer (Full Stack)",
    period: "05.2019 - 10.2019",
    description: [
      "Front-End development using NodeJS, ReactJS, Redux, and Rest APIs.",
      "Front-End secondary support in PHP Native and AngularJS.",
      "Back-End development using Laravel, Eloquent, and PHP Native."
    ],
    skills: ["NodeJS", "ReactJS", "Redux", "Laravel", "Eloquent", "AngularJS"]
  },
  {
    company: "IBM (Outsourced)",
    role: "Systems Analyst",
    period: "04.2016 - 04.2019",
    description: [
      "Microservices integrations development and enterprise support.",
      "Java and JavaScript integrations maintenance.",
      "XML/XSLT processing optimization with multithreading.",
      "Developed custom Vue/NodeJS integration monitoring tools."
    ],
    skills: ["Java", "JavaScript", "XML/XSLT", "Multithreading", "Vue", "NodeJS", "WebSphere"]
  },
  {
    company: "161 Soluções",
    role: "Software Developer",
    period: "12.2013 - 04.2016",
    description: [
      "Developed native Android applications using Java.",
      "Backend Javascript development and custom web automation projects.",
      "C++ development for microcontrollers and Python scripts for Raspberry Pi."
    ],
    skills: ["Android Studio", "Java", "NodeJS", "C++", "Python", "Raspberry Pi"]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services (AWS)",
    status: "active",
    date: "07.2022",
    credlyUrl: "https://credly.com/badges/7df0dc56-c572-49e4-a560-8bbdf3623069"
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    status: "active",
    date: "06.2022",
    credlyUrl: "https://credly.com/badges/0332c38f-6a07-4fed-979d-7d6fcaefb320"
  },
  {
    name: "Agile Explorer",
    issuer: "IBM",
    status: "active",
    date: "01.2019",
    credlyUrl: "https://credly.com/badges/01ab904a-2a7a-4343-956a-be240da9489c"
  },
  {
    name: "CompTIA Security+",
    issuer: "CompTIA (Queued)",
    status: "roadmap-2026",
    date: "July 2026",
    referenceFile: "/references/CompTIA Security+ Certification.pdf"
  },
  {
    name: "CompTIA Cybersecurity Analyst (CySA+)",
    issuer: "CompTIA (Queued)",
    status: "roadmap-2026",
    date: "August 2026",
    referenceFile: "/references/CompTIA Cybersecurity Analyst Certification (CySA+).pdf"
  },
  {
    name: "CompTIA A+",
    issuer: "CompTIA (Queued)",
    status: "roadmap-2026",
    date: "September 2026",
    referenceFile: "/references/CompTIA A+ Certification - New Horizons.pdf"
  }
];

export const EDUCATION: Education[] = [
  {
    degree: "Specialization in Data Science",
    institution: "Pythagoras University",
    period: "01.2021 - 06.2022",
    details: "OOP, Machine Learning, Deep Learning, and Predictive Model Development.",
    referenceFile: "/references/certificado pos graduacao ciencia de dados.pdf"
  },
  {
    degree: "Analysis and Systems Development",
    institution: "Pythagoras University",
    period: "01.2016 - 12.2019",
    details: "Software Engineering Principles (UML, OOP), and Data Quality. Validated by ZAB (Germany).",
    referenceFile: "/references/Diploma Análise e Desenvolvimento de Sistemas.pdf"
  }
];

export const SKILL_MATRIX: SkillCategory[] = [
  {
    category: "Cloud & Infrastructure",
    items: ["AWS (Lambda, S3, IAM, ECS, VPC)", "Docker & Kubernetes", "Infrastructure as Code (Terraform)", "Cloud Security Hardening"]
  },
  {
    category: "Security & DevSecOps",
    items: ["CI/CD Pipelines", "Vulnerability Scanning", "Security Audits", "IAM Policy Auditing"]
  },
  {
    category: "Software Engineering",
    items: ["React & TypeScript", "PHP (Symfony, Laravel)", "Java & Node.js", "Python & Machine Learning", "Distributed Architectures"]
  }
];
