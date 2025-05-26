// // src/components/sections/ProjectDetail/types/index.ts
// import { Project, ProjectTag } from '../../Projects/types';
// import banner from '../../../../assets/projects/portfolio/banner.png';
// import reactLogo from '../../../../assets/tech/react.svg';
// import typescriptLogo from '../../../../assets/tech/typescript.svg';
// import threejsLogo from '../../../../assets/tech/threejs.svg';
// import tailwindLogo from '../../../../assets/tech/tailwind.svg';
// import framerLogo from '../../../../assets/tech/framer.svg';
// import viteLogo from '../../../../assets/tech/vite.svg';
// import portDemo from '../../../../assets/projects/portfolio/LaDemoDegloul.mp4';


// // Types pour les captures d'écran
// export interface Screenshot {
//   id: string;
//   imageUrl: string;
//   caption: string;
// }

// // Types pour les technologies avec logos
// export interface Technology {
//   name: string;
//   logo: string;
//   color: string;
// }

// // Extension du type Project pour inclure les détails supplémentaires
// export interface ProjectDetail extends Project {
//   longDescription: string;
//   videoUrl?: string;
//   screenshots: Screenshot[];
//   technologies: Technology[];
//   challenges?: string[];
//   solutions?: string[];
//   keyFeatures?: string[];
// }

// // Exemple de données détaillées pour un projet
// export const portfolioDetail: ProjectDetail = {
//   id: 'portfolio',
//   title: 'Portfolio Personnel',
//   description: 'Mon portfolio dynamique réalisé avec React, Three.js et Framer Motion pour présenter mes compétences et projets avec des animations 3D.',
//   longDescription: `
//     Ce portfolio moderne a été conçu et développé entièrement par mes soins pour présenter mon travail et mes compétences de développeur web. 
    
//     L'objectif était de créer une expérience interactive et immersive qui montre non seulement mes projets, mais aussi mes capacités techniques à travers l'implémentation même du site.
    
//     J'ai utilisé React avec TypeScript comme base, en y ajoutant Three.js pour les effets 3D et Framer Motion pour les animations. Le design est responsive et optimisé pour tous les appareils, des smartphones aux grands écrans.
    
//     Une attention particulière a été portée à l'accessibilité et aux performances, avec des optimisations comme le lazy loading, le code splitting et la détection des préférences utilisateur (mode sombre, animations réduites).
//   `,
//   date: 'Avril 2024',
//   imageUrl: banner,
//   tags: [
//     { name: 'React', color: '#61DAFB' },
//     { name: 'TypeScript', color: '#3178C6' },
//     { name: 'Three.js', color: '#000000' },
//     { name: 'Tailwind CSS', color: '#06B6D4' }
//   ],
//   githubUrl: 'https://github.com/astouafk/portfolio',
//   videoUrl: portDemo,
//   featured: true,
//   technologies: [
//     { name: 'React', logo: reactLogo, color: '#61DAFB' },
//     { name: 'TypeScript', logo: typescriptLogo, color: '#3178C6' },
//     { name: 'Three.js', logo: threejsLogo, color: '#3178C6' },
//     { name: 'Tailwind CSS', logo: tailwindLogo, color: '#06B6D4' },
//     { name: 'Framer Motion', logo: framerLogo, color: '#0055FF' },
//     { name: 'Vite', logo: viteLogo, color: '#646CFF' }
//   ],
//   screenshots: [
//     { id: 'scr1', imageUrl: '/assets/screenshots/portfolio-1.jpg', caption: 'Page d\'accueil avec effets 3D' },
//     { id: 'scr2', imageUrl: '/assets/screenshots/portfolio-2.jpg', caption: 'Section compétences avec visualisation interactive' },
//     { id: 'scr3', imageUrl: '/assets/screenshots/portfolio-3.jpg', caption: 'Timeline des projets' },
//     { id: 'scr4', imageUrl: '/assets/screenshots/portfolio-4.jpg', caption: 'Section contact avec formulaire' },
//     { id: 'scr5', imageUrl: '/assets/screenshots/portfolio-5.jpg', caption: 'Vue responsive sur mobile' }
//   ],
//   challenges: [
//     'Optimisation des performances avec des modèles 3D',
//     'Création d\'animations fluides sans impact sur les performances',
//     'Développement d\'une expérience responsive qui fonctionne bien sur tous les appareils',
//     'Équilibre entre design créatif et accessibilité'
//   ],
//   solutions: [
//     'Utilisation de patterns d\'optimisation comme code splitting et lazy loading',
//     'Adaptation dynamique du niveau de détail selon l\'appareil',
//     'Tests rigoureux sur différents appareils et navigateurs',
//     'Respect des préférences d\'accessibilité avec prefers-reduced-motion'
//   ],
//   keyFeatures: [
//     'Animations et interactions 3D immersives',
//     'Design responsive adaptable à tous les écrans',
//     'Performance optimisée même avec des effets complexes',
//     'Respect des standards d\'accessibilité'
//   ]
// };

