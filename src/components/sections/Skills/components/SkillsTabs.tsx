// src/components/sections/Skills/components/SkillsTabs.tsx
import { motion } from 'framer-motion';
import { memo } from 'react';
import { SkillsCategory } from '../types';

interface SkillsTabsProps {
  activeCategory: SkillsCategory;
  setActiveCategory: (category: SkillsCategory) => void;
}

const SkillsTabs = memo(({ activeCategory, setActiveCategory }: SkillsTabsProps) => {
  const tabs = [
    { 
      id: 'frontend', 
      label: 'Frontend',
      icon: (isActive: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M15 15.5L18.5 12L15 8.5M9 8.5L5.5 12L9 15.5M13 6L11 18" 
            stroke={isActive ? "#4ADE80" : "currentColor"} 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    { 
      id: 'backend', 
      label: 'Backend & BDD',
      icon: (isActive: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" 
            stroke={isActive ? "#4ADE80" : "currentColor"} 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M8 10H16M8 14H12" 
            stroke={isActive ? "#4ADE80" : "currentColor"} 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    { 
      id: 'mobile', 
      label: 'Mobile',
      icon: (isActive: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect 
            x="7" y="3" width="10" height="18" rx="2" 
            stroke={isActive ? "#4ADE80" : "currentColor"} 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <line 
            x1="10" y1="18" x2="14" y2="18" 
            stroke={isActive ? "#4ADE80" : "currentColor"} 
            strokeWidth="1.5" 
            strokeLinecap="round"
          />
        </svg>
      )
    },
    { 
      id: 'transversal', 
      label: 'Autres',
      icon: (isActive: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M12 4V5M12 19V20M4 12H5M19 12H20M6.36 6.36L7.05 7.05M17.64 17.64L16.95 16.95M17.64 6.36L16.95 7.05M6.36 17.64L7.05 16.95M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" 
            stroke={isActive ? "#4ADE80" : "currentColor"} 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      )
    }
  ];

  return (
    <div className="flex flex-wrap justify-center border-b border-[#4ADE80]/20">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveCategory(tab.id as SkillsCategory)}
          className={`relative py-3 px-4 sm:px-6 text-sm sm:text-base font-medium transition-colors duration-300
            flex items-center gap-2 ${activeCategory === tab.id ? 'text-[#4ADE80]' : 'text-gray-400 hover:text-white'}`}
          aria-selected={activeCategory === tab.id}
        >
          {tab.icon(activeCategory === tab.id)}
          {tab.label}
          
          {/* Active indicator */}
          {activeCategory === tab.id && (
            <motion.div
              layoutId="activeSkillTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4ADE80]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </button>
      ))}
    </div>
  );
});

export default SkillsTabs;