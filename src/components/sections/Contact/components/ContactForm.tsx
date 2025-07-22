// src/components/sections/Contact/components/ContactForm.tsx
import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Check, Send, AlertCircle } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm = memo(() => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Validation des champs
  const validateField = (name: keyof FormState, value: string): string | undefined => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? 'Le nom est requis' : undefined;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.trim() === '') return 'L\'email est requis';
        if (!emailRegex.test(value)) return 'Veuillez entrer un email valide';
        return undefined;
      case 'subject':
        return value.trim() === '' ? 'Le sujet est requis' : undefined;
      case 'message':
        return value.trim() === '' ? 'Le message est requis' : undefined;
      default:
        return undefined;
    }
  };
  
  // Gestion des changements dans les champs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Validation à la frappe pour donner un feedback immédiat
    const error = validateField(name as keyof FormState, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };
  
  // Validation du formulaire complet
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    Object.entries(formState).forEach(([key, value]) => {
      const fieldName = key as keyof FormState;
      const error = validateField(fieldName, value);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Ici, vous intégreriez un appel à votre API ou service de formulaire
      // Par exemple, avec Fetch ou Axios:
      
      // Simulation d'un appel API (à remplacer par votre logique)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      /*
      // Exemple concret à implémenter selon votre backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });
      
      if (!response.ok) throw new Error('Erreur lors de l'envoi');
      */
      
      // Succès
      setSubmitStatus('success');
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Animations
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const inputVariants = {
    focus: { 
      scale: 1.01,
      borderColor: 'rgba(74, 222, 128, 0.5)',
      boxShadow: '0 0 0 2px rgba(74, 222, 128, 0.2)',
      transition: { duration: 0.2 }
    },
    blur: { 
      scale: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      boxShadow: 'none',
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full max-w-lg mx-auto"
    >
      {submitStatus === 'success' ? (
        <div className="bg-[#4ADE80]/10 border border-[#4ADE80]/30 text-[#4ADE80] p-6 rounded-xl text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#4ADE80]/20 flex items-center justify-center">
              <Check className="w-8 h-8 text-[#4ADE80]" />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">Message envoyé avec succès!</h3>
          <p className="text-gray-300 mb-4">
            Merci pour votre message. Je vous répondrai dans les plus brefs délais.
          </p>
          <button
            onClick={() => setSubmitStatus('idle')}
            className="px-6 py-2 bg-[#4ADE80]/10 border border-[#4ADE80]/30 text-[#4ADE80] 
              rounded-lg hover:bg-[#4ADE80]/20 transition-colors"
          >
            Envoyer un autre message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Message d'erreur global */}
          {submitStatus === 'error' && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>Une erreur est survenue lors de l'envoi. Veuillez réessayer.</span>
            </div>
          )}
          
          {/* Nom */}
          <div>
            <label htmlFor="name" className="block text-white font-medium mb-2">
              Nom
            </label>
            <motion.input
              id="name"
              name="name"
              type="text"
              value={formState.name}
              onChange={handleChange}
              initial="blur"
              whileFocus="focus"
              variants={inputVariants}
              className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3
                text-white placeholder-gray-400 focus:outline-none"
              placeholder="Votre nom"
            />
            {errors.name && (
              <div className="mt-1 text-sm text-red-400">{errors.name}</div>
            )}
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-white font-medium mb-2">
              Email
            </label>
            <motion.input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              initial="blur"
              whileFocus="focus"
              variants={inputVariants}
              className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3
                text-white placeholder-gray-400 focus:outline-none"
              placeholder="votre.email@exemple.com"
            />
            {errors.email && (
              <div className="mt-1 text-sm text-red-400">{errors.email}</div>
            )}
          </div>
          
          {/* Sujet */}
          <div>
            <label htmlFor="subject" className="block text-white font-medium mb-2">
              Sujet
            </label>
            <motion.input
              id="subject"
              name="subject"
              type="text"
              value={formState.subject}
              onChange={handleChange}
              initial="blur"
              whileFocus="focus"
              variants={inputVariants}
              className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3
                text-white placeholder-gray-400 focus:outline-none"
              placeholder="Sujet de votre message"
            />
            {errors.subject && (
              <div className="mt-1 text-sm text-red-400">{errors.subject}</div>
            )}
          </div>
          
          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-white font-medium mb-2">
              Message
            </label>
            <motion.textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              initial="blur"
              whileFocus="focus"
              variants={inputVariants}
              className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3
                text-white placeholder-gray-400 focus:outline-none min-h-[150px] resize-y"
              placeholder="Votre message ici..."
            />
            {errors.message && (
              <div className="mt-1 text-sm text-red-400">{errors.message}</div>
            )}
          </div>
          
          {/* Bouton d'envoi */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 flex items-center justify-center gap-2 bg-[#4ADE80]/10 
                border border-[#4ADE80]/50 text-[#4ADE80] rounded-lg transition-all duration-300
                ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#4ADE80]/20'}`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#4ADE80]/30 border-t-[#4ADE80] rounded-full animate-spin" />
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Envoyer</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
});

export default ContactForm;








// // src/components/sections/Contact/components/ContactForm.tsx - AVEC EMAILJS
// import { useState, memo } from 'react';
// import { motion } from 'framer-motion';
// import { Check, Send, AlertCircle } from 'lucide-react';
// import emailjs from '@emailjs/browser';

// interface FormState {
//   name: string;
//   email: string;
//   subject: string;
//   message: string;
// }

// interface FormErrors {
//   name?: string;
//   email?: string;
//   subject?: string;
//   message?: string;
// }

// const ContactForm = memo(() => {
//   const [formState, setFormState] = useState<FormState>({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });
  
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
//   // 🎯 CONFIGURATION EMAILJS (à définir dans tes variables d'environnement)
//   const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_xxxxxxx';
//   const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_xxxxxxx';
//   const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'xxxxxxxxxxxxxxx';
  
//   // Validation des champs
//   const validateField = (name: keyof FormState, value: string): string | undefined => {
//     switch (name) {
//       case 'name':
//         if (value.trim() === '') return 'Le nom est requis';
//         if (value.trim().length < 2) return 'Le nom doit contenir au moins 2 caractères';
//         return undefined;
//       case 'email':
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (value.trim() === '') return 'L\'email est requis';
//         if (!emailRegex.test(value)) return 'Veuillez entrer un email valide';
//         return undefined;
//       case 'subject':
//         if (value.trim() === '') return 'Le sujet est requis';
//         if (value.trim().length < 5) return 'Le sujet doit contenir au moins 5 caractères';
//         return undefined;
//       case 'message':
//         if (value.trim() === '') return 'Le message est requis';
//         if (value.trim().length < 20) return 'Le message doit contenir au moins 20 caractères';
//         return undefined;
//       default:
//         return undefined;
//     }
//   };
  
//   // Gestion des changements dans les champs
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormState(prev => ({ ...prev, [name]: value }));
    
//     // Validation à la frappe pour donner un feedback immédiat
//     const error = validateField(name as keyof FormState, value);
//     setErrors(prev => ({ ...prev, [name]: error }));
//   };
  
//   // Validation du formulaire complet
//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};
//     let isValid = true;
    
//     Object.entries(formState).forEach(([key, value]) => {
//       const fieldName = key as keyof FormState;
//       const error = validateField(fieldName, value);
//       if (error) {
//         newErrors[fieldName] = error;
//         isValid = false;
//       }
//     });
    
//     setErrors(newErrors);
//     return isValid;
//   };
  
//   // 🎯 ENVOI EMAIL AVEC EMAILJS
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setIsSubmitting(true);
//     setSubmitStatus('idle');
    
//     try {
//       // 🎯 PARAMÈTRES POUR LE TEMPLATE EMAILJS
//       const templateParams = {
//         from_name: formState.name,
//         from_email: formState.email,
//         subject: formState.subject,
//         message: formState.message,
//         to_name: 'Astou Fall KANE',
//         reply_to: formState.email,
//         // Informations supplémentaires
//         timestamp: new Date().toLocaleString('fr-FR', {
//           timeZone: 'Africa/Dakar',
//           year: 'numeric',
//           month: 'long',
//           day: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit'
//         }),
//         user_agent: navigator.userAgent,
//       };
      
//       // 🎯 ENVOI VIA EMAILJS
//       const response = await emailjs.send(
//         EMAILJS_SERVICE_ID,
//         EMAILJS_TEMPLATE_ID,
//         templateParams,
//         EMAILJS_PUBLIC_KEY
//       );
      
//       console.log('✅ Email envoyé avec succès:', response.status, response.text);
      
//       // Succès
//       setSubmitStatus('success');
//       setFormState({
//         name: '',
//         email: '',
//         subject: '',
//         message: ''
//       });
//       setErrors({});
      
//     } catch (error) {
//       console.error('❌ Erreur lors de l\'envoi du message:', error);
//       setSubmitStatus('error');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
//   // Animations
//   const formVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" }
//     }
//   };
  
//   const inputVariants = {
//     focus: { 
//       scale: 1.01,
//       borderColor: 'rgba(74, 222, 128, 0.5)',
//       boxShadow: '0 0 0 2px rgba(74, 222, 128, 0.2)',
//       transition: { duration: 0.2 }
//     },
//     blur: { 
//       scale: 1,
//       borderColor: 'rgba(255, 255, 255, 0.1)',
//       boxShadow: 'none',
//       transition: { duration: 0.2 }
//     }
//   };
  
//   return (
//     <motion.div
//       variants={formVariants}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.3 }}
//       className="w-full max-w-lg mx-auto"
//     >
//       {submitStatus === 'success' ? (
//         <div className="bg-[#4ADE80]/10 border border-[#4ADE80]/30 text-[#4ADE80] p-6 rounded-xl text-center">
//           <div className="flex justify-center mb-4">
//             <div className="w-16 h-16 rounded-full bg-[#4ADE80]/20 flex items-center justify-center">
//               <Check className="w-8 h-8 text-[#4ADE80]" />
//             </div>
//           </div>
//           <h3 className="text-xl font-bold mb-2">Message envoyé avec succès!</h3>
//           <p className="text-gray-300 mb-4">
//             Merci pour votre message. Je vous répondrai dans les plus brefs délais (généralement sous 24h).
//           </p>
//           <button
//             onClick={() => setSubmitStatus('idle')}
//             className="px-6 py-2 bg-[#4ADE80]/10 border border-[#4ADE80]/30 text-[#4ADE80] 
//               rounded-lg hover:bg-[#4ADE80]/20 transition-colors"
//           >
//             Envoyer un autre message
//           </button>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Message d'erreur global */}
//           {submitStatus === 'error' && (
//             <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-lg flex items-center gap-2">
//               <AlertCircle className="w-5 h-5" />
//               <div>
//                 <div className="font-medium">Erreur d'envoi</div>
//                 <div className="text-sm">Une erreur est survenue. Veuillez vérifier votre connexion et réessayer.</div>
//               </div>
//             </div>
//           )}
          
//           {/* Nom */}
//           <div>
//             <label htmlFor="name" className="block text-white font-medium mb-2">
//               Nom *
//             </label>
//             <motion.input
//               id="name"
//               name="name"
//               type="text"
//               value={formState.name}
//               onChange={handleChange}
//               initial="blur"
//               whileFocus="focus"
//               variants={inputVariants}
//               className={`w-full bg-white/5 backdrop-blur-sm border rounded-lg px-4 py-3
//                 text-white placeholder-gray-400 focus:outline-none transition-colors ${
//                   errors.name 
//                     ? 'border-red-500/50 focus:border-red-500' 
//                     : 'border-white/10 focus:border-[#4ADE80]/50'
//                 }`}
//               placeholder="Votre nom complet"
//               maxLength={50}
//             />
//             {errors.name && (
//               <div className="mt-1 text-sm text-red-400 flex items-center gap-1">
//                 <AlertCircle className="w-3 h-3" />
//                 {errors.name}
//               </div>
//             )}
//           </div>
          
//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="block text-white font-medium mb-2">
//               Email *
//             </label>
//             <motion.input
//               id="email"
//               name="email"
//               type="email"
//               value={formState.email}
//               onChange={handleChange}
//               initial="blur"
//               whileFocus="focus"
//               variants={inputVariants}
//               className={`w-full bg-white/5 backdrop-blur-sm border rounded-lg px-4 py-3
//                 text-white placeholder-gray-400 focus:outline-none transition-colors ${
//                   errors.email 
//                     ? 'border-red-500/50 focus:border-red-500' 
//                     : 'border-white/10 focus:border-[#4ADE80]/50'
//                 }`}
//               placeholder="votre.email@exemple.com"
//               maxLength={100}
//             />
//             {errors.email && (
//               <div className="mt-1 text-sm text-red-400 flex items-center gap-1">
//                 <AlertCircle className="w-3 h-3" />
//                 {errors.email}
//               </div>
//             )}
//           </div>
          
//           {/* Sujet */}
//           <div>
//             <label htmlFor="subject" className="block text-white font-medium mb-2">
//               Sujet *
//             </label>
//             <motion.input
//               id="subject"
//               name="subject"
//               type="text"
//               value={formState.subject}
//               onChange={handleChange}
//               initial="blur"
//               whileFocus="focus"
//               variants={inputVariants}
//               className={`w-full bg-white/5 backdrop-blur-sm border rounded-lg px-4 py-3
//                 text-white placeholder-gray-400 focus:outline-none transition-colors ${
//                   errors.subject 
//                     ? 'border-red-500/50 focus:border-red-500' 
//                     : 'border-white/10 focus:border-[#4ADE80]/50'
//                 }`}
//               placeholder="Projet web, collaboration, question..."
//               maxLength={100}
//             />
//             {errors.subject && (
//               <div className="mt-1 text-sm text-red-400 flex items-center gap-1">
//                 <AlertCircle className="w-3 h-3" />
//                 {errors.subject}
//               </div>
//             )}
//           </div>
          
//           {/* Message */}
//           <div>
//             <label htmlFor="message" className="block text-white font-medium mb-2">
//               Message *
//             </label>
//             <motion.textarea
//               id="message"
//               name="message"
//               value={formState.message}
//               onChange={handleChange}
//               initial="blur"
//               whileFocus="focus"
//               variants={inputVariants}
//               className={`w-full bg-white/5 backdrop-blur-sm border rounded-lg px-4 py-3
//                 text-white placeholder-gray-400 focus:outline-none min-h-[150px] resize-y transition-colors ${
//                   errors.message 
//                     ? 'border-red-500/50 focus:border-red-500' 
//                     : 'border-white/10 focus:border-[#4ADE80]/50'
//                 }`}
//               placeholder="Décrivez votre projet, vos besoins ou votre question en détail..."
//               maxLength={2000}
//             />
//             <div className="flex justify-between items-center mt-1">
//               {errors.message ? (
//                 <div className="text-sm text-red-400 flex items-center gap-1">
//                   <AlertCircle className="w-3 h-3" />
//                   {errors.message}
//                 </div>
//               ) : (
//                 <div className="text-sm text-gray-500">
//                   Minimum 20 caractères
//                 </div>
//               )}
//               <div className="text-sm text-gray-500">
//                 {formState.message.length}/2000
//               </div>
//             </div>
//           </div>
          
//           {/* Bouton d'envoi */}
//           <div>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`w-full px-6 py-3 flex items-center justify-center gap-2 bg-[#4ADE80]/10 
//                 border border-[#4ADE80]/50 text-[#4ADE80] rounded-lg transition-all duration-300
//                 font-medium text-lg ${
//                   isSubmitting 
//                     ? 'opacity-70 cursor-not-allowed' 
//                     : 'hover:bg-[#4ADE80]/20 hover:border-[#4ADE80]/70 hover:scale-[1.02]'
//                 }`}
//             >
//               {isSubmitting ? (
//                 <>
//                   <div className="w-5 h-5 border-2 border-[#4ADE80]/30 border-t-[#4ADE80] rounded-full animate-spin" />
//                   <span>Envoi en cours...</span>
//                 </>
//               ) : (
//                 <>
//                   <Send className="w-5 h-5" />
//                   <span>Envoyer le Message</span>
//                 </>
//               )}
//             </button>
//           </div>
          
//           {/* Note de confidentialité */}
//           <div className="text-xs text-gray-500 text-center">
//             🔒 Vos informations sont sécurisées et ne seront jamais partagées.
//           </div>
//         </form>
//       )}
//     </motion.div>
//   );
// });

// export default ContactForm;