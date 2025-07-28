// // src/components/sections/Projects/types/index.ts
// import banner from '../../../../assets/projects/portfolio/banner.png';
// import degloule from '../../../../assets/projects/degloul/degloul.png';


// export interface ProjectTag {
//   name: string;
//   color: string; // Code couleur hexadécimal
// }

// export interface Project {
//   id: string;
//   title: string;
//   description: string;
//   type: 'Professionnel' | 'Personnel' | 'Académique'; // Type de projet,
//   date: string;
//   imageUrl: string;
//   tags: ProjectTag[];
//   githubUrl?: string; // Optionnel
//   demoUrl?: string; // Optionnel
//   featured?: boolean; // Projets mis en avant
//   inProgress?: boolean; // Projets en cours
//   category?: 'web' | 'mobile' | 'other'; // Nouvelle propriété pour la catégorie
// }

// // Données des projets
// export const projectsData: Project[] = [
//   {
//     id: 'portfolio',
//     title: 'Portfolio Personnel',
//     type: 'Personnel',
//     description: 'Mon portfolio dynamique réalisé avec React, Three.js et Framer Motion pour présenter mes compétences et projets avec des animations 3D.',
//     date: 'Avril 2025',
//     imageUrl: banner,
//     tags: [
//       { name: 'React', color: '#61DAFB' },
//       { name: 'TypeScript', color: '#3178C6' },
//       { name: 'Three.js', color: '#000000' },
//       { name: 'Tailwind CSS', color: '#06B6D4' }
//     ],
//     githubUrl: 'https://github.com/astouafk/portfolio',
//     featured: true,
//     category: 'web'
//   },
//   {
//     id: 'ecommerce',
//     title: 'Plateforme Degloul',
//     type: 'Professionnel',
//     description: 'Application mobile qui promouvoit la littérature sous format audio, avec une synchronisation texte',
//     date: 'Mars 2025',
//     imageUrl: degloule,
//     tags: [
//       { name: 'Dart', color: '#61DAFB' },
//       { name: 'Flutter', color: '#339933' },
//       { name: 'MongoDB', color: '#47A248' },
//       { name: 'Java', color: '#000000' }
//     ],
//     githubUrl: 'https://github.com/astouafk/ecommerce',
//     // demoUrl: 'https://ecommerce-demo.com',
//     category: 'mobile'
//   },
//   {
//     id: 'mobapp',
//     type: 'Personnel',
//     title: 'Application Fa-Counting',
//     description: 'Application mobile d\'inventaire pour le recesencement des matériaux d\'entreprise en Cote d\'ivoire',
//     date: 'Juin 2025',
//     imageUrl: '/assets/projects/mobile-app.jpg',
//     tags: [
//       { name: 'Flutter', color: '#02569B' },
//       { name: 'Dart', color: '#0175C2' },
//       { name: 'Firebase', color: '#FFCA28' }
//     ],
//     githubUrl: 'https://github.com/astouafk/fitness-app',
//     category: 'mobile'
//   },
//   {
//     id: 'paygo',
//     type: 'Professionnel',
//     title: 'Application Paygo',
//     description: 'Paygo est une solution tout-en-un qui permet aux entreprises, d\'accepter des paiements marchands via Wave, Orange Money, etc.',
//     date: 'Avril 2025',
//     imageUrl: '/assets/projects/dashboard.jpg',
//     tags: [
//       { name: 'React', color: '#61DAFB' },
//       { name: 'D3.js', color: '#F9A03C' },
//       { name: 'API REST', color: '#0096AA' }
//     ],
//     githubUrl: 'https://github.com/astouafk/analytics-dashboard',
//     category: 'web'
//   },
//   {
//     id: 'faggu Assurance',
//     type: 'Professionnel',
//     title: 'Plateforme Faggu Assurance',
//     description: 'Plateforme de messagerie instantanée avec fonctionnalités de chat en groupe, messages privés et partage de médias.',
//     date: 'Juillet 2025',
//     imageUrl: '/assets/projects/chatapp.jpg',
//     tags: [
//       { name: 'Socket.io', color: '#010101' },
//       { name: 'React', color: '#61DAFB' },
//       { name: 'Node.js', color: '#339933' },
//       { name: 'MongoDB', color: '#47A248' }
//     ],
//     demoUrl: 'https://chat-app-demo.com',
//     category: 'web'
//   },
//   {
//     id: 'Afkash',
//     type: 'Personnel',
//     title: 'Plateforme simulative de transfert d\'argent inter-opérateur',
//     description: 'Plateforme qui simule le transfert d\'argent entre différents opérateurs de téléphonie mobile en Afrique.',
//     date: 'En cours',
//     imageUrl: '/assets/projects/ai-learning.jpg',
//     tags: [
//       { name: 'Next.js', color: '#000000' },
//       { name: 'Python', color: '#3776AB' },
//       { name: 'TensorFlow', color: '#FF6F00' },
//       { name: 'FastAPI', color: '#009688' }
//     ],
//     inProgress: true,
//     category: 'web'
//   }
// ];




// 1️⃣ src/components/sections/Projects/types/index.ts - TYPES ÉTENDUS
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

// 🎯 NOUVEAU TYPE POUR LES FILTRES
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
    id: 'ecommerce',
    title: 'Plateforme Degloul',
    type: 'Professionnel', // ✅ Bien défini
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
    id: 'mobapp',
    type: 'Professionnel', // ✅ Bien défini
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
    type: 'Professionnel', // ✅ Bien défini
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
    id: 'faggu Assurance',
    type: 'Professionnel', // ✅ Bien défini
    title: 'Plateforme Faggu Assurance',
    description: 'Plateforme d’assurance destinée à la protection des biens et des personnes au Sénégal, avec des offres pour les particuliers et les professionnels.',
    date: 'Juillet 2025',
    imageUrl: faggubanner,
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
    id: 'KaayEat',
    type: 'Personnel', // ✅ Bien défini
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

// 🎯 FONCTIONS UTILITAIRES POUR LES FILTRES
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

// 🎯 FONCTION POUR APPLIQUER TOUS LES FILTRES
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