export type TeamMember = {
  slug: string;
  name: string;
  role: { it: string; en: string };
  initials: string;
  avatar?: string;
  hasPage: boolean;
  email?: string;
};

export const team: TeamMember[] = [
  {
    slug: "alessandro-botti",
    name: "Alessandro Botti",
    role: { it: "Management & Operations Consultant", en: "Management & Operations Consultant" },
    initials: "AB",
    avatar: "/team/avatar-botti.png",
    hasPage: true,
    email: "alessandro.botti@inema.bo.it",
  },
  // Partners
  { slug: "marco-ricci", name: "Marco Ricci", role: { it: "Partner", en: "Partner" }, initials: "MR", hasPage: false },
  { slug: "laura-ferrari", name: "Laura Ferrari", role: { it: "Partner", en: "Partner" }, initials: "LF", hasPage: false },
  { slug: "giovanni-esposito", name: "Giovanni Esposito", role: { it: "Partner", en: "Partner" }, initials: "GE", hasPage: false },
  { slug: "chiara-mancini", name: "Chiara Mancini", role: { it: "Partner", en: "Partner" }, initials: "CM", hasPage: false },
  { slug: "roberto-conti", name: "Roberto Conti", role: { it: "Partner", en: "Partner" }, initials: "RC", hasPage: false },
  { slug: "elena-russo", name: "Elena Russo", role: { it: "Partner", en: "Partner" }, initials: "ER", hasPage: false },
  { slug: "andrea-lombardi", name: "Andrea Lombardi", role: { it: "Partner", en: "Partner" }, initials: "AL", hasPage: false },
  { slug: "silvia-marino", name: "Silvia Marino", role: { it: "Partner", en: "Partner" }, initials: "SM", hasPage: false },
  // Senior Consultants
  { slug: "luca-galli", name: "Luca Galli", role: { it: "Senior Consultant", en: "Senior Consultant" }, initials: "LG", hasPage: false },
  { slug: "federica-barbieri", name: "Federica Barbieri", role: { it: "Senior Consultant", en: "Senior Consultant" }, initials: "FB", hasPage: false },
  { slug: "matteo-colombo", name: "Matteo Colombo", role: { it: "Senior Consultant", en: "Senior Consultant" }, initials: "MC", hasPage: false },
  { slug: "valentina-grasso", name: "Valentina Grasso", role: { it: "Senior Consultant", en: "Senior Consultant" }, initials: "VG", hasPage: false },
  { slug: "davide-moretti", name: "Davide Moretti", role: { it: "Senior Consultant", en: "Senior Consultant" }, initials: "DM", hasPage: false },
  { slug: "anna-coppola", name: "Anna Coppola", role: { it: "Senior Consultant", en: "Senior Consultant" }, initials: "AC", hasPage: false },
  { slug: "stefano-villa", name: "Stefano Villa", role: { it: "Senior Consultant", en: "Senior Consultant" }, initials: "SV", hasPage: false },
  { slug: "irene-santoro", name: "Irene Santoro", role: { it: "Senior Consultant", en: "Senior Consultant" }, initials: "IS", hasPage: false },
  { slug: "emanuele-rinaldi", name: "Emanuele Rinaldi", role: { it: "Senior Consultant", en: "Senior Consultant" }, initials: "ER", hasPage: false },
  { slug: "paola-caruso", name: "Paola Caruso", role: { it: "Senior Consultant", en: "Senior Consultant" }, initials: "PC", hasPage: false },
  { slug: "tommaso-ferri", name: "Tommaso Ferri", role: { it: "Senior Consultant", en: "Senior Consultant" }, initials: "TF", hasPage: false },
  { slug: "giulia-pellegrini", name: "Giulia Pellegrini", role: { it: "Senior Consultant", en: "Senior Consultant" }, initials: "GP", hasPage: false },
  // Consultants
  { slug: "nicola-costa", name: "Nicola Costa", role: { it: "Consultant", en: "Consultant" }, initials: "NC", hasPage: false },
  { slug: "sara-damico", name: "Sara D'Amico", role: { it: "Consultant", en: "Consultant" }, initials: "SD", hasPage: false },
  { slug: "christian-longo", name: "Christian Longo", role: { it: "Consultant", en: "Consultant" }, initials: "CL", hasPage: false },
  { slug: "marta-monti", name: "Marta Monti", role: { it: "Consultant", en: "Consultant" }, initials: "MM", hasPage: false },
  { slug: "jacopo-leone", name: "Jacopo Leone", role: { it: "Consultant", en: "Consultant" }, initials: "JL", hasPage: false },
  { slug: "beatrice-fiore", name: "Beatrice Fiore", role: { it: "Consultant", en: "Consultant" }, initials: "BF", hasPage: false },
  { slug: "marco-sanna", name: "Marco Sanna", role: { it: "Consultant", en: "Consultant" }, initials: "MS", hasPage: false },
  { slug: "alessia-vitale", name: "Alessia Vitale", role: { it: "Consultant", en: "Consultant" }, initials: "AV", hasPage: false },
  { slug: "enrico-testa", name: "Enrico Testa", role: { it: "Consultant", en: "Consultant" }, initials: "ET", hasPage: false },
];
