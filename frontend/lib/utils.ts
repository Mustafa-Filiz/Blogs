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
  return str
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase())
    .join('')
}

export function formatDate(dateString: string, withHour: boolean = false) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...(withHour && { hour: '2-digit', minute: '2-digit' }),

  })
}
