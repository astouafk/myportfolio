// src/components/sections/ProjectDetail/types/index.ts
import { Project, ProjectTag, projectsData } from '../../Projects/types';
import banner from '../../../../assets/projects/portfolio/banner.png';
import degloule from '../../../../assets/projects/degloul/degloul.webp';
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
import mongo from '../../../../assets/tech/mongo.webp';

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
import degloul5 from '../../../../assets/screenshots/degloul/degloul5.png';
import degloul6 from '../../../../assets/screenshots/degloul/degloul6.png';
import degloul7 from '../../../../assets/screenshots/degloul/degloul7.png';

//facounting
import facounting1 from '../../../../assets/screenshots/facounting/facounting1.jpeg';
import facounting2 from '../../../../assets/screenshots/facounting/facounting2.png';
import facounting3 from '../../../../assets/screenshots/facounting/facounting3.png';
import facounting4 from '../../../../assets/screenshots/facounting/facounting4.png';

//paygo
import paygobanner from '../../../../assets/screenshots/paygo/paygo-banner.png';
import paygo1 from '../../../../assets/screenshots/paygo/paygo1.png';
import paygo2 from '../../../../assets/screenshots/paygo/paygo2.png';
import paygo3 from '../../../../assets/screenshots/paygo/paygo3.png';
import paygo4 from '../../../../assets/screenshots/paygo/paygo4.png';

//faggu
import faggubanner from '../../../../assets/screenshots/faggu/faggu-banner.png';

//kaayeat
import kaayeatbanner from '../../../../assets/screenshots/kaayeat/kaayeat-banner.png';
import kouakou from '../../../../assets/screenshots/kaayeat/kouakou.webm';
import kaayeat1 from '../../../../assets/screenshots/kaayeat/kaayeat1.png';
import kaayeat2 from '../../../../assets/screenshots/kaayeat/kaayeat2.png';
import kaayeat3 from '../../../../assets/screenshots/kaayeat/kaayeat3.png';
import kaayeat4 from '../../../../assets/screenshots/kaayeat/kaayeat4.png';
import kaayeat5 from '../../../../assets/screenshots/kaayeat/kaayeat5.png';

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
  description: 'L\'assurance à portée de main',
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
    { name: 'Three.js', color: '#0175C2' },
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
  id: 'degloul',
  title: 'Plateforme Degloul',
  type: 'Professionnel',
  description: 'Application mobile de livres audios, écoute et lecture synchronisée.',
  longDescription: `
  Degloul est une plateforme innovante de streaming audio que j'ai contribué à développer pour répondre aux nouveaux usages culturels, en particulier en Afrique où l'oralité tient une place essentielle. Ce projet, porté par la startup Degloul, met en avant l'accès inclusif à la connaissance à travers une large gamme de contenus audios : livres audios, podcasts thématiques, revues de presse et contenus éducatifs. L'objectif est clair : permettre à chacun d'apprendre autrement, même en déplacement, sans contrainte de lecture traditionnelle.

  Côté technique, la solution combine une architecture moderne avec une interface intuitive, pensée pour le mobile-first. L'équipe a intégré des technologies web robustes pour garantir une expérience fluide, sécurisée et accessible. Une attention particulière a été portée à la valorisation des contenus locaux et à la collaboration avec narrateurs, auteurs, et créateurs de contenus africains.

  Degloul est bien plus qu'une simple bibliothèque audio : c'est une passerelle vers un savoir vivant, moderne et enraciné dans notre culture.
`,
  date: 'Janvier 2025',
  imageUrl: degloule,
  tags: [
    { name: 'Flutter', color: '#02569B' },
    { name: 'Dart', color: '#0175C2' },
    { name: 'MongoDB', color: '#FFCA28' },
  ],
  githubUrl: 'https://github.com/astouafk/degloul',
  demoUrl: 'https://degloul-demo.com',
  // videoUrl: portDemo,
  featured: true,
  category: 'mobile',
  technologies: [
    { name: 'Flutter', logo: reactLogo, color: '#02569B' },
    { name: 'Dart', logo: dartLogo, color: '#0175C2' },
    { name: 'MongoDb', logo: mongo, color: '#FFCA28' },
  ],
  screenshots: [
    { id: 'scr2', imageUrl: degloul2, caption: 'OBJECTIF' },
    { id: 'scr3', imageUrl: degloul5, caption: 'loading' },
    { id: 'scr4', imageUrl: degloul7, caption: 'favoris et playlist' },
    { id: 'scr5', imageUrl: degloul6, caption: 'Récemment lus' }
  ],
  challenges: [
    'Gestion du streaming audio haute qualité avec connexions variables',
    'Synchronisation lecture/écoute pour une expérience hybride',
    'Monétisation équitable pour les créateurs de contenu locaux',
    'Optimisation pour les appareils Android bas de gamme',
  ],
  solutions: [
    'Implémentation d\'un système de cache intelligent et streaming adaptatif',
    'Développement d\'un algorithme de synchronisation texte-audio en temps réel',
    'Optimisation des performances avec compression audio avancée',
  ],
  keyFeatures: [
    'Streaming audio haute qualité',
    'Synchronisation lecture/écoute en temps réel',
    'Catalogue riche : littérature, religion, sciences, actualité',
    'Communauté d\'écoute et partage d\'expériences',
  ]
};

