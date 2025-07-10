// src/components/sections/Projects/types/index.ts
import banner from '../../../../assets/projects/portfolio/banner.png';
import degloule from '../../../../assets/projects/degloul/degloul.png';


export interface ProjectTag {
  name: string;
  color: string; // Code couleur hexadécimal
}

export interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  tags: ProjectTag[];
  githubUrl?: string; // Optionnel
  demoUrl?: string; // Optionnel
  featured?: boolean; // Projets mis en avant
  inProgress?: boolean; // Projets en cours
  category?: 'web' | 'mobile' | 'other'; // Nouvelle propriété pour la catégorie
}

// Données des projets
export const projectsData: Project[] = [
  {
    id: 'portfolio',
    title: 'Portfolio Personnel',
    description: 'Mon portfolio dynamique réalisé avec React, Three.js et Framer Motion pour présenter mes compétences et projets avec des animations 3D.',
    date: 'Avril 2024',
    imageUrl: banner,
    tags: [
      { name: 'React', color: '#61DAFB' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'Three.js', color: '#000000' },
      { name: 'Tailwind CSS', color: '#06B6D4' }
    ],
    githubUrl: 'https://github.com/astouafk/portfolio',
    featured: true,
    category: 'web'
  },
  {
    id: 'ecommerce',
    title: 'Plateforme Degloul',
    description: 'Application mobile qui promouvoit la littérature sous format audio, avec une synchronisation texte',
    date: 'Janvier 2025',
    imageUrl: degloule,
    tags: [
      { name: 'Dart', color: '#61DAFB' },
      { name: 'Flutter', color: '#339933' },
      { name: 'MongoDB', color: '#47A248' },
      { name: 'Java', color: '#000000' }
    ],
    githubUrl: 'https://github.com/astouafk/ecommerce',
    // demoUrl: 'https://ecommerce-demo.com',
    category: 'mobile'
  },
  {
    id: 'mobapp',
    title: 'Application de Gestion d\'inventaire',
    description: 'Application mobile d\'inventaire pour le recesencement des matériaux d\'entreprise',
    date: 'Novembre 2023',
    imageUrl: '/assets/projects/mobile-app.jpg',
    tags: [
      { name: 'Flutter', color: '#02569B' },
      { name: 'Dart', color: '#0175C2' },
      { name: 'Firebase', color: '#FFCA28' }
    ],
    githubUrl: 'https://github.com/astouafk/fitness-app',
    category: 'mobile'
  },
  {
    id: 'dashboard',
    title: 'Dashboard Analytique',
    description: 'Dashboard interactif pour la visualisation de données avec graphiques dynamiques et tableaux de bord personnalisables.',
    date: 'Août 2023',
    imageUrl: '/assets/projects/dashboard.jpg',
    tags: [
      { name: 'React', color: '#61DAFB' },
      { name: 'D3.js', color: '#F9A03C' },
      { name: 'API REST', color: '#0096AA' }
    ],
    githubUrl: 'https://github.com/astouafk/analytics-dashboard',
    category: 'web'
  },
  {
    id: 'chatapp',
    title: 'Application de Chat en Temps Réel',
    description: 'Plateforme de messagerie instantanée avec fonctionnalités de chat en groupe, messages privés et partage de médias.',
    date: 'Mai 2023',
    imageUrl: '/assets/projects/chatapp.jpg',
    tags: [
      { name: 'Socket.io', color: '#010101' },
      { name: 'React', color: '#61DAFB' },
      { name: 'Node.js', color: '#339933' },
      { name: 'MongoDB', color: '#47A248' }
    ],
    demoUrl: 'https://chat-app-demo.com',
    category: 'web'
  },
  {
    id: 'newproject',
    title: 'Plateforme AI d\'Apprentissage',
    description: 'Plateforme d\'apprentissage adaptative utilisant l\'IA pour personnaliser les parcours de formation. Développement en cours.',
    date: 'En cours',
    imageUrl: '/assets/projects/ai-learning.jpg',
    tags: [
      { name: 'Next.js', color: '#000000' },
      { name: 'Python', color: '#3776AB' },
      { name: 'TensorFlow', color: '#FF6F00' },
      { name: 'FastAPI', color: '#009688' }
    ],
    inProgress: true,
    category: 'web'
  }
];