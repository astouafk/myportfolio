// src/components/sections/Hero/types/index.ts
import { LucideIcon } from 'lucide-react';

export interface Stat {
  value: string;
  label: string;
  icon: string;
}

export interface SocialLink {
  name: string;
  icon: LucideIcon;
  url: string;
}