// Projet Fa-Counting
export const faCountingDetail: ProjectDetail = {
  id: 'facounting',
  type: 'Professionnel',
  title: 'Application Fa-Counting',
  description: 'Application mobile d\'inventaire pour le recensement des matériaux d\'entreprise.',
  longDescription: `
  Fa-Counting est une application mobile innovante développée par la team Asma-Software, à laquelle j'ai contribué en tant que développeur mobile. Elle vise à digitaliser et optimiser la gestion d'inventaire d'une entreprise ivoirienne. Face aux défis logistiques et de traçabilité que rencontrent de nombreuses PME africaines, cette solution propose une approche moderne et intuitive pour le recensement des matériaux et équipements.

  J'ai travaillé sur la conception et le développement de l'application mobile, en assurant une interface fluide et adaptée aux utilisateurs sur le terrain. L'application communique avec une API Java structurée en microservices, garantissant performance, évolutivité et sécurité des échanges entre le mobile et le système central.

  L'application permet une saisie rapide et précise des données d'inventaire via des fonctionnalités de scan de codes-barres et de prise de photos. Elle s'adapte parfaitement aux contraintes locales : connectivité intermittente, diversité des appareils, et besoins spécifiques du marché.
`,

  date: 'Juin 2025',
  imageUrl: facounting2,
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
  ],
  screenshots: [
    { id: 'fa1', imageUrl: facounting1, caption: 'Onboarding' },
    { id: 'fa3', imageUrl: facounting3, caption: 'Connexion' },
    { id: 'fa4', imageUrl: facounting4, caption: 'Validation Licence' },
    // { id: 'fa4', imageUrl: '/assets/screenshots/facounting/reports.png', caption: 'Génération de rapports détaillés' }
  ],
  challenges: [
    'Interface intuitive pour utilisateurs peu familiers avec le digital',
    'Gestion de grandes quantités de données d\'inventaire',
    'Optimisation pour appareils Android d\'entrée de gamme'
  ],
  solutions: [
    'Base de données relationnelle pour structurer les données d\'inventaire',
    'Interface progressive adaptée aux niveaux de connectivité',
    'Design UX simplifié',
    'Pagination et cache optimisés pour les performances',
  ],
  keyFeatures: [
    'Scan de codes-barres et QR codes pour les immobilisations',
    'Possibilité de remplir le formulaire pour les codes barres défectueux',
    'Prise de photos pour matérialiser l\'état des immobilisations',
    'Historiques des immobilisations scannées',
  ]
};