// export const ecommerceDetail: ProjectDetail = {
//   id: 'ecommerce',
//   title: 'Plateforme E-commerce',
//   description: 'Application e-commerce complète avec panier, paiement, système d\'authentification et gestion des commandes.',
//   longDescription: `
//     Cette plateforme e-commerce est une solution complète que j'ai développée pour démontrer mes compétences en création d'applications web full-stack.
    
//     Le projet comprend toutes les fonctionnalités essentielles d'un site de commerce en ligne moderne: catalogue de produits, système de recherche et filtrage, panier d'achat, processus de paiement sécurisé, authentification des utilisateurs, et un tableau de bord d'administration.
    
//     Côté frontend, j'ai utilisé React avec des composants réutilisables et un état global géré avec Redux. Côté backend, j'ai implémenté une API RESTful avec Node.js et Express, connectée à une base de données MongoDB.
    
//     Une attention particulière a été portée à la sécurité, avec une authentification JWT, le chiffrement des données sensibles, et la validation des entrées utilisateur.
//   `,
//   date: 'Janvier 2024',
//   imageUrl: '/assets/projects/ecommerce.jpg',
//   tags: [
//     { name: 'React', color: '#61DAFB' },
//     { name: 'Node.js', color: '#339933' },
//     { name: 'MongoDB', color: '#47A248' },
//     { name: 'Express', color: '#000000' }
//   ],
//   githubUrl: 'https://github.com/astouafk/ecommerce',
//   demoUrl: 'https://ecommerce-demo.com',
//   videoUrl: '/assets/videos/ecommerce-demo.mp4',
//   featured: true,
//   category: 'web',
//   technologies: [
//     { name: 'React', logo: reactLogo, color: '#61DAFB' },
//     { name: 'Redux', logo: reactLogo, color: '#764ABC' },
//     { name: 'Node.js', logo: reactLogo, color: '#339933' },
//     { name: 'Express', logo: reactLogo, color: '#000000' },
//     { name: 'MongoDB', logo: reactLogo, color: '#47A248' },
//     { name: 'JWT', logo: reactLogo, color: '#000000' },
//     { name: 'Stripe', logo: reactLogo, color: '#6772E5' }
//   ],
//   screenshots: [
//     { id: 'scr1', imageUrl: '/assets/screenshots/ecommerce-1.jpg', caption: 'Page d\'accueil avec produits mis en avant' },
//     { id: 'scr2', imageUrl: '/assets/screenshots/ecommerce-2.jpg', caption: 'Catalogue de produits avec filtres' },
//     { id: 'scr3', imageUrl: '/assets/screenshots/ecommerce-3.jpg', caption: 'Page détaillée d\'un produit' },
//     { id: 'scr4', imageUrl: '/assets/screenshots/ecommerce-4.jpg', caption: 'Panier d\'achat et processus de paiement' },
//     { id: 'scr5', imageUrl: '/assets/screenshots/ecommerce-5.jpg', caption: 'Tableau de bord d\'administration' }
//   ],
//   challenges: [
//     'Mise en place d\'un système de paiement sécurisé',
//     'Gestion des stocks en temps réel',
//     'Développement d\'une interface administrateur intuitive',
//     'Optimisation des performances avec une grande quantité de produits'
//   ],
//   solutions: [
//     'Intégration de l\'API Stripe pour les paiements sécurisés',
//     'Utilisation de WebSockets pour les mises à jour en temps réel',
//     'Conception d\'interfaces administrateur avec des tableaux de bord visuels',
//     'Pagination, lazy loading et indexation pour gérer de grands catalogues'
//   ],
//   keyFeatures: [
//     'Authentification sécurisée et gestion des utilisateurs',
//     'Catalogue de produits avec recherche et filtrage avancés',
//     'Système de panier et processus de commande complet',
//     'Interface d\'administration pour la gestion des produits et commandes',
//     'Passerelle de paiement sécurisée intégrée'
//   ]
// };

