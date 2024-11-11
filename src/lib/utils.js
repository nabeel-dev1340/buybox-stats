import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Dynamic color generation
export const generateUniqueColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = (i * 137.5) % 360; // Golden angle for better color distribution
    colors.push(`hsl(${hue}, 70%, 60%)`);
  }
  return colors;
};

export const getDaysDifference = (date) => {
  const now = new Date();
  const parsedDate = new Date(date);
  const diffTime = Math.abs(now - parsedDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
};
