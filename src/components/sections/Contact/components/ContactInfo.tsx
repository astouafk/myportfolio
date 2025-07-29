// src/components/sections/Contact/components/ContactInfo.tsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Github, Linkedin, Instagram } from 'lucide-react';

const ContactInfo = memo(() => {
  // Informations de contact
  const contactDetails = [
    {
      icon: <Mail className="w-5 h-5 text-[#4ADE80]" />,
      label: 'Email',
      value: 'asfallkane@gmail.com',
      href: 'mailto:astou.kane@example.com'
    },
    // {
    //   icon: <Phone className="w-5 h-5 text-[#4ADE80]" />,
    //   label: 'Téléphone',
    //   value: '+221 77 359 34 71',
    //   href: 'tel:+33600000000'
    // },
    {
      icon: <MapPin className="w-5 h-5 text-[#4ADE80]" />,
      label: 'Localisation',
      value: 'Dakar, Sénégal',
      href: null
    }
  ];
  
  // Réseaux sociaux
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      url: 'https://github.com/astouafk'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      url: 'https://www.linkedin.com/in/astou-fall-kane-127721260'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      url: 'https://instagram.com/astouafk'
    }
  ];
  
  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="space-y-8"
    >
      {/* Titre */}
      <motion.div variants={itemVariants}>
        <h3 className="text-2xl font-bold text-white mb-2">Restons en Contact</h3>
        <p className="text-gray-300">
          N'hésitez pas à me contacter pour discuter de votre projet ou simplement pour échanger !
        </p>
      </motion.div>
      
      {/* Informations de contact */}
      <motion.div variants={itemVariants} className="space-y-4">
        {contactDetails.map((contact, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#4ADE80]/10 flex items-center justify-center flex-shrink-0">
              {contact.icon}
            </div>
            <div>
              <div className="text-gray-400 text-sm">{contact.label}</div>
              {contact.href ? (
                <a 
                  href={contact.href} 
                  className="text-white hover:text-[#4ADE80] transition-colors"
                >
                  {contact.value}
                </a>
              ) : (
                <div className="text-white">{contact.value}</div>
              )}
            </div>
          </div>
        ))}
      </motion.div>
      
      {/* Réseaux sociaux */}
      <motion.div variants={itemVariants}>
        <div className="text-gray-400 text-sm mb-3">Me suivre</div>
        <div className="flex gap-3">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm
                border border-white/10 flex items-center justify-center
                text-white hover:text-[#4ADE80] hover:border-[#4ADE80]/30 hover:bg-[#4ADE80]/10
                transition-all duration-300"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </motion.div>
      
      {/* Disponibilité */}
      <motion.div variants={itemVariants} className="bg-[#4ADE80]/10 border border-[#4ADE80]/30 rounded-xl p-4">
        <div className="text-[#4ADE80] font-medium mb-1">Disponibilité</div>
        <p className="text-gray-300 text-sm">
          Actuellement disponible pour des missions freelance et des collaborations.
        </p>
      </motion.div>
    </motion.div>
  );
});

export default ContactInfo;