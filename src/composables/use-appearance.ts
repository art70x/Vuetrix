import { computed, ref, watch } from "vue";

export type Theme = "light" | "dark" | "system";
export type Accent = "emerald" | "sky" | "violet" | "amber" | "rose" | "slate";

export const ACCENTS = [
  { id: "emerald", label: "Emerald", swatch: "#42b883" },
  { id: "sky", label: "Sky", swatch: "#38bdf8" },
  { id: "violet", label: "Violet", swatch: "#a78bfa" },
  { id: "amber", label: "Amber", swatch: "#fbbf24" },
  { id: "rose", label: "Rose", swatch: "#fb7185" },
  { id: "slate", label: "Slate", swatch: "#94a3b8" },
] as const;

export const RADIUS_OPTIONS = [
  { label: "0", value: 0 },
  { label: "sm", value: 0.375 },
  { label: "md", value: 0.625 },
  { label: "lg", value: 1 },
] as const;

const STORAGE_KEYS = {
  theme: "vuetrix-theme",
  accent: "vuetrix-accent",
  radius: "vuetrix-radius",
} as const;

const isBrowser = globalThis.window !== undefined;

// Storage helpers
function readStorage(key: string): string | undefined {
  if (!isBrowser) return undefined;

  try {
    return globalThis.localStorage.getItem(key) ?? undefined;
  } catch {
    return undefined;
  }
}

function saveStorage(key: string, value: string) {
  if (!isBrowser) return;

  try {
    globalThis.localStorage.setItem(key, value);
  } catch {
    // Storage may be unavailable or disabled.
  }
}

// Type guards
function isTheme(value: string | undefined): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

function isAccent(value: string | undefined): value is Accent {
  return ACCENTS.some((item) => item.id === value);
}

function isRadius(value: number): boolean {
  return RADIUS_OPTIONS.some((item) => item.value === value);
}

// Initial values
const savedTheme = readStorage(STORAGE_KEYS.theme);
const savedAccent = readStorage(STORAGE_KEYS.accent);
const savedRadius = Number(readStorage(STORAGE_KEYS.radius));

export const theme = ref<Theme>(isTheme(savedTheme) ? savedTheme : "dark");

export const accent = ref<Accent>(isAccent(savedAccent) ? savedAccent : "emerald");

export const radius = ref(isRadius(savedRadius) ? savedRadius : 0.625);

// System theme detection
const mediaQuery = isBrowser
  ? globalThis.window.matchMedia("(prefers-color-scheme: dark)")
  : undefined;

const systemDark = ref(mediaQuery?.matches ?? false);

mediaQuery?.addEventListener("change", (event) => {
  systemDark.value = event.matches;
});

// Resolve the active theme
export const resolvedTheme = computed<"light" | "dark">(() => {
  if (theme.value === "system") {
    return systemDark.value ? "dark" : "light";
  }

  return theme.value;
});

// Apply theme to document
watch(
  resolvedTheme,
  (value) => {
    if (!isBrowser) return;

    globalThis.document.documentElement.classList.toggle("dark", value === "dark");
  },
  { immediate: true },
);

// Persist theme preference
watch(theme, (value) => {
  saveStorage(STORAGE_KEYS.theme, value);
});

// Apply and persist accent
watch(
  accent,
  (value) => {
    if (isBrowser) {
      globalThis.document.documentElement.dataset.accent = value;
    }

    saveStorage(STORAGE_KEYS.accent, value);
  },
  { immediate: true },
);

// Apply and persist border radius
watch(
  radius,
  (value) => {
    if (isBrowser) {
      globalThis.document.documentElement.style.setProperty("--radius", `${value}rem`);
    }

    saveStorage(STORAGE_KEYS.radius, String(value));
  },
  { immediate: true },
);

// Reset appearance preferences
export function resetAppearance() {
  accent.value = "emerald";
  radius.value = 0.625;
}