// Projet Paygo
export const paygoDetail: ProjectDetail = {
  id: 'paygo',
  type: 'Professionnel',
  title: 'Application Paygo',
  description: 'Paygo est une solution tout-en-un qui permet aux entreprises d\'accepter des paiements marchands via Wave, Orange Money, etc.',
  longDescription: `
  Paygo est une solution fintech développée par la société MobiDev, conçue pour simplifier les paiements digitaux en Afrique de l’Ouest en unifiant les services des principaux opérateurs de paiement mobile (Wave, Orange Money, etc.) au sein d’une seule plateforme.

  J’ai contribué au développement de la partie mobile de l’application, en mettant l’accent sur l’expérience utilisateur, les bonnes pratiques de développement, et des fonctionnalités clés. L’objectif était de proposer un outil fluide, accessible et parfaitement adapté aux réalités du terrain.

  La solution Paygo se distingue par plusieurs avantages majeurs :

  • **Solution Tout-en-Un**  
  Gérer les paiements, décaissements et la comptabilité à partir d’une seule application.

  • **Mise en relation pour financement**  
  Grâce aux rapports de transactions, Paygo facilite la mise en relation avec les banques et institutions financières pour accéder à des financements.

  • **Gain de Temps**  
  Automatisation des transactions et des processus comptables pour se concentrer sur le développement de l’entreprise.

  • **Sécurité Maximale**  
  Données protégées par chiffrement, sécurité de pointe et authentification multi-facteur.

  Ce projet m’a permis de contribuer à une plateforme à fort impact, avec une vision claire : accélérer la transformation numérique du secteur financier africain à travers des outils mobiles efficaces et sécurisés.
`,

  date: 'Avril 2025',
  imageUrl:paygobanner,
  tags: [
    { name: 'Flutter', color: '#61DAFB' },
    { name: 'Dart', color: '#F9A03C' },
    { name: 'MongoDB', color: '#0096AA' }
  ],
  githubUrl: 'https://github.com/astouafk/analytics-dashboard',
  category: 'web',
  technologies: [
    { name: 'Flutter', logo: flutter, color: '#61DAFB' },
    { name: 'Dart', logo: dartLogo, color: '#3178C6' },
    { name: 'MongoDB', logo: mongo, color: '#F9A03C' }
  ],
  screenshots: [
    { id: 'pay1', imageUrl: paygo4, caption: 'site' },
    { id: 'pay2', imageUrl: paygo2, caption: 'page de connexion' },
    { id: 'pay3', imageUrl: paygo1, caption: 'page d\'inscription' },
    { id: 'pay4', imageUrl: paygo3, caption: 'accueil' }
  ],
  challenges: [
    'Intégration avec multiple APIs de paiement aux formats différents',
    'Gestion de la latence et des timeouts',
    'Réconciliation automatique des transactions multi-opérateurs',
    'Conformité réglementaire avec les autorités monétaires locales',
    'Sécurisation des données sensibles'
  ],
  solutions: [
    'Architecture d\'adaptateurs pour standardiser les APIs des opérateurs',
    'Système de retry intelligent avec fallback automatique',
    'Respect des standards et normes BCEAO',
  ],
  keyFeatures: [
    'Intégration unifiée avec tous les opérateurs de paiement mobile',
    'Réconciliation automatique des transactions',
    'Rapports financiers personnalisables format excel pdf',
    'Système d\'internationalisation intégré pour les langues anglaise et française',
  ]
};

// Projet Faggu Assurance
// export const fagguDetail: ProjectDetail = {
//   id: 'faggu Assurance',
//   type: 'Professionnel',
//   title: 'Plateforme Faggu Assurance',
//   description: 'Plateforme digitale d\'assurance avec gestion de polices, sinistres et paiements en ligne.',
//   longDescription: `
//     Faggu Assurance est une plateforme complète de digitalisation du secteur des assurances que j'ai développée pour moderniser l'expérience client dans l'assurance en Afrique. Cette solution transforme les processus traditionnels en offrant une interface web intuitive pour la souscription, la gestion de polices, et le traitement des sinistres.

//     Le projet répond à un besoin critique du marché africain : rendre l'assurance plus accessible et transparente. La plateforme permet aux assurés de souscrire en ligne, suivre leurs polices en temps réel, déclarer des sinistres avec photos et géolocalisation, et effectuer leurs paiements via mobile money.

//     Développée avec une architecture moderne (React/Node.js), la solution intègre des fonctionnalités avancées comme l'évaluation automatique des risques, la tarification dynamique, et un système de workflow pour le traitement des sinistres. Elle s'adapte aux spécificités réglementaires locales tout en offrant une expérience utilisateur de niveau international.
//   `,
//   date: 'Juillet 2025',
//   imageUrl: faggubanner,
//   tags: [
//     { name: 'Socket.io', color: '#010101' },
//     { name: 'React', color: '#61DAFB' },
//     { name: 'Node.js', color: '#339933' },
//     { name: 'MongoDB', color: '#47A248' }
//   ],
//   demoUrl: 'https://faggu-assurance-demo.com',
//   category: 'web',
//   technologies: [
//     { name: 'React', logo: reactLogo, color: '#61DAFB' },
//     { name: 'TypeScript', logo: typescriptLogo, color: '#3178C6' },
//     { name: 'Node.js', logo: reactLogo, color: '#339933' },
//     { name: 'MongoDB', logo: reactLogo, color: '#47A248' },
//     { name: 'Socket.io', logo: reactLogo, color: '#010101' }
//   ],
//   screenshots: [
//     { id: 'fag1', imageUrl: '/assets/screenshots/faggu/dashboard.png', caption: 'Dashboard assuré avec polices actives' },
//     { id: 'fag2', imageUrl: '/assets/screenshots/faggu/souscription.png', caption: 'Processus de souscription en ligne' },
//     { id: 'fag3', imageUrl: '/assets/screenshots/faggu/sinistres.png', caption: 'Déclaration et suivi des sinistres' },
//     { id: 'fag4', imageUrl: '/assets/screenshots/faggu/paiements.png', caption: 'Interface de paiement multi-méthodes' }
//   ],
//   challenges: [
//     'Intégration avec les systèmes legacy des compagnies d\'assurance',
//     'Digitalisation des processus de souscription complexes',
//     'Évaluation automatique des risques selon les profils locaux',
//     'Gestion des paiements récurrents via mobile money',
//     'Conformité avec les réglementations d\'assurance CIMA'
//   ],
//   solutions: [
//     'APIs d\'intégration robustes avec mapping de données legacy',
//     'Formulaires dynamiques adaptatifs selon le type d\'assurance',
//     'Moteur de règles métier pour l\'évaluation des risques',
//     'Intégration native avec les APIs des opérateurs de paiement',
//     'Architecture de conformité avec audit trails complets'
//   ],
//   keyFeatures: [
//     'Souscription en ligne multi-produits (auto, santé, habitation)',
//     'Gestion complète du cycle de vie des polices',
//     'Déclaration de sinistres avec upload de documents',
//     'Paiements automatiques via mobile money',
//     'Notifications SMS/email en temps réel',
//     'Chat support intégré avec les agents',
//     'Tableau de bord assuré personnalisé',
//     'Interface agent pour gestion clientèle'
//   ]
// };

