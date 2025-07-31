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
  ];