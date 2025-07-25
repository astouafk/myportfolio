// src/components/layout/Footer/index.tsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Heart,
  ArrowUp,
  Twitter,
  Instagram
} from 'lucide-react';

const Footer = memo(() => {
  // Scroll vers le haut
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Liens de navigation rapide
  const quickLinks = [
    { name: 'Accueil', href: '#hero' },
    { name: 'À propos', href: '#about' },
    { name: 'Compétences', href: '#skills' },
    { name: 'Projets', href: '#projects' },
    { name: 'Témoignages', href: '#testimonials' }
  ];

  // Informations de contact
  const contactInfo = [
    {
      icon: <Mail className="w-4 h-4" />,
      label: 'Email',
      value: 'astou.afk.dev@gmail.com',
      href: 'mailto:astou.afk.dev@gmail.com'
    },
    {
      icon: <Phone className="w-4 h-4" />,
      label: 'Téléphone',
      value: '+221 77 XXX XX XX',
      href: 'tel:+221XXXXXXXX'
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      label: 'Localisation',
      value: 'Dakar, Sénégal',
      href: 'https://maps.google.com/?q=Dakar,Senegal'
    }
  ];

  // Réseaux sociaux
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      href: 'https://github.com/astouafk',
      color: 'hover:text-gray-300'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      href: 'https://linkedin.com/in/astou-afk',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      href: 'https://twitter.com/astou_afk',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      href: 'https://instagram.com/astou_afk',
      color: 'hover:text-pink-400'
    }
  ];

  // Animation du footer
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative bg-black border-t border-white/10 overflow-hidden"
    >
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient de fond */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/50 to-black" />
        
        {/* Particules lumineuses */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#4ADE80]/60 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Lueur douce */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 
          bg-gradient-radial from-[#4ADE80]/10 to-transparent blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Contenu principal du footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Section À propos */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white mb-2">
                <span className="text-[#4ADE80]">Astou</span> Fall KANE
              </h3>
              <p className="text-gray-300 text-sm mb-4 max-w-md">
                Développeuse fullstack passionnée, créatrice d'expériences numériques 
                innovantes et performantes. Spécialisée en React, Flutter et technologies modernes.
              </p>
            </div>
            
            {/* Réseaux sociaux */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Suivez-moi :</span>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full bg-white/5 border border-white/10 
                      text-gray-400 transition-all duration-300 ${social.color}
                      hover:bg-white/10 hover:border-white/20 hover:scale-110`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Navigation rapide */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#4ADE80] transition-colors text-sm
                      flex items-center gap-2 hover:translate-x-1 transform duration-200"
                  >
                    <div className="w-1 h-1 rounded-full bg-[#4ADE80]/60" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              {contactInfo.map((contact) => (
                <li key={contact.label}>
                  <a
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-3 text-gray-400 hover:text-[#4ADE80] 
                      transition-colors text-sm group"
                  >
                    <div className="mt-0.5 text-[#4ADE80]/80 group-hover:text-[#4ADE80]">
                      {contact.icon}
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">{contact.label}</div>
                      <div>{contact.value}</div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Séparateur */}
        <motion.div 
          variants={itemVariants}
          className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"
        />

        {/* Footer bottom */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>© 2025 Astou Fall KANE. Conçu avec</span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                color: ['#ef4444', '#f97316', '#ef4444']
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-4 h-4 fill-current" />
            </motion.div>
            <span>et React</span>
          </div>

          {/* Technologies utilisées */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>React</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Three.js</span>
            <span>•</span>
            <span>Tailwind CSS</span>
          </div>

          {/* Bouton retour en haut */}
          <motion.button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-[#4ADE80]/10 border border-[#4ADE80]/30 
              text-[#4ADE80] hover:bg-[#4ADE80]/20 transition-all duration-300
              hover:scale-110"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Message inspirant */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-8 pt-6 border-t border-white/5"
        >
          <p className="text-sm text-gray-500 italic">
            "Code is poetry, design is art, and innovation is the bridge between dreams and reality."
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
});

export default Footer;