// // Fonction pour obtenir les détails d'un projet par ID
// export const getProjectDetailById = (id: string): ProjectDetail => {
//   // Pour l'instant, nous retournons juste l'exemple, mais ici vous pourriez
//   // récupérer les données depuis une API ou une autre source
//   return portfolioDetail;
// };








// src/components/sections/ProjectDetail/types/index.ts
import { Project, ProjectTag, projectsData } from '../../Projects/types';
import banner from '../../../../assets/projects/portfolio/banner.png';
import reactLogo from '../../../../assets/tech/react.svg';
import typescriptLogo from '../../../../assets/tech/typescript.svg';
import threejsLogo from '../../../../assets/tech/threejs.svg';
import tailwindLogo from '../../../../assets/tech/tailwind.svg';
import framerLogo from '../../../../assets/tech/framer.svg';
import viteLogo from '../../../../assets/tech/vite.svg';
import portDemo from '../../../../assets/projects/portfolio/LaDemoDegloul.mp4';
//Degloul
import dartLogo from '../../../../assets/tech/dartLogo.png';


// Types pour les captures d'écran
export interface Screenshot {
  id: string;
  imageUrl: string;
  caption: string;
}

// Types pour les technologies avec logos
export interface Technology {
  name: string;
  logo: string;
  color: string;
}

// Extension du type Project pour inclure les détails supplémentaires
export interface ProjectDetail extends Project {
  longDescription: string;
  videoUrl?: string;
  screenshots: Screenshot[];
  technologies: Technology[];
  challenges?: string[];
  solutions?: string[];
  keyFeatures?: string[];
}

