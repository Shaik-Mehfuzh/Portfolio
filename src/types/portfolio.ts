export type ProjectCategory = 'all' | 'ai-ml' | 'vision' | 'analytics' | 'gen-ai' | 'engineering';

export type ProjectStatus = 'Completed' | 'Prototype' | 'In Progress';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  status: ProjectStatus;
  statusColor: string;
  problem: string;
  solution: string;
  whatIBuilt: string;
  technologies: string[];
  metrics?: { label: string; value: string }[];
  highlights: string[];
  githubUrl?: string;
  demoUrl?: string;
  architectureDetails: string;
  hasInteractiveDemo?: boolean;
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  evidence: string;
  highlight?: boolean;
  relatedProject?: string;
}

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  organization: string;
  location?: string;
  type: 'education' | 'internship' | 'hackathon' | 'certification';
  typeLabel: string;
  description: string;
  keyPoints: string[];
  tags: string[];
  status: 'Completed' | 'Ongoing';
  credentialUrl?: string;
}
