import ai from "@/data/variants/ai.json";
import sde from "@/data/variants/sde.json";
import fullstack from "@/data/variants/fullstack.json";

export type Experience = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
  stack: string[];
};

export type Project = {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  categories: string[];
  links?: { label: string; href: string }[];
  metric?: string;
};

export type Education = {
  school: string;
  degree: string;
  start: string;
  end: string;
  detail?: string;
  courses?: string[];
};

export type Variant = {
  slug: "ai" | "sde" | "fullstack";
  name: string;
  roles: string[];
  tagline: string;
  summary: string;
  location: string;
  email: string;
  socials: { label: string; href: string }[];
  stats: { label: string; value: string }[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  projectCategories: string[];
};

const variants: Record<string, Variant> = {
  ai: ai as Variant,
  sde: sde as Variant,
  fullstack: fullstack as Variant,
};

export function getVariant(): Variant {
  const key = (process.env.PORTFOLIO_VARIANT || "ai").toLowerCase();
  return variants[key] ?? variants.ai;
}

export function getAllVariantSlugs(): string[] {
  return Object.keys(variants);
}
