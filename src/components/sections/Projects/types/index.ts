// src/components/sections/Projects/types/index.ts - TYPES ÉTENDUS
import banner from '../../../../assets/projects/portfolio/banner.png';
import degloule from '../../../../assets/projects/degloul/degloul.webp';
import facounting2 from '../../../../assets/screenshots/facounting/facounting2.png';
import paygobanner from '../../../../assets/screenshots/paygo/paygo-banner.png';
import faggubanner from '../../../../assets/screenshots/faggu/faggu-banner.png';
import kaayeatbanner from '../../../../assets/screenshots/kaayeat/kaayeat-banner.png';



export interface ProjectTag {
  name: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  type: 'Professionnel' | 'Personnel' | 'Académique';
  date: string;
  imageUrl: string;
  tags: ProjectTag[];
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  inProgress?: boolean;
  category?: 'web' | 'mobile' | 'other';
}

// NOUVEAU TYPE POUR LES FILTRES
export type ProjectTypeFilter = 'all' | 'Professionnel' | 'Personnel' | 'Académique';
export type ProjectCategoryFilter = 'all' | 'web' | 'mobile';

// Données des projets (identiques, juste pour référence)
export const projectsData: Project[] = [
  {
    id: 'portfolio',
    title: 'Portfolio Personnel',
    type: 'Personnel', // ✅ Bien défini
    description: 'Mon portfolio dynamique réalisé avec React, Three.js et Framer Motion pour présenter mes compétences et projets avec des animations 3D.',
    date: 'Avril 2025',
    imageUrl: banner,
    tags: [
      { name: 'React', color: '#61DAFB' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'Three.js', color: '#61DAFB' },
      { name: 'Tailwind CSS', color: '#06B6D4' }
    ],
    githubUrl: 'https://github.com/astouafk/portfolio',
    featured: true,
    category: 'web'
  },
  {
    id: 'degloul',
    title: 'Plateforme Degloul',
    type: 'Professionnel', 
    description: 'Application mobile qui promouvoit la littérature sous format audio, avec une synchronisation texte',
    date: 'Mars 2025',
    imageUrl: degloule,
    tags: [
      { name: 'Dart', color: '#61DAFB' },
      { name: 'Flutter', color: '#339933' },
      { name: 'MongoDB', color: '#47A248' },
    ],
    githubUrl: 'https://github.com/astouafk/ecommerce',
    category: 'mobile'
  },
  {
    id: 'favounting',
    type: 'Professionnel', 
    title: 'Application Fa-Counting',
    description: 'Application mobile d\'inventaire pour le recesencement des matériaux d\'entreprise en Cote d\'ivoire',
    date: 'Juin 2025',
    imageUrl: facounting2,
    tags: [
      { name: 'Flutter', color: '#02569B' },
      { name: 'Dart', color: '#0175C2' },
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
    imageUrl: paygobanner,
    tags: [
      { name: 'React', color: '#61DAFB' },
      { name: 'D3.js', color: '#F9A03C' },
      { name: 'API REST', color: '#0096AA' }
    ],
    githubUrl: 'https://github.com/astouafk/analytics-dashboard',
    category: 'web'
  },
  {
    id: 'kaayeat',
    type: 'Personnel', 
    title: 'KaayEat',
    description: 'Projet de design thinking explorant l\'identité visuelle et l\'expérience utilisateur d\'un restaurant fictif, sans maquette.',
    date: 'Juillet 2025',
    imageUrl: kaayeatbanner,
    tags: [
      { name: 'React', color: '#009688' },
      { name: 'Python', color: '#3776AB' },
      { name: 'TensorFlow', color: '#FF6F00' },
      { name: 'FastAPI', color: '#009688' }
    ],
    inProgress: true,
    category: 'web'
  }
];

// FONCTIONS UTILITAIRES POUR LES FILTRES
export const getProjectCountByType = (type: ProjectTypeFilter): number => {
  if (type === 'all') return projectsData.length;
  return projectsData.filter(project => project.type === type).length;
};

export const getProjectCountByCategory = (category: ProjectCategoryFilter): number => {
  if (category === 'all') return projectsData.length;
  
  return projectsData.filter(project => {
    if (category === 'web') {
      return project.tags.some(tag => 
        ['React', 'TypeScript', 'Vue', 'Angular', 'Node.js', 'Next.js', 'Tailwind CSS'].includes(tag.name)
      );
    }
    if (category === 'mobile') {
      return project.tags.some(tag => 
        ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Android', 'iOS', 'Dart'].includes(tag.name)
      );
    }
    return false;
  }).length;
};

// FONCTION POUR APPLIQUER TOUS LES FILTRES
export const filterProjects = (
  projects: Project[],
  typeFilter: ProjectTypeFilter,
  categoryFilter: ProjectCategoryFilter,
  searchQuery: string
): Project[] => {
  return projects.filter(project => {
    // Filtre par type
    if (typeFilter !== 'all' && project.type !== typeFilter) return false;
    
    // Filtre par catégorie
    if (categoryFilter === 'web' && !project.tags.some(tag => 
      ['React', 'TypeScript', 'Vue', 'Angular', 'Node.js', 'Next.js', 'Tailwind CSS'].includes(tag.name)
    )) return false;
    
    if (categoryFilter === 'mobile' && !project.tags.some(tag => 
      ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Android', 'iOS', 'Dart'].includes(tag.name)
    )) return false;
    
    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.type.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.name.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
};