// Exemple de données détaillées pour un projet
export const portfolioDetail: ProjectDetail = {
  id: 'portfolio',
  title: 'Portfolio Personnel',
  description: 'Mon portfolio dynamique réalisé avec React, Three.js et Framer Motion pour présenter mes compétences et projets avec des animations 3D.',
  longDescription: `
    Ce portfolio moderne a été conçu et développé entièrement par mes soins pour présenter mon travail et mes compétences de développeur web. 
    
    L'objectif était de créer une expérience interactive et immersive qui montre non seulement mes projets, mais aussi mes capacités techniques à travers l'implémentation même du site.
    
    J'ai utilisé React avec TypeScript comme base, en y ajoutant Three.js pour les effets 3D et Framer Motion pour les animations. Le design est responsive et optimisé pour tous les appareils, des smartphones aux grands écrans.
    
    Une attention particulière a été portée à l'accessibilité et aux performances, avec des optimisations comme le lazy loading, le code splitting et la détection des préférences utilisateur (mode sombre, animations réduites).
  `,
  date: 'Avril 2025',
  imageUrl: banner,
  tags: [
    { name: 'React', color: '#61DAFB' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Three.js', color: '#000000' },
    { name: 'Tailwind CSS', color: '#06B6D4' }
  ],
  githubUrl: 'https://github.com/astouafk/portfolio',
  videoUrl: portDemo,
  featured: true,
  technologies: [
    { name: 'React', logo: reactLogo, color: '#61DAFB' },
    { name: 'TypeScript', logo: typescriptLogo, color: '#3178C6' },
    { name: 'Three.js', logo: threejsLogo, color: '#3178C6' },
    { name: 'Tailwind CSS', logo: tailwindLogo, color: '#06B6D4' },
    { name: 'Framer Motion', logo: framerLogo, color: '#0055FF' },
    { name: 'Vite', logo: viteLogo, color: '#646CFF' }
  ],
  screenshots: [
    { id: 'scr1', imageUrl: '/assets/screenshots/portfolio-1.jpg', caption: 'Page d\'accueil avec effets 3D' },
    { id: 'scr2', imageUrl: '/assets/screenshots/portfolio-2.jpg', caption: 'Section compétences avec visualisation interactive' },
    { id: 'scr3', imageUrl: '/assets/screenshots/portfolio-3.jpg', caption: 'Timeline des projets' },
    { id: 'scr4', imageUrl: '/assets/screenshots/portfolio-4.jpg', caption: 'Section contact avec formulaire' },
    { id: 'scr5', imageUrl: '/assets/screenshots/portfolio-5.jpg', caption: 'Vue responsive sur mobile' }
  ],
  challenges: [
    'Optimisation des performances avec des modèles 3D',
    'Création d\'animations fluides sans impact sur les performances',
    'Développement d\'une expérience responsive qui fonctionne bien sur tous les appareils',
    'Équilibre entre design créatif et accessibilité'
  ],
  solutions: [
    'Utilisation de patterns d\'optimisation comme code splitting et lazy loading',
    'Adaptation dynamique du niveau de détail selon l\'appareil',
    'Tests rigoureux sur différents appareils et navigateurs',
    'Respect des préférences d\'accessibilité avec prefers-reduced-motion'
  ],
  keyFeatures: [
    'Animations et interactions 3D immersives',
    'Design responsive adaptable à tous les écrans',
    'Performance optimisée même avec des effets complexes',
    'Respect des standards d\'accessibilité'
  ]
};

export const ecommerceDetail: ProjectDetail = {
  id: 'ecommerce',
  title: 'Plateforme Degloul',
  description: 'Application e-commerce complète avec panier, paiement, système d\'authentification et gestion des commandes.',
  longDescription: `
Degloul est une plateforme innovante de streaming audio que j’ai contribué à développer pour répondre aux nouveaux usages culturels, en particulier en Afrique où l’oralité tient une place essentielle. Ce projet met en avant l’accès inclusif à la connaissance à travers une large gamme de contenus audios : livres audios, podcasts thématiques, revues de presse et contenus éducatifs. L’objectif est clair : permettre à chacun d’apprendre autrement, même en déplacement, sans contrainte de lecture traditionnelle.

Côté technique, la solution combine une architecture moderne avec une interface intuitive, pensée pour le mobile-first. L’équipe a intégré des technologies web robustes pour garantir une expérience fluide, sécurisée et accessible. Une attention particulière a été portée à la valorisation des contenus locaux et à la collaboration avec narrateurs, auteurs, et créateurs de contenus africains.

Degloul est bien plus qu’une simple bibliothèque audio : c’est une passerelle vers un savoir vivant, moderne et enraciné dans notre culture.
  `,
  date: 'Janvier 2025',
  imageUrl: '/assets/projects/ecommerce.jpg',
  tags: [
    { name: 'Dart', color: '#61DAFB' },
    { name: 'Flutter', color: '#339933' },
    { name: 'MongoDB', color: '#47A248' },
    { name: 'Java', color: '#000000' }
  ],
  githubUrl: 'https://github.com/astouafk/ecommerce',
  demoUrl: 'https://ecommerce-demo.com',
  videoUrl: '/assets/videos/ecommerce-demo.mp4',
  featured: true,
  category: 'web',
  technologies: [
    { name: 'Dart', logo: dartLogo, color: '#61DAFB' },
    { name: 'Redux', logo: reactLogo, color: '#764ABC' },
    { name: 'Node.js', logo: reactLogo, color: '#339933' },
    { name: 'Express', logo: reactLogo, color: '#000000' },
    { name: 'MongoDB', logo: reactLogo, color: '#47A248' },
    { name: 'JWT', logo: reactLogo, color: '#000000' },
    { name: 'Stripe', logo: reactLogo, color: '#6772E5' }
  ],
  screenshots: [
    { id: 'scr1', imageUrl: '/assets/screenshots/ecommerce-1.jpg', caption: 'Page d\'accueil avec produits mis en avant' },
    { id: 'scr2', imageUrl: '/assets/screenshots/ecommerce-2.jpg', caption: 'Catalogue de produits avec filtres' },
    { id: 'scr3', imageUrl: '/assets/screenshots/ecommerce-3.jpg', caption: 'Page détaillée d\'un produit' },
    { id: 'scr4', imageUrl: '/assets/screenshots/ecommerce-4.jpg', caption: 'Panier d\'achat et processus de paiement' },
    { id: 'scr5', imageUrl: '/assets/screenshots/ecommerce-5.jpg', caption: 'Tableau de bord d\'administration' }
  ],
  challenges: [
    'Mise en place d\'un système de paiement sécurisé',
    'Gestion des stocks en temps réel',
    'Développement d\'une interface administrateur intuitive',
    'Optimisation des performances avec une grande quantité de produits'
  ],
  solutions: [
    'Intégration de l\'API Stripe pour les paiements sécurisés',
    'Utilisation de WebSockets pour les mises à jour en temps réel',
    'Conception d\'interfaces administrateur avec des tableaux de bord visuels',
    'Pagination, lazy loading et indexation pour gérer de grands catalogues'
  ],
  keyFeatures: [
    'Authentification sécurisée et gestion des utilisateurs',
    'Catalogue de produits avec recherche et filtrage avancés',
    'Système de panier et processus de commande complet',
    'Interface d\'administration pour la gestion des produits et commandes',
    'Passerelle de paiement sécurisée intégrée'
  ]
};

// Créer un objet qui contient tous les détails des projets
const projectsDetailData: Record<string, ProjectDetail> = {
  'portfolio': portfolioDetail,
  'ecommerce': ecommerceDetail,
  // Vous pourrez ajouter d'autres projets ici au fur et à mesure IA etc
};

// Fonction mise à jour pour obtenir les détails d'un projet par ID
export const getProjectDetailById = (id: string): ProjectDetail => {
  // Vérifier si le projet existe dans notre liste de détails
  if (projectsDetailData[id]) {
    return projectsDetailData[id];
  }
  
  // Si le projet n'existe pas dans les détails mais existe dans les données générales
  // Créer un ProjectDetail basique à partir des données générales
  const basicProject = projectsData.find(project => project.id === id);
  
  if (basicProject) {
    // Convertir le projet de base en ProjectDetail avec des valeurs par défaut
    return {
      ...basicProject,
      longDescription: basicProject.description,
      technologies: basicProject.tags.map(tag => ({
        name: tag.name,
        logo: `/assets/tech/${tag.name.toLowerCase().replace(/\s+/g, '')}.svg`,
        color: tag.color
      })),
      screenshots: [
        { id: `${id}-default`, imageUrl: basicProject.imageUrl, caption: basicProject.title }
      ]
    };
  }
  
  // Si aucun projet n'est trouvé, retourner le portfolioDetail par défaut
  return portfolioDetail;
};