// // src/components/sections/About/components/AboutTabs.tsx
// import { motion } from 'framer-motion';
// import { memo } from 'react';

// type TabType = 'skills' | 'education' | 'certifications';

// interface AboutTabsProps {
//   activeTab: TabType;
//   setActiveTab: (tab: TabType) => void;
// }

// const AboutTabs = memo(({ activeTab, setActiveTab }: AboutTabsProps) => {
//   const tabs: { id: TabType; label: string }[] = [
//     { id: 'skills', label: 'Skills' },
//     { id: 'education', label: 'Education' },
//     { id: 'certifications', label: 'Certifications' }
//   ];

//   return (
//     <div className="flex border-b border-[#4ADE80]/20">
//       {tabs.map(tab => (
//         <button
//           key={tab.id}
//           onClick={() => setActiveTab(tab.id)}
//           className={`relative py-2 px-4 text-sm sm:text-base font-medium transition-colors duration-300
//             ${activeTab === tab.id ? 'text-[#4ADE80]' : 'text-gray-400 hover:text-white'}`}
//           aria-selected={activeTab === tab.id}
//         >
//           {tab.label}
          
//           {/* Active indicator */}
//           {activeTab === tab.id && (
//             <motion.div
//               layoutId="activeTabIndicator"
//               className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4ADE80]"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.3 }}
//             />
//           )}
//         </button>
//       ))}
//     </div>
//   );
// });

// export default AboutTabs;












// src/components/sections/About/components/AboutTabs.tsx
import { motion } from 'framer-motion';
import { memo } from 'react';

// Type pour les onglets - Skills supprimé
type TabType = 'education' | 'certifications';

interface AboutTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const AboutTabs = memo(({ activeTab, setActiveTab }: AboutTabsProps) => {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'education', label: 'Formations' },
    { id: 'certifications', label: 'Certifications' }
  ];

  return (
    <div className="flex border-b border-[#4ADE80]/20">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative py-2 px-4 text-sm sm:text-base font-medium transition-colors duration-300
            ${activeTab === tab.id ? 'text-[#4ADE80]' : 'text-gray-400 hover:text-white'}`}
          aria-selected={activeTab === tab.id}
        >
          {tab.label}
          
          {/* Active indicator */}
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTabIndicator"
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

export default AboutTabs;