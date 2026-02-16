import type React from 'react';
import type { Dispatch, SetStateAction} from 'react';


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
  TALENT = 'TALENT',
  BRAND = 'BRAND',
  ADMIN = 'ADMIN'
}

export interface Creator {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  country: string;
  interests: string[];
  stats: {
    tiktok: {
      handle: string;
      followers: string;
      engagement: string;
      avgViews: string;
    };
    instagram: {
      handle: string;
      followers: string;
      engagement: string;
      avgViews: string;
    };
  };
  contentGallery: string[];
}

export interface CampaignRequirement {
  id: string;
  title: string;
  description: string;
  type: 'Podcast' | 'Performance';
  links: string[];
  moments?: string[];
  audioTags?: string[];
}

export interface PlatformPayout {
  platform: Platform;
  rate: string;
  minPayout: string;
  maxPayout: string;
}

export interface TopVideo {
  id: string;
  title: string;
  views: string;
  payout: string;
  thumbnail: string;
  creatorAvatar: string;
  creatorName: string;
  creatorHandle: string;
}

export interface Campaign {
  id: string;
  title: string;
  brandName: string;
  brandLogo: string;
  image: string;
  category: CampaignCategory;
  type: 'Clipping' | 'Direct' | 'UGC';
  totalBudgetUSD: number; // For detailed campaign view
  paidOutUSD: number;
  totalBudgetUGX: number;
  paidOutUGX: number;
  cpmUGX: number;
  cpmUSD: string;
  approvalRate: number;
  avgReviewTime: string;
  views: string;
  creatorCount: number;
  daysAgo: number;
  isVerified: boolean;
  platforms: Platform[];
  description: string;
  requirementsText: string;
  requirements?: CampaignRequirement[];
  platformPayouts: PlatformPayout[];
  faqs: { question: string; answer: string }[];
  topVideos: TopVideo[];
  lastUpdated: string;
  launchedOn: string;
}

export interface ContentSubmission {
  id: string;
  campaignId: string;
  creatorId: string;
  creatorName: string;
  creatorHandle: string;
  link: string;
  lane: 'Podcast' | 'Performance';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  timestamp: string;
  views?: string;
}

export interface Stats {
  views: number;
  payoutsUGX: number;
  totalSubmissions: number;
  approvedSubmissions: number;
  activeCampaigns: number;
}
