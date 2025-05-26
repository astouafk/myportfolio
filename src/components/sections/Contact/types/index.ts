// src/components/sections/Contact/types/index.ts
import { LucideIcon } from 'lucide-react';

export interface ContactInfo {
  icon: LucideIcon;
  label: string;
  value: string;
}

export interface SocialLink {
  name: string;
  icon: LucideIcon;
  url: string;
}