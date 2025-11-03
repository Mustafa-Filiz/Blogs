import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(str: string) {
  if (!str) return '' // handle empty str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function takeInitials(str: string) {
  return str.split(' ').map(s => s.charAt(0).toUpperCase()).join('')
}