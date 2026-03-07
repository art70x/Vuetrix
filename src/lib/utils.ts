import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isDark = useDark({ disableTransition: false, storageKey: 'v-theme' })
export const toggleDark = useToggle(isDark)
export const preferredDark = usePreferredDark()
