import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number) {
  return `৳${amount.toLocaleString('en-IN')}`;
}

export function getImageUrl(input: string): string {
  if (!input) return '';
  if (input.trim().startsWith('<img')) {
    const match = input.match(/src=["'](.*?)["']/);
    return match ? match[1] : '';
  }
  return input;
}
