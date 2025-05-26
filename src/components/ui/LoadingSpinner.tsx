// src/components/ui/LoadingSpinner.tsx
import { memo } from 'react'

const LoadingSpinner = () => {
  return (
    <div className="relative w-16 h-16">
      {/* Spinner principal */}
      <div className="w-full h-full border-4 border-[#4ADE80]/20 border-t-[#4ADE80] 
        rounded-full animate-spin" />
      
      {/* Cercle intérieur */}
      <div className="absolute top-1/2 left-1/2 w-8 h-8 -mt-4 -ml-4
        border-4 border-[#4ADE80]/20 border-b-[#4ADE80] 
        rounded-full animate-spin animate-reverse-spin" />
      
      {/* Point central pulsant */}
      <div className="absolute top-1/2 left-1/2 w-2 h-2 -mt-1 -ml-1
        bg-[#4ADE80] rounded-full animate-pulse-slow" />
    </div>
  )
}

export default memo(LoadingSpinner)