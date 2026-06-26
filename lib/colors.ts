import type { ColorName } from "@/types";

export const COLOR_MAP: Record<ColorName, { bg: string; text: string; border: string; light: string }> = {
  amber:   { bg: "bg-amber-500",   text: "text-white", border: "border-amber-400",   light: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
  blue:    { bg: "bg-blue-500",    text: "text-white", border: "border-blue-400",    light: "bg-blue-500/10 text-blue-400 border-blue-500/30" },
  violet:  { bg: "bg-violet-500",  text: "text-white", border: "border-violet-400",  light: "bg-violet-500/10 text-violet-400 border-violet-500/30" },
  emerald: { bg: "bg-emerald-500", text: "text-white", border: "border-emerald-400", light: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
  teal:    { bg: "bg-teal-500",    text: "text-white", border: "border-teal-400",    light: "bg-teal-500/10 text-teal-400 border-teal-500/30" },
  red:     { bg: "bg-red-500",     text: "text-white", border: "border-red-400",     light: "bg-red-500/10 text-red-400 border-red-500/30" },
  pink:    { bg: "bg-pink-500",    text: "text-white", border: "border-pink-400",    light: "bg-pink-500/10 text-pink-400 border-pink-500/30" },
  orange:  { bg: "bg-orange-500",  text: "text-white", border: "border-orange-400",  light: "bg-orange-500/10 text-orange-400 border-orange-500/30" },
  indigo:  { bg: "bg-indigo-500",  text: "text-white", border: "border-indigo-400",  light: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30" },
};

export function chipClasses(color: ColorName): string {
  const c = COLOR_MAP[color];
  return `${c.bg} ${c.text} ${c.border}`;
}

export function chipLightClasses(color: ColorName): string {
  return COLOR_MAP[color].light;
}
