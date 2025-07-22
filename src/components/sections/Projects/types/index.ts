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
  type: 'Professionnel' | 'Personnel' | 'Académique'; // Type de projet,
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
    type: 'Personnel',
    description: 'Mon portfolio dynamique réalisé avec React, Three.js et Framer Motion pour présenter mes compétences et projets avec des animations 3D.',
    date: 'Avril 2025',
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
    type: 'Professionnel',
    description: 'Application mobile qui promouvoit la littérature sous format audio, avec une synchronisation texte',
    date: 'Mars 2025',
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
    type: 'Personnel',
    title: 'Application Fa-Counting',
    description: 'Application mobile d\'inventaire pour le recesencement des matériaux d\'entreprise en Cote d\'ivoire',
    date: 'Juin 2025',
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
    id: 'paygo',
    type: 'Professionnel',
    title: 'Application Paygo',
    description: 'Paygo est une solution tout-en-un qui permet aux entreprises, d\'accepter des paiements marchands via Wave, Orange Money, etc.',
    date: 'Avril 2025',
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
    id: 'faggu Assurance',
    type: 'Professionnel',
    title: 'Plateforme Faggu Assurance',
    description: 'Plateforme de messagerie instantanée avec fonctionnalités de chat en groupe, messages privés et partage de médias.',
    date: 'Juillet 2025',
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
    id: 'Afkash',
    type: 'Personnel',
    title: 'Plateforme simulative de transfert d\'argent inter-opérateur',
    description: 'Plateforme qui simule le transfert d\'argent entre différents opérateurs de téléphonie mobile en Afrique.',
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