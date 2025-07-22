// // src/components/sections/ProjectDetail/types/index.ts
// import { Project, ProjectTag, projectsData } from '../../Projects/types';
// import banner from '../../../../assets/projects/portfolio/banner.png';
// import degloule from '../../../../assets/projects/degloul/degloul.png';
// import reactLogo from '../../../../assets/tech/react.png';
// import typescriptLogo from '../../../../assets/tech/typescript.svg';
// import threejsLogo from '../../../../assets/tech/threejs.svg';
// import tailwindLogo from '../../../../assets/tech/tailwind.svg';
// import framerLogo from '../../../../assets/tech/framer.svg';
// import viteLogo from '../../../../assets/tech/vite.svg';
// import portDemo from '../../../../assets/projects/portfolio/LaDemoDegloul.mp4';

// //portfolio
// import hero from '../../../../assets/screenshots/portfolio/hero.png';
// import aprop from '../../../../assets/screenshots/portfolio/aprop.png';
// import competence from '../../../../assets/screenshots/portfolio/competence.png';
// import mesprojets from '../../../../assets/screenshots/portfolio/mesprojets.png';
// import contact from '../../../../assets/screenshots/portfolio/contact.png';


// //Degloul
// import dartLogo from '../../../../assets/tech/dartLogo.png';  
// import degloul1 from '../../../../assets/screenshots/degloul/degloul1.png';
// import degloul2 from '../../../../assets/screenshots/degloul/degloul2.png';
// import degloul3 from '../../../../assets/screenshots/degloul/degloul3.png';
// import degloul4 from '../../../../assets/screenshots/degloul/degloul4.png';


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
//   type: 'Personnel',
//   description: 'Mon portfolio dynamique réalisé avec React, Three.js et Framer Motion pour présenter mes compétences et projets avec des animations 3D.',
//   longDescription: `
//     Ce portfolio moderne a été conçu et développé entièrement par mes soins pour présenter mon travail et mes compétences de développeur web. 
    
//     L'objectif était de créer une expérience interactive et immersive qui montre non seulement mes projets, mais aussi mes capacités techniques à travers l'implémentation même du site.
    
//     J'ai utilisé React avec TypeScript comme base, en y ajoutant Three.js pour les effets 3D et Framer Motion pour les animations. Le design est responsive et optimisé pour tous les appareils, des smartphones aux grands écrans.
    
//     Une attention particulière a été portée à l'accessibilité et aux performances, avec des optimisations comme le lazy loading, le code splitting et la détection des préférences utilisateur (mode sombre, animations réduites).
//   `,
//   date: 'Avril 2025',
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
//     { id: 'scr1', imageUrl: hero, caption: 'Page d\'accueil avec effets 3D' },
//     { id: 'scr2', imageUrl: aprop, caption: 'A propos de moi' },
//     { id: 'scr3', imageUrl: competence, caption: 'Section compétences avec visualisation interactive' },
//     { id: 'scr4', imageUrl: mesprojets, caption: 'Timeline des projets' },
//     { id: 'scr5', imageUrl: contact, caption: 'Section contact avec formulaire' }
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



// export const degloul: ProjectDetail = {
//   id: 'ecommerce',
//   title: 'Plateforme Degloul',
//   type: 'Professionnel',
//   description: 'Application mobile de livres audios, écoute et lecture synchronisée.',
//   longDescription: `
//     Degloul est une plateforme innovante de streaming audio que j'ai contribué à développer pour répondre aux nouveaux usages culturels, en particulier en Afrique où l'oralité tient une place essentielle. Ce projet met en avant l'accès inclusif à la connaissance à travers une large gamme de contenus audios : livres audios, podcasts thématiques, revues de presse et contenus éducatifs. L'objectif est clair : permettre à chacun d'apprendre autrement, même en déplacement, sans contrainte de lecture traditionnelle.
 
//     Côté technique, la solution combine une architecture moderne avec une interface intuitive, pensée pour le mobile-first. L'équipe a intégré des technologies web robustes pour garantir une expérience fluide, sécurisée et accessible. Une attention particulière a été portée à la valorisation des contenus locaux et à la collaboration avec narrateurs, auteurs, et créateurs de contenus africains.
 
