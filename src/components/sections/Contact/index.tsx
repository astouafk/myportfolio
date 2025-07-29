// src/components/sections/Contact/index.tsx
import { useRef, lazy, Suspense, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';

// Import dynamique de l'arrière-plan
const ContactBackground = lazy(() => import('./components/ContactBackground'));

// Fallback pour le chargement de l'arrière-plan
const BackgroundFallback = () => <div className="absolute inset-0 bg-black/50" />;

const Contact = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
  
  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black flex items-center py-20 mt-40"
    >
      {/* Arrière-plan */}
      <Suspense fallback={<BackgroundFallback />}>
        <ContactBackground />
      </Suspense>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* En-tête */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: -20 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="text-[#4ADE80]">Con</span>tactez Moi
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Envie de travailler ensemble ? Vous avez une question ou une idée de projet ?
            N'hésitez pas à me contacter !
          </p>
          <div className="h-1 w-20 bg-[#4ADE80] mx-auto mt-6 rounded-full"></div>
        </motion.div>
        
        {/* Contenu principal - Carte en verre */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900/60 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Formulaire de contact */}
              <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex items-center">
                <ContactForm />
              </div>
              
              {/* Informations de contact */}
              <div className="p-6 sm:p-8 md:p-10 lg:p-12 bg-white/5">
                <ContactInfo />
              </div>
            </div>
          </div>
        </div>
        
        {/* Section CTA supplémentaire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-16 md:mt-24"
        >
        </motion.div>
      </div>
      
      {/* Élément décoratif */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-radial from-[#4ADE80]/10 to-transparent opacity-30 blur-3xl animate-pulse-slow" />
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-radial from-[#4ADE80]/10 to-transparent opacity-30 blur-3xl animate-float" />
    </section>
  );
});

export default Contact;