// Projet Afkash
export const kaayEatDetail: ProjectDetail = {
  id: 'kaayeat',
  type: 'Personnel',
  title: 'KaayEat',
  description: 'Projet de design thinking explorant l\'identité visuelle et l\'expérience utilisateur d\'un restaurant fictif.',
  longDescription: `
    KaayEat est un projet de design thinking personnel qui explore la création d'une identité de marque complète pour un restaurant fictif. Ce projet conceptuel se concentre sur la réflexion stratégique autour de l'expérience client, du positionnement de marque et de l'écosystème visuel d'un établissement de restauration moderne.

    L'objectif est de développer une approche holistique du design d'expérience pour la restauration, en explorant les interactions entre identité visuelle, expérience utilisateur et stratégie de marque. Le projet examine comment créer une cohérence entre l'identité du restaurant, ses valeurs, son public cible et son positionnement sur le marché.

    Cette démarche de design thinking comprend la recherche utilisateur, la définition de personas, l'architecture de l'expérience client, et la conceptualisation de l'identité de marque. C'est un laboratoire créatif qui explore les tendances actuelles de la restauration et propose des solutions innovantes pour l'expérience culinaire moderne.
  `,
  date: 'Terminé',
  imageUrl: kaayeatbanner,
  videoUrl: kouakou,
  tags: [
    { name: 'Design Thinking', color: '#FF6B6B' },
    { name: 'UX Research', color: '#4ECDC4' },
    { name: 'Branding', color: '#45B7D1' },
    { name: 'Conceptuel', color: '#96CEB4' }
  ],
  inProgress: false,
  category: 'web',
  technologies: [
    { name: 'React', logo: reactLogo, color: '#F24E1E' },
    { name: 'Three', logo: threejsLogo, color: '#FFD02F' },
    { name: 'Framer-motion', logo: framerLogo, color: '#FF0000' },
  ],
  screenshots: [
    { id: 'kay1', imageUrl: kaayeat1, caption: 'Hero' },
    { id: 'kay2', imageUrl: kaayeat2, caption: 'Menu en cartes' },
    { id: 'kay3', imageUrl: kaayeat3, caption: 'A propos' },
    { id: 'kay4', imageUrl: kaayeat4, caption: 'Specialites' },
    { id: 'kay4', imageUrl: kaayeat5, caption: 'Contact/Chef' }

  ],
  challenges: [
    'Définition d\'une identité de marque distinctive dans un marché saturé',
    'Équilibre entre authenticité culturelle et modernité',
    'Conceptualisation d\'une expérience cohérente sans prototype',
    'Différenciation par rapport aux chaînes de restauration existantes'
  ],
  solutions: [
    'Recherche approfondie sur les tendances de la restauration locale',
    'Méthodologie de design thinking structurée et itérative',
    'Création d\'un univers visuel inspiré de la diversité des cultures culinaires',
    'Développement d\'une charte graphique complète et modulaire',
    'Focus sur l\'expérience émotionnelle plutôt que fonctionnelle'
  ],
  keyFeatures: [
    'Identité visuelle complète (logo, couleurs, typographie)',
    'Concept d\'expérience restaurant holistique',
    'Exploration de différentes déclinaisons visuelles',
    'Positionnement stratégique de la marque',
    'Vision conceptuelle de l\'espace physique',
  ]
};
// Créer un objet qui contient tous les détails des projets
const projectsDetailData: Record<string, ProjectDetail> = {
  'portfolio': portfolioDetail,
  'degloul': degloul,
  'facounting': faCountingDetail,
  'paygo': paygoDetail,
  // 'faggu Assurance': fagguDetail,
  'kaayeat': kaayEatDetail
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