//     Degloul est bien plus qu'une simple bibliothèque audio : c'est une passerelle vers un savoir vivant, moderne et enraciné dans notre culture.
//   `,
//   date: 'Janvier 2025',
//   imageUrl: degloule,
//   tags: [
//     { name: 'Flutter', color: '#02569B' },
//     { name: 'Dart', color: '#0175C2' },
//     { name: 'Firebase', color: '#FFCA28' },
//     { name: 'Node.js', color: '#339933' }
//   ],
//   githubUrl: 'https://github.com/astouafk/degloul',
//   demoUrl: 'https://degloul-demo.com',
//   videoUrl: portDemo,
//   featured: true,
//   category: 'mobile',
//   technologies: [
//     { name: 'Flutter', logo: reactLogo, color: '#02569B' },
//     { name: 'Dart', logo: dartLogo, color: '#0175C2' },
//     { name: 'Firebase', logo: reactLogo, color: '#FFCA28' },
//     { name: 'Node.js', logo: reactLogo, color: '#339933' },
//   ],
//   screenshots: [
//     { id: 'scr1', imageUrl: degloul1, caption: 'DEGLOUL' },
//     { id: 'scr2', imageUrl: degloul2, caption: 'OBKECTIF' },
//     { id: 'scr3', imageUrl: degloul3, caption: 'VISUEL' },
//     { id: 'scr4', imageUrl: degloul4, caption: 'VISUEL BIS' },
//   ],
//   challenges: [
//     'Gestion du streaming audio haute qualité avec connexions variables',
//     'Synchronisation lecture/écoute pour une expérience hybride',
//     'Monétisation équitable pour les créateurs de contenu locaux',
//     'Optimisation pour les appareils Android bas de gamme',
//     'Négociation des droits d\'auteur avec les éditeurs africains'
//   ],
//   solutions: [
//     'Implémentation d\'un système de cache intelligent et streaming adaptatif',
//     'Développement d\'un algorithme de synchronisation texte-audio en temps réel',
//     'Création d\'un modèle de revenus partagés transparent',
//     'Optimisation des performances avec compression audio avancée',
//     'Partenariats stratégiques avec maisons d\'édition locales'
//   ],
//   keyFeatures: [
//     'Streaming audio haute qualité avec mode hors-ligne',
//     'Synchronisation lecture/écoute en temps réel',
//     'Catalogue riche : littérature, religion, sciences, actualité',
//     'Interface multilingue (français, wolof, anglais)',
//     'Système de recommandations personnalisées',
//     'Communauté d\'écoute et partage d\'expériences',
//     'Support des créateurs locaux et rémunération équitable'
//   ]
//  };

// // Créer un objet qui contient tous les détails des projets
// const projectsDetailData: Record<string, ProjectDetail> = {
//   'portfolio': portfolioDetail,
//   'ecommerce': degloul,
//   // Vous pourrez ajouter d'autres projets ici au fur et à mesure IA etc
// };

// // Fonction mise à jour pour obtenir les détails d'un projet par ID
// export const getProjectDetailById = (id: string): ProjectDetail => {
//   // Vérifier si le projet existe dans notre liste de détails
//   if (projectsDetailData[id]) {
//     return projectsDetailData[id];
//   }
  
//   // Si le projet n'existe pas dans les détails mais existe dans les données générales
//   // Créer un ProjectDetail basique à partir des données générales
//   const basicProject = projectsData.find(project => project.id === id);
  
//   if (basicProject) {
//     // Convertir le projet de base en ProjectDetail avec des valeurs par défaut
//     return {
//       ...basicProject,
//       longDescription: basicProject.description,
//       technologies: basicProject.tags.map(tag => ({
//         name: tag.name,
//         logo: `/assets/tech/${tag.name.toLowerCase().replace(/\s+/g, '')}.svg`,
//         color: tag.color
//       })),
//       screenshots: [
//         { id: `${id}-default`, imageUrl: basicProject.imageUrl, caption: basicProject.title }
//       ]
//     };
//   }
  
//   // Si aucun projet n'est trouvé, retourner le portfolioDetail par défaut
//   return portfolioDetail;
// };




