import type React from 'react';
import type { Dispatch, SetStateAction} from 'react';


export type AuthStep = 'ROLE_SELECTION' | 'AUTH_ENTRY' | 'OTP_VERIFY';




export interface Campaign {
  title: string;
  country: number;
  description: string;
  launchDate: string;
  // endDate?: string;
  hashtags: string;
  budget: number;
  cpm: number;
  productType: 'physical' | 'digital' | 'none';
  ageRanges: string[];
  gender: 'F' | 'M' | 'B';
  visibility: 'open' | 'private';
  brand_id?: string;
}

export interface KPI{
  label: string
  value: string
  change: number
  isPositive: boolean
}


export interface CustomLink{
  path: string
  label: string
  icon: React.ReactNode
}

export interface CreatorDashboardContextType {
  activeView: string;
  setActiveView: Dispatch<SetStateAction<string>>;
}

export interface BrandDashboardContextType {
  activeView: string;
  setActiveView: Dispatch<SetStateAction<string>>;
}

export enum Platform {
  TIKTOK = 'TikTok',
  INSTAGRAM = 'Instagram',
  YOUTUBE = 'YouTube',
  TWITTER = 'Twitter'
}

export enum CampaignCategory {
  ENTERTAINMENT = 'Entertainment',
  MUSIC = 'Music',
  LIFESTYLE = 'Lifestyle',
  TECH = 'Tech',
  FOOD = 'Food'
}

export enum UserRole {
  CREATOR = 'creator',
  BRAND = 'brand',
}
