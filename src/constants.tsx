import type { Campaign } from "./types";
import { CampaignCategory, Platform } from "./types";

export const CURRENCY = "UGX";
export const WITHDRAWAL_FEE_PERCENT = 20;
export const BRAND_FEE_PERCENT = 15;
export const MIN_WITHDRAWAL_UGX = 20000;

export const MOCK_CAMPAIGNS = [
  {
    id: "cod-bo7",
    title: "Call of Duty BO7 Official Clipping Campaign",
    brandName: "Activision",
    brandLogo:
      "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=100&h=100",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200",
    category: CampaignCategory.ENTERTAINMENT,
    type: "Clipping",
    totalBudgetUSD: 37500,
    paidOutUSD: 26.14,
    totalBudgetUGX: 140000000,
    paidOutUGX: 100000,
    cpmUGX: 3700,
    cpmUSD: "$1.00",
    approvalRate: 4,
    avgReviewTime: "11h",
    views: "190K",
    creatorCount: 45,
    daysAgo: 0,
    isVerified: true,
    platforms: [Platform.TIKTOK, Platform.INSTAGRAM],
    description:
      "Create short-form clips using the official Call of Duty assets provided to promote Season 02.",
    requirementsText: "Refer to the Google Doc for the requirements!",
    platformPayouts: [
      {
        platform: Platform.TIKTOK,
        rate: "$1.00 / 1,000 views",
        minPayout: "$1.00",
        maxPayout: "$450.00",
      },
      {
        platform: Platform.INSTAGRAM,
        rate: "$1.00 / 1,000 views",
        minPayout: "$1.00",
        maxPayout: "$450.00",
      },
    ],
    faqs: [
      {
        question: "Is this legit?",
        answer: "Yes! This is backed by the official CoD team Activision.",
      },
      {
        question: "Where are the requirements?",
        answer:
          "The requirements are located in the Google Doc, it is on this page!",
      },
    ],
    topVideos: [
      {
        id: "v1",
        title: "Vid 1",
        views: "19,020",
        payout: "$19",
        thumbnail:
          "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80",
        creatorName: "Inavinate",
        creatorHandle: "@INAVINATE",
        creatorAvatar:
          "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=100",
      },
      {
        id: "v2",
        title: "#ad Call of Duty Season 02 update is live now...",
        views: "2,548",
        payout: "$3",
        thumbnail:
          "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80",
        creatorName: "Ghost",
        creatorHandle: "@ghost_gaming",
        creatorAvatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100",
      },
    ],
    lastUpdated: "07/02/2026",
    launchedOn: "Not yet launched",
  },
  {
    id: "airtel-5g",
    title: "Airtel 5G Revolution: Kampala Speed Test",
    brandName: "Airtel Uganda",
    brandLogo:
      "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=100&h=100",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1200",
    category: CampaignCategory.TECH,
    type: "UGC",
    totalBudgetUSD: 15000,
    paidOutUSD: 1200,
    totalBudgetUGX: 56000000,
    paidOutUGX: 4500000,
    cpmUGX: 8500,
    cpmUSD: "$2.30",
    approvalRate: 98,
    avgReviewTime: "3h",
    views: "840K",
    creatorCount: 120,
    daysAgo: 2,
    isVerified: true,
    platforms: [Platform.TIKTOK, Platform.YOUTUBE],
    description:
      "Document your Airtel 5G speed test experience in different parts of Kampala.",
    requirementsText:
      'Show the speed test result clearly and mention "The Unstoppable Network".',
    platformPayouts: [
      {
        platform: Platform.TIKTOK,
        rate: "$2.30 / 1,000 views",
        minPayout: "$10.00",
        maxPayout: "$2000.00",
      },
    ],
    faqs: [],
    topVideos: [],
    lastUpdated: "05/02/2026",
    launchedOn: "01/02/2026",
  },
  {
    id: "mumford-01",
    title: "Marcus Mumford — Clipping Campaign",
    brandName: "Mumford & Sons",
    brandLogo:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=100&h=100",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=1200",
    category: CampaignCategory.MUSIC,
    type: "Clipping",
    totalBudgetUSD: 10000,
    paidOutUSD: 120,
    totalBudgetUGX: 25000000,
    paidOutUGX: 4200000,
    cpmUGX: 12000,
    cpmUSD: "$3.00",
    approvalRate: 94,
    avgReviewTime: "4h",
    views: "1.2M",
    creatorCount: 85,
    daysAgo: 1,
    isVerified: true,
    platforms: [Platform.TIKTOK, Platform.INSTAGRAM],
    description:
      "Show Marcus Mumford as a brilliant storyteller and emotional live performer.",
    requirementsText:
      "Refer to our campaign guidelines for clipping performance clips.",
    platformPayouts: [
      {
        platform: Platform.TIKTOK,
        rate: "$3.00 / 1,000 views",
        minPayout: "$5.00",
        maxPayout: "$1000.00",
      },
    ],
    faqs: [],
    topVideos: [],
    lastUpdated: "01/02/2026",
    launchedOn: "01/01/2026",
  },
];

export const GreetUser = (): string => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "Good Morning, ";
  if (hour >= 12 && hour < 17) return "Good Afternoon, ";
  if (hour >= 17 && hour < 21) return "Good Evening, ";
  return "Nights, ";
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Utility to convert camelCase to snake_case
 */
export const CamelToSnakeCase = (str: string): string =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

/**
 * Maps object keys from camelCase to snake_case
 */
export const ObjectKeysToSnakeCase = <T extends Record<string, any>>(
  obj: T,
): Record<string, any> => {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      acc[CamelToSnakeCase(key)] = value;
      return acc;
    },
    {} as Record<string, any>,
  );
};
