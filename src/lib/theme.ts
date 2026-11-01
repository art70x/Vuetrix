export const isDark = useDark({ disableTransition: false, storageKey: "vuetrix-theme" });
export const toggleDark = useToggle(isDark);
export const preferredDark = usePreferredDark();
