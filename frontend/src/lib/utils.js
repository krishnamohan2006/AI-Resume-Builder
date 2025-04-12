import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(isoString) {
  const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
  };

  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', options);
}

