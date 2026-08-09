export const isDark = useDark({ disableTransition: false, storageKey: 'v-theme' })
export const toggleDark = useToggle(isDark)
export const preferredDark = usePreferredDark()