// src/components/sections/ProjectDetail/types/index.ts
import { Project, ProjectTag, projectsData } from '../../Projects/types';
import banner from '../../../../assets/projects/portfolio/banner.png';
import degloule from '../../../../assets/projects/degloul/degloul.png';
import typescriptLogo from '../../../../assets/tech/typescript.svg';
import threejsLogo from '../../../../assets/tech/threejs.svg';
import tailwindLogo from '../../../../assets/tech/tailwind.svg';
import framerLogo from '../../../../assets/tech/framer.svg';
import viteLogo from '../../../../assets/tech/vite.svg';
import portDemo from '../../../../assets/projects/portfolio/LaDemoDegloul.mp4';

//logos langages
import flutter from '../../../../assets/tech/flutter.png';
import reactLogo from '../../../../assets/tech/react.png';
import firebase from '../../../../assets/tech/firebase.png';

//portfolio
import hero from '../../../../assets/screenshots/portfolio/hero.png';
import aprop from '../../../../assets/screenshots/portfolio/aprop.png';
import competence from '../../../../assets/screenshots/portfolio/competence.png';
import mesprojets from '../../../../assets/screenshots/portfolio/mesprojets.png';
import contact from '../../../../assets/screenshots/portfolio/contact.png';

//Degloul
import dartLogo from '../../../../assets/tech/dartLogo.png';  
import degloul1 from '../../../../assets/screenshots/degloul/degloul1.png';
import degloul2 from '../../../../assets/screenshots/degloul/degloul2.png';
import degloul3 from '../../../../assets/screenshots/degloul/degloul3.png';
import degloul4 from '../../../../assets/screenshots/degloul/degloul4.png';

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

