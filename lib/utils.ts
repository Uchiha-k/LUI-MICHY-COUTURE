import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: 'KES' | 'USD' = 'KES') {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: currency === 'KES' ? 0 : 2,
  }).format(amount)
}

export function sanitizeString(str: string) {
  return str.replace(/[<>]/g, '').trim()
}

