// src/components/sections/About/components/AboutTabs.tsx - ULTRA BLING
import { motion } from 'framer-motion';
import { memo } from 'react';
import { GraduationCap, Award, Sparkles } from 'lucide-react';

type TabType = 'education' | 'certifications';

interface AboutTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const AboutTabs = memo(({ activeTab, setActiveTab }: AboutTabsProps) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode; gradient: string }[] = [
    { 
      id: 'education', 
      label: 'Formations',
      icon: <GraduationCap className="w-5 h-5" />,
      gradient: 'from-blue-500 to-purple-600'
    },
    { 
      id: 'certifications', 
      label: 'Certifications',
      icon: <Award className="w-5 h-5" />,
      gradient: 'from-green-500 to-teal-600'
    }
  ];

  return (
    <div className="relative flex bg-black/30 backdrop-blur-xl rounded-2xl p-2 border border-white/10">
      {/* Fond animé pour l'onglet actif */}
      <motion.div
        className="absolute top-2 bottom-2 bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] rounded-xl"
        layoutId="activeTabBackground"
        style={{
          boxShadow: '0 0 30px rgba(74, 222, 128, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
        }}
      />
      
      {tabs.map((tab, index) => (
        <motion.button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative z-10 flex-1 py-4 px-6 text-sm font-bold transition-all duration-300
            flex items-center justify-center gap-3 rounded-xl ${
              activeTab === tab.id 
                ? 'text-black shadow-lg' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          whileHover={{
            scale: 1.02,
            y: -1
          }}
          whileTap={{
            scale: 0.98
          }}
        >
          {/* Icône avec animation */}
          <motion.span
            animate={activeTab === tab.id ? {
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            } : {}}
            transition={{
              duration: 0.8,
              repeat: activeTab === tab.id ? Infinity : 0,
              repeatDelay: 3
            }}
          >
            {tab.icon}
          </motion.span>
          
          {tab.label}
          
          {/* Particules autour de l'onglet actif */}
          {activeTab === tab.id && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                  }}
                  animate={{
                    y: [-10, -30, -10],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeOut"
                  }}
                />
              ))}
            </>
          )}
          
          {/* Effet scintillant */}
          {activeTab === tab.id && (
            <motion.div
              className="absolute top-1 right-1"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              <Sparkles className="w-3 h-3 text-white" />
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );
});
export default AboutTabs;