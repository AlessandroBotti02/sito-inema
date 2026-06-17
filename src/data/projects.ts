export type Project = {
  id: string;
  title: string;
  titleIt: string;
  industry: string;
  industryIt: string;
  description: string;
  descriptionIt: string;
  tags: string[];
  mockupType: "gantt" | "dashboard" | "table" | "generic";
  year: string;
};

export const projects: Project[] = [
  {
    id: "erp-mes",
    title: "ERP-MES Planning App",
    titleIt: "App di Pianificazione ERP-MES",
    industry: "Fashion & Luxury",
    industryIt: "Moda e Lusso",
    description:
      "Hybrid production planning system combining manual scheduling with automated logic and multi-level approval workflows. MES-style views for real-time production monitoring.",
    descriptionIt:
      "Sistema di pianificazione della produzione ibrida con scheduling manuale e automatico, flussi di approvazione multi-livello e viste stile MES per il monitoraggio in tempo reale.",
    tags: ["React", "TypeScript", "Python", "PostgreSQL", "MES"],
    mockupType: "gantt",
    year: "2024",
  },
];
