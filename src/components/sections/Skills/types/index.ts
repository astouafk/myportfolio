// src/components/sections/Skills/types/index.ts

// Types des catégories de compétences
export type SkillsCategory = 'frontend' | 'backend' | 'mobile' | 'transversal';

// Interface pour une compétence individuelle
export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string; // Optional path to icon
  color?: string; // Optional color for the bubble
}

// Données des compétences par catégorie
export const skillsData: Record<SkillsCategory, Skill[]> = {
  frontend: [
    { name: 'HTML5', level: 90, color: '#E34F26' },
    { name: 'CSS3', level: 85, color: '#1572B6' },
    { name: 'JavaScript', level: 90, color: '#F7DF1E' },
    { name: 'TypeScript', level: 75, color: '#3178C6' },
    { name: 'React', level: 85, color: '#61DAFB' },
    { name: 'Tailwind CSS', level: 80, color: '#06B6D4' },
    { name: 'Bootstrap', level: 85, color: '#7952B3' },
    { name: 'Responsive Design', level: 90, color: '#38B2AC' }
  ],
  backend: [
    { name: 'Node.js', level: 85, color: '#339933' },
    { name: 'Express', level: 80, color: '#008B8B' },
    { name: 'PHP', level: 75, color: '#777BB4' },
    { name: 'Laravel', level: 70, color: '#FF2D20' },
    { name: 'API REST', level: 85, color: '#0096AA' },
    { name: 'MongoDB', level: 75, color: '#47A248' },
    { name: 'MySQL', level: 80, color: '#4479A1' },
    { name: 'PostgreSQL', level: 75, color: '#336791' },
    { name: 'Firebase', level: 70, color: '#FFCA28' }
  ],
  mobile: [
    { name: 'Flutter', level: 80, color: '#02569B' },
    { name: 'Dart', level: 75, color: '#0175C2' },
    { name: 'GetX', level: 75, color: '#8A12AE' },
    { name: 'Riverpod', level: 70, color: '#E91E63' },
    { name: 'Bloc', level: 70, color: '#00C4CC' },
    { name: 'Responsive Mobile', level: 80, color: '#673AB7' }
  ],
  transversal: [
    { name: 'Git / GitHub / GitLab', level: 85, color: '#F05032' },
    { name: 'Agile / Scrum', level: 75, color: '#4EA7FC' },
    { name: 'UI/UX Design', level: 70, color: '#FF7F50' },
    { name: 'Figma', level: 70, color: '#F24E1E' },
    { name: 'Canva', level: 80, color: '#00C4CC' },
    { name: 'Jira/Trello', level: 75, color: '#0052CC' },
    { name: 'Docker', level: 65, color: '#2496ED' },
    { name: 'Tests', level: 70, color: '#9B51E0' },
    { name: 'Communication', level: 90, color: '#4ADE80' },
    { name: 'Travail d\'équipe', level: 90, color: '#3B82F6' }
  ]
};

// Description des catégories
export const categoryDescriptions: Record<SkillsCategory, string> = {
  frontend: 'Maîtrise des technologies modernes pour la création d\'interfaces utilisateur dynamiques et réactives.',
  backend: 'Conception de serveurs robustes et sécurisés, gestion des bases de données et des API.',
  mobile: 'Développement d\'applications mobiles performantes et intuitives avec Flutter.',
  transversal: 'Compétences diverses essentielles pour travailler efficacement en équipe et gérer des projets.'
};