import type React from "react";
import type { Dispatch, SetStateAction } from "react";

import type { BrandsRecord, CampaignsRecord } from "./pocketbase-types";
import z from "zod";
import type { RecordModel } from "pocketbase";
export type AuthStep = "ROLE_SELECTION" | "AUTH_ENTRY" | "OTP_VERIFY";

export interface AlertType {
  message: string;
  type?: "success" | "error" | "info";
}

export const CampaignSchema = z
  .object({
    title: z.string().min(5, "Title is too short"),
    country: z.number().positive("Please select a country"),
    description: z
      .string()
      .min(200, "Description must be at least 200 characters")
      .max(5000, "Description must not exceed 5000 characters"),
    launch_date: z.string().refine((date) => new Date(date) > new Date(), {
      message: "Launch date must be in the future",
    }),
    end_date: z.string().refine((date) => new Date(date) > new Date(), {
      message: "End date must be in the future",
    }),
    // hashtags: z.string().startsWith("#", "Hashtags should start with #"),
    budget: z.coerce.number().positive("Budget must be greater than 0"),
    cpm: z.coerce.number().positive("CPM must be greater than 0"),
    product_type: z.enum(["none", "physical", "digital"]),
    age_ranges: z
      .array(z.string())
      .min(1, "Select at least one age range")
      .nullable(),
    gender: z.enum(["F", "M", "B"], {
      errorMap: () => ({ message: "Please select a valid gender option" }),
    }),
    visibility: z.enum(["open", "private"], {
      errorMap: () => ({ message: "Please select a visibility setting" }),
    }),

    category: z.string().min(4).optional(),
    requirements: z
      .string()
      .min(10, "Please outline the requirements for creators")
      .optional(),
    status: z
      .enum(["draft", "active", "completed", "archived"])
      .default("draft"),
    min_followers: z.coerce
      .number()
      .nonnegative("Followers cannot be negative")
      .optional(),

    platform_payouts: z.unknown().nullable().optional(),
  })
  .refine(
    (data) =>
      data.end_date.length > 0 &&
      new Date(data.end_date) > new Date(data.launch_date),
    {
      message: "End date must be after the launch date",
      path: ["end_date"], // Highlights the end_date field in forms
    },
  );

export type CampaignFormData = z.infer<typeof CampaignSchema>;

export type CampaignFormErrors = Partial<
  Record<keyof CampaignFormData, string>
>;

export interface CreateCampaignCtx {
  formData: CampaignsRecord;
  currentStep: number;
  setFormData: React.Dispatch<SetStateAction<CampaignsRecord>>;
  stepError: string;
  setStepError: React.Dispatch<SetStateAction<string>>;
  campaignFormErrors: CampaignFormErrors;
  setCampaignFormErrors: React.Dispatch<SetStateAction<CampaignFormErrors>>;
  handleGeneralInputChange: (e?: any) => void;
  handleGeneralInputBlur: (e?: any) => void;
  handleMoneyInputChange: (e?: any) => void;
  handleMoneyInputBlur: (e?: any) => void;
}

export interface KPI {
  label: string;
  value: string;
  change: number;
  isPositive: boolean;
}

export interface CustomLink {
  path: string;
  label: string;
  icon: React.ReactNode;
}

export interface CampaignDetailsType extends RecordModel, CampaignsRecord {
  expand?: {
    brand?: BrandsRecord;
  };
}
// export interface Campaign extends CampaignsRecord {
//   expand?: {
//     brand?: { name: string; logo: string; is_verified?: boolean };
//     "submissions(campaign)"?: { id: string; payout: number }[];
//   };
// }

export interface CreatorDashboardContextType {
  ctxType?: string;
  activeView: string;
  setActiveView: Dispatch<SetStateAction<string>>;
}

export interface HomeContextType {
  ctxType?: string;
  activeView: string;
  setActiveView: Dispatch<SetStateAction<string>>;
  campaigns: CampaignDetailsType[];
  activeCategory: string;
  setActiveCategory: Dispatch<SetStateAction<string>>;
  campaignInDetails: CampaignDetailsType;
  setCampaignInDetails: Dispatch<SetStateAction<CampaignDetailsType>>;
}

export interface BrandDashboardContextType {
  ctxType?: string;
  activeView: string;
  setActiveView: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  campaigns: CampaignsRecord[] | null;
  setCampaigns: Dispatch<SetStateAction<CampaignsRecord[] | null>>;
  campaignInDetails: CampaignDetailsType;
  setCampaignInDetails: Dispatch<SetStateAction<CampaignDetailsType>>;
  isBrandFirstTime: boolean;
  viewNavTree: string[];
  setViewNavTree: React.Dispatch<SetStateAction<string[]>>;
}

export enum Platform {
  TIKTOK = "TikTok",
  INSTAGRAM = "Instagram",
  YOUTUBE = "YouTube",
  TWITTER = "Twitter",
}

export enum CampaignCategory {
  ENTERTAINMENT = "Entertainment",
  MUSIC = "Music",
  LIFESTYLE = "Lifestyle",
  TECH = "Tech",
  FOOD = "Food",
}

export enum UserRole {
  CREATOR = "creator",
  BRAND = "brand",
}