// Projet Portfolio
export const portfolioDetail: ProjectDetail = {
  id: 'portfolio',
  title: 'Portfolio Personnel',
  type: 'Personnel',
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
  // videoUrl: portDemo,
  featured: true,
  category: 'web',
  technologies: [
    { name: 'React', logo: reactLogo, color: '#61DAFB' },
    { name: 'TypeScript', logo: typescriptLogo, color: '#3178C6' },
    { name: 'Three.js', logo: threejsLogo, color: '#3178C6' },
    { name: 'Tailwind CSS', logo: tailwindLogo, color: '#06B6D4' },
    { name: 'Framer Motion', logo: framerLogo, color: '#0055FF' },
    { name: 'Vite', logo: viteLogo, color: '#646CFF' }
  ],
  screenshots: [
    { id: 'scr1', imageUrl: hero, caption: 'Page d\'accueil avec effets 3D' },
    { id: 'scr2', imageUrl: aprop, caption: 'A propos de moi' },
    { id: 'scr3', imageUrl: competence, caption: 'Section compétences avec visualisation interactive' },
    { id: 'scr4', imageUrl: mesprojets, caption: 'Timeline des projets' },
    { id: 'scr5', imageUrl: contact, caption: 'Section contact avec formulaire' }
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

// Projet Degloul
export const degloul: ProjectDetail = {
  id: 'ecommerce',
  title: 'Plateforme Degloul',
  type: 'Professionnel',
  description: 'Application mobile de livres audios, écoute et lecture synchronisée.',
  longDescription: `
    Degloul est une plateforme innovante de streaming audio que j'ai contribué à développer pour répondre aux nouveaux usages culturels, en particulier en Afrique où l'oralité tient une place essentielle. Ce projet met en avant l'accès inclusif à la connaissance à travers une large gamme de contenus audios : livres audios, podcasts thématiques, revues de presse et contenus éducatifs. L'objectif est clair : permettre à chacun d'apprendre autrement, même en déplacement, sans contrainte de lecture traditionnelle.
 
    Côté technique, la solution combine une architecture moderne avec une interface intuitive, pensée pour le mobile-first. L'équipe a intégré des technologies web robustes pour garantir une expérience fluide, sécurisée et accessible. Une attention particulière a été portée à la valorisation des contenus locaux et à la collaboration avec narrateurs, auteurs, et créateurs de contenus africains.
 
    Degloul est bien plus qu'une simple bibliothèque audio : c'est une passerelle vers un savoir vivant, moderne et enraciné dans notre culture.
  `,
  date: 'Janvier 2025',
  imageUrl: degloule,
  tags: [
    { name: 'Flutter', color: '#02569B' },
    { name: 'Dart', color: '#0175C2' },
    { name: 'Firebase', color: '#FFCA28' },
    { name: 'Node.js', color: '#339933' }
  ],
  githubUrl: 'https://github.com/astouafk/degloul',
  demoUrl: 'https://degloul-demo.com',
  videoUrl: portDemo,
  featured: true,
  category: 'mobile',
  technologies: [
    { name: 'Flutter', logo: reactLogo, color: '#02569B' },
    { name: 'Dart', logo: dartLogo, color: '#0175C2' },
    { name: 'Firebase', logo: reactLogo, color: '#FFCA28' },
    { name: 'Node.js', logo: reactLogo, color: '#339933' },
  ],
  screenshots: [
    { id: 'scr1', imageUrl: degloul1, caption: 'DEGLOUL' },
    { id: 'scr2', imageUrl: degloul2, caption: 'OBKECTIF' },
    { id: 'scr3', imageUrl: degloul3, caption: 'VISUEL' },
    { id: 'scr4', imageUrl: degloul4, caption: 'VISUEL BIS' },
  ],
  challenges: [
    'Gestion du streaming audio haute qualité avec connexions variables',
    'Synchronisation lecture/écoute pour une expérience hybride',
    'Monétisation équitable pour les créateurs de contenu locaux',
    'Optimisation pour les appareils Android bas de gamme',
    'Négociation des droits d\'auteur avec les éditeurs africains'
  ],
  solutions: [
    'Implémentation d\'un système de cache intelligent et streaming adaptatif',
    'Développement d\'un algorithme de synchronisation texte-audio en temps réel',
    'Création d\'un modèle de revenus partagés transparent',
    'Optimisation des performances avec compression audio avancée',
    'Partenariats stratégiques avec maisons d\'édition locales'
  ],
  keyFeatures: [
    'Streaming audio haute qualité avec mode hors-ligne',
    'Synchronisation lecture/écoute en temps réel',
    'Catalogue riche : littérature, religion, sciences, actualité',
    'Interface multilingue (français, wolof, anglais)',
    'Système de recommandations personnalisées',
    'Communauté d\'écoute et partage d\'expériences',
    'Support des créateurs locaux et rémunération équitable'
  ]
};

// Projet Fa-Counting
export const faCountingDetail: ProjectDetail = {
  id: 'mobapp',
  type: 'Professionnel',
  title: 'Application Fa-Counting',
  description: 'Application mobile d\'inventaire pour le recensement des matériaux d\'entreprise en Côte d\'Ivoire',
  longDescription: `
    Fa-Counting est une application mobile innovante que j'ai développée pour digitaliser et optimiser la gestion d'inventaire des entreprises en Côte d'Ivoire. Face aux défis logistiques et de traçabilité que rencontrent de nombreuses PME africaines, cette solution propose une approche moderne et intuitive pour le recensement des matériaux et équipements.

    L'application permet une saisie rapide et précise des données d'inventaire via des fonctionnalités de scan de codes-barres, géolocalisation, et prise de photos. Elle s'adapte parfaitement aux contraintes locales : connectivité intermittente, diversité des appareils, et besoins spécifiques du marché ivoirien.

    Développée avec Flutter pour garantir une performance optimale sur Android, l'app intègre Firebase pour la synchronisation cloud et offre des rapports détaillés en temps réel. C'est un outil pensé par et pour l'écosystème entrepreneurial africain, alliant simplicité d'usage et robustesse technique.
  `,
  date: 'Juin 2025',
  imageUrl: '/assets/projects/mobile-app.jpg',
  tags: [
    { name: 'Flutter', color: '#02569B' },
    { name: 'Dart', color: '#0175C2' },
    { name: 'Firebase', color: '#FFCA28' }
  ],
  githubUrl: 'https://github.com/astouafk/fitness-app',
  category: 'mobile',
  technologies: [
    { name: 'Flutter', logo: flutter, color: '#02569B' },
    { name: 'Dart', logo: dartLogo, color: '#0175C2' },
    { name: 'Firebase', logo: firebase, color: '#FFCA28' }
  ],
  screenshots: [
    { id: 'fa1', imageUrl: '/assets/screenshots/facounting/dashboard.png', caption: 'Dashboard principal avec statistiques' },
    { id: 'fa2', imageUrl: '/assets/screenshots/facounting/scan.png', caption: 'Interface de scan de codes-barres' },
    { id: 'fa3', imageUrl: '/assets/screenshots/facounting/inventory.png', caption: 'Liste d\'inventaire avec filtres' },
    { id: 'fa4', imageUrl: '/assets/screenshots/facounting/reports.png', caption: 'Génération de rapports détaillés' }
  ],
  challenges: [
    'Fonctionnement optimal en mode hors-ligne avec synchronisation différée',
    'Adaptation aux contraintes réseau en Côte d\'Ivoire',
    'Interface intuitive pour utilisateurs peu familiers avec le digital',
    'Gestion de grandes quantités de données d\'inventaire',
    'Optimisation pour appareils Android d\'entrée de gamme'
  ],
  solutions: [
    'Base de données locale SQLite avec synchronisation cloud intelligente',
    'Interface progressive adaptée aux niveaux de connectivité',
    'Design UX simplifié avec guides visuels et tutoriels intégrés',
    'Pagination et cache optimisés pour les performances',
    'Tests extensifs sur appareils bas de gamme du marché local'
  ],
  keyFeatures: [
    'Scan de codes-barres et QR codes natif',
    'Mode hors-ligne complet avec synchronisation automatique',
    'Géolocalisation pour traçabilité géographique',
    'Prise de photos et annotations visuelles',
    'Rapports Excel exportables',
    'Interface multilingue (français, anglais)',
    'Tableau de bord avec analytics en temps réel'
  ]
};

// Projet Paygo
export const paygoDetail: ProjectDetail = {
  id: 'paygo',
  type: 'Professionnel',
  title: 'Application Paygo',
  description: 'Paygo est une solution tout-en-un qui permet aux entreprises d\'accepter des paiements marchands via Wave, Orange Money, etc.',
  longDescription: `
    Paygo représente une solution fintech complète que j'ai contribué à développer pour révolutionner les paiements digitaux en Afrique de l'Ouest. Cette plateforme unifie les principaux opérateurs de paiement mobile (Wave, Orange Money, MTN Mobile Money, Moov Money) en une seule interface, simplifiant drastiquement l'acceptation de paiements pour les commerçants.

    L'enjeu était de taille : créer une solution qui s'adapte à l'écosystème complexe des paiements mobiles africains, où chaque pays et chaque opérateur a ses spécificités. Paygo propose une API unifiée, un dashboard marchand intuitif, et des outils d'analytics avancés pour le suivi des transactions.

    Développée avec une architecture microservices moderne, la plateforme gère des milliers de transactions quotidiennes avec une fiabilité de 99.9%. Elle intègre des fonctionnalités de réconciliation automatique, de gestion des disputes, et de reporting en temps réel, essentielles pour les entreprises qui cherchent à digitaliser leurs paiements en Afrique.
  `,
  date: 'Avril 2025',
  imageUrl: '/assets/projects/dashboard.jpg',
  tags: [
    { name: 'React', color: '#61DAFB' },
    { name: 'D3.js', color: '#F9A03C' },
    { name: 'API REST', color: '#0096AA' }
  ],
  githubUrl: 'https://github.com/astouafk/analytics-dashboard',
  category: 'web',
  technologies: [
    { name: 'React', logo: reactLogo, color: '#61DAFB' },
    { name: 'TypeScript', logo: typescriptLogo, color: '#3178C6' },
    { name: 'D3.js', logo: reactLogo, color: '#F9A03C' },
    { name: 'API REST', logo: reactLogo, color: '#0096AA' },
    { name: 'Node.js', logo: reactLogo, color: '#339933' }
  ],
  screenshots: [
    { id: 'pay1', imageUrl: '/assets/screenshots/paygo/dashboard.png', caption: 'Dashboard marchand avec analytics' },
    { id: 'pay2', imageUrl: '/assets/screenshots/paygo/transactions.png', caption: 'Historique des transactions en temps réel' },
    { id: 'pay3', imageUrl: '/assets/screenshots/paygo/integration.png', caption: 'Interface d\'intégration API' },
    { id: 'pay4', imageUrl: '/assets/screenshots/paygo/reports.png', caption: 'Rapports financiers détaillés' }
  ],
  challenges: [
    'Intégration avec multiple APIs de paiement aux formats différents',
    'Gestion de la latence et des timeouts réseau en Afrique',
    'Réconciliation automatique des transactions multi-opérateurs',
    'Conformité réglementaire avec les autorités monétaires locales',
    'Sécurisation des données financières sensibles'
  ],
  solutions: [
    'Architecture d\'adaptateurs pour standardiser les APIs des opérateurs',
    'Système de retry intelligent avec fallback automatique',
    'Algorithmes de matching avancés pour la réconciliation',
    'Implémentation des standards PCI DSS et réglementations UEMOA',
    'Chiffrement end-to-end et tokenisation des données sensibles'
  ],
  keyFeatures: [
    'Intégration unifiée avec tous les opérateurs de paiement mobile',
    'Dashboard temps réel avec analytics avancés',
    'API REST complète pour intégration e-commerce',
    'Réconciliation automatique des transactions',
    'Gestion des disputes et remboursements',
    'Rapports financiers personnalisables',
    'Support multi-devises (FCFA, USD, EUR)',
    'SDK mobile pour intégration rapide'
  ]
};

// Projet Faggu Assurance
export const fagguDetail: ProjectDetail = {
  id: 'faggu Assurance',
  type: 'Professionnel',
  title: 'Plateforme Faggu Assurance',
  description: 'Plateforme digitale d\'assurance avec gestion de polices, sinistres et paiements en ligne.',
  longDescription: `
    Faggu Assurance est une plateforme complète de digitalisation du secteur des assurances que j'ai développée pour moderniser l'expérience client dans l'assurance en Afrique. Cette solution transforme les processus traditionnels en offrant une interface web intuitive pour la souscription, la gestion de polices, et le traitement des sinistres.

    Le projet répond à un besoin critique du marché africain : rendre l'assurance plus accessible et transparente. La plateforme permet aux assurés de souscrire en ligne, suivre leurs polices en temps réel, déclarer des sinistres avec photos et géolocalisation, et effectuer leurs paiements via mobile money.

    Développée avec une architecture moderne (React/Node.js), la solution intègre des fonctionnalités avancées comme l'évaluation automatique des risques, la tarification dynamique, et un système de workflow pour le traitement des sinistres. Elle s'adapte aux spécificités réglementaires locales tout en offrant une expérience utilisateur de niveau international.
  `,
  date: 'Juillet 2025',
  imageUrl: '/assets/projects/chatapp.jpg',
  tags: [
    { name: 'Socket.io', color: '#010101' },
    { name: 'React', color: '#61DAFB' },
    { name: 'Node.js', color: '#339933' },
    { name: 'MongoDB', color: '#47A248' }
  ],
  demoUrl: 'https://faggu-assurance-demo.com',
  category: 'web',
  technologies: [
    { name: 'React', logo: reactLogo, color: '#61DAFB' },
    { name: 'TypeScript', logo: typescriptLogo, color: '#3178C6' },
    { name: 'Node.js', logo: reactLogo, color: '#339933' },
    { name: 'MongoDB', logo: reactLogo, color: '#47A248' },
    { name: 'Socket.io', logo: reactLogo, color: '#010101' }
  ],
  screenshots: [
    { id: 'fag1', imageUrl: '/assets/screenshots/faggu/dashboard.png', caption: 'Dashboard assuré avec polices actives' },
    { id: 'fag2', imageUrl: '/assets/screenshots/faggu/souscription.png', caption: 'Processus de souscription en ligne' },
    { id: 'fag3', imageUrl: '/assets/screenshots/faggu/sinistres.png', caption: 'Déclaration et suivi des sinistres' },
    { id: 'fag4', imageUrl: '/assets/screenshots/faggu/paiements.png', caption: 'Interface de paiement multi-méthodes' }
  ],
  challenges: [
    'Intégration avec les systèmes legacy des compagnies d\'assurance',
    'Digitalisation des processus de souscription complexes',
    'Évaluation automatique des risques selon les profils locaux',
    'Gestion des paiements récurrents via mobile money',
    'Conformité avec les réglementations d\'assurance CIMA'
  ],
  solutions: [
    'APIs d\'intégration robustes avec mapping de données legacy',
    'Formulaires dynamiques adaptatifs selon le type d\'assurance',
    'Moteur de règles métier pour l\'évaluation des risques',
    'Intégration native avec les APIs des opérateurs de paiement',
    'Architecture de conformité avec audit trails complets'
  ],
  keyFeatures: [
    'Souscription en ligne multi-produits (auto, santé, habitation)',
    'Gestion complète du cycle de vie des polices',
    'Déclaration de sinistres avec upload de documents',
    'Paiements automatiques via mobile money',
    'Notifications SMS/email en temps réel',
    'Chat support intégré avec les agents',
    'Tableau de bord assuré personnalisé',
    'Interface agent pour gestion clientèle'
  ]
};

// Projet Afkash
export const afkashDetail: ProjectDetail = {
  id: 'Afkash',
  type: 'Personnel',
  title: 'Plateforme simulative de transfert d\'argent inter-opérateur',
  description: 'Plateforme qui simule le transfert d\'argent entre différents opérateurs de téléphonie mobile en Afrique.',
  longDescription: `
    Afkash est un projet personnel ambitieux que je développe actuellement pour créer une solution d'interopérabilité entre les services de mobile money en Afrique. Cette plateforme simule et teste les transferts d'argent entre différents opérateurs (Orange Money, Wave, MTN Mobile Money, Moov Money) dans une optique de recherche et développement.

    L'objectif est double : comprendre les mécanismes techniques complexes de l'interopérabilité financière, et proposer des solutions innovantes pour fluidifier les échanges monétaires transfrontaliers en Afrique. Le projet explore les défis techniques, réglementaires et business liés à l'unification des systèmes de paiement mobile.

    Développée avec Next.js et une stack IA (TensorFlow, FastAPI), la plateforme intègre des modèles de machine learning pour optimiser les routes de transfert, prédire les taux de change, et analyser les patterns de transaction. C'est un laboratoire d'innovation fintech qui préfigure l'avenir des paiements digitaux en Afrique.
  `,
  date: 'En cours',
  imageUrl: '/assets/projects/ai-learning.jpg',
  tags: [
    { name: 'Next.js', color: '#000000' },
    { name: 'Python', color: '#3776AB' },
    { name: 'TensorFlow', color: '#FF6F00' },
    { name: 'FastAPI', color: '#009688' }
  ],
  inProgress: true,
  category: 'web',
  technologies: [
    { name: 'Next.js', logo: reactLogo, color: '#000000' },
    { name: 'TypeScript', logo: typescriptLogo, color: '#3178C6' },
    { name: 'Python', logo: reactLogo, color: '#3776AB' },
    { name: 'TensorFlow', logo: reactLogo, color: '#FF6F00' },
    { name: 'FastAPI', logo: reactLogo, color: '#009688' },
    { name: 'PostgreSQL', logo: reactLogo, color: '#336791' }
  ],
  screenshots: [
    { id: 'afk1', imageUrl: '/assets/screenshots/afkash/simulator.png', caption: 'Interface de simulation de transferts' },
    { id: 'afk2', imageUrl: '/assets/screenshots/afkash/analytics.png', caption: 'Analytics IA des patterns de transfert' },
    { id: 'afk3', imageUrl: '/assets/screenshots/afkash/routing.png', caption: 'Optimisation des routes de transfert' },
    { id: 'afk4', imageUrl: '/assets/screenshots/afkash/compliance.png', caption: 'Dashboard de conformité réglementaire' }
  ],
  challenges: [
    'Modélisation précise des APIs des différents opérateurs mobiles',
    'Simulation réaliste des contraintes réglementaires par pays',
    'Développement d\'algorithmes d\'optimisation des routes de transfert',
    'Prédiction des taux de change et frais de transaction',
    'Gestion de la latence et des timeouts dans un environnement multi-opérateur'
  ],
  solutions: [
    'Architecture de microservices avec simulateurs d\'APIs fidèles',
    'Base de données de règles réglementaires mise à jour dynamiquement',
    'Algorithmes génétiques pour l\'optimisation des routes',
    'Modèles LSTM pour la prédiction des taux et volumes',
    'Système de circuit breaker et retry avec backoff exponentiel'
  ],
  keyFeatures: [
    'Simulation complète de l\'écosystème mobile money africain',
    'IA prédictive pour optimisation des transferts',
    'Dashboard analytics avec visualisations avancées',
    'Modélisation des contraintes réglementaires par pays',
    'API de test pour développeurs fintech',
    'Monitoring en temps réel des performances',
    'Simulation de stress test à grande échelle',
    'Rapports de conformité automatisés'
  ]
};

// Créer un objet qui contient tous les détails des projets
const projectsDetailData: Record<string, ProjectDetail> = {
  'portfolio': portfolioDetail,
  'ecommerce': degloul,
  'mobapp': faCountingDetail,
  'paygo': paygoDetail,
  'faggu Assurance': fagguDetail,
  'Afkash': afkashDetail
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