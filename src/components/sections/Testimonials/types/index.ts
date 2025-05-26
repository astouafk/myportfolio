// src/components/sections/Testimonials/types/index.ts
import wane from '../../../../assets/testimonials/Wane.jpeg';
import ousmane from '../../../../assets/testimonials/Ousmane.jpeg';
import guisse from '../../../../assets/testimonials/Guisse.jpeg';
import sidibe from '../../../../assets/testimonials/Sidibe.jpeg';
import mane from '../../../../assets/testimonials/mane.png';

// Type pour un témoignage simplifié
export interface Testimonial {
    id: string;
    personName: string;
    personTitle: string;
    company: string;
    personImage?: string; // URL de l'image
    text: string;
  }
  
  // Données d'exemple
  export const testimonialsData: Testimonial[] = [
    {
      id: 'test1',
      personName: 'Birane Baila WANE',
      personTitle: 'Architecte Logiciel',
      company: 'Groupe SONATEL',
      personImage: wane,
      text: "J\'’ai eu le plaisir d’accompagner Astou tout au long de sa formation en développement web et mobile, et je peux affirmer avec certitude qu’elle fait preuve d’un engagement remarquable et d’un véritable esprit d’initiative. Astou maîtrise aussi bien les fondamentaux du développement frontend (HTML, CSS, JavaScript, Angular) que les technologies backend comme Node.js et PHP. Elle se distingue par sa rigueur, sa curiosité et sa capacité à progresser rapidement, même face à des défis complexes. Sa passion pour le code est évidente, et elle sait travailler aussi bien en autonomie qu’en équipe. Je suis convaincu qu’elle a un bel avenir dans le domaine du développement, et je la recommande sans hésitation"
    },
    {
      id: 'test2',
      personName: 'Ousmane NDIAYE',
      personTitle: 'Tech Lead',
      company: 'Michelin',
      personImage: ousmane,
      text: "Durant son stage chez nous, Astou a démontré un grand sérieux, une bonne capacité d’adaptation et un réel intérêt pour le développement web et mobile. Elle a su rapidement prendre en main les outils et frameworks utilisés, et a contribué efficacement aux projets de l’équipe. Aujourd'hui elle est pro dans une autre boite et continue à réaliser des projets de qualité."
    },
    {
      id: 'test3',
      personName: 'Ibrahima GUISSE',
      personTitle: 'Consultant React Native',
      company: 'BNP Paribas Cardif',
      personImage: guisse,
      text: "J’ai eu l’opportunité de collaborer avec Astou sur une application mobile de lecture de livres audios. Elle a été très impliquée, force de proposition et toujours attentive aux détails. Travailler avec elle a été à la fois fluide et enrichissant."
    },
    {
      id: 'test4',
      personName: 'AbdouKarim SIDIBE',
      personTitle: 'Software Engineer',
      company: 'Credit Mutuel du Sénégal',
      personImage: sidibe,
      text: "Pendant notre collaboration sur un projet de lecture de livres audios, Astou a assuré toute la partie frontend avec sérieux et efficacité. Elle comprend vite les enjeux techniques, communique clairement et transforme les besoins en interfaces fonctionnelles et intuitives. Un vrai plaisir de travailler avec elle."
    },
    {
      id: 'test5',
      personName: 'Yankhoba MANE',
      personTitle: 'Chef de service',
      company: 'OSS Center, Groupe SONATEL',
      personImage: mane,
      text: "Notre collaboration avec Astou a été excellente de bout en bout. Elle a su comprendre notre vision et l'a transformée en un plateforme mobile dynamique et moderne qui a dépassé nos attentes. Sa communication claire et régulière a facilité le processus et nous a permis de sentir son implication à chaque étape."
    }
  ];