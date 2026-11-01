<script setup lang="ts">
import { computed, ref } from "vue";
import {
  IconCheck,
  IconInfoCircle,
  IconDeviceDesktop,
  IconMoon,
  IconRotate,
  IconSun,
} from "@tabler/icons-vue";
import { toast } from "vue-sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";

import PageHeader from "@/components/PageHeader.vue";

import { useSeo } from "@/composables/use-seo";
import { useCopy } from "@/composables/use-copy";

import {
  ACCENTS,
  RADIUS_OPTIONS,
  accent,
  radius,
  resetAppearance,
  theme,
} from "@/composables/use-appearance";

// SEO
useSeo({
  title: "Theme Playground",
  description: "Edit Vuetrix design tokens live.",
  path: "/playground",
});

// Utilities
const { copy } = useCopy();

// State
const notifications = ref(true);
const resetOpen = ref(false);

// Theme modes
const modes = [
  { id: "light", label: "Light", icon: IconSun },
  { id: "dark", label: "Dark", icon: IconMoon },
  { id: "system", label: "System", icon: IconDeviceDesktop },
] as const;

// Theme types
type CSSVariables = Record<string, string>;

interface ThemeTokens {
  light: CSSVariables;
  dark: CSSVariables;
}

// Accent tokens
const tokenMap: Record<string, ThemeTokens> = {
  emerald: {
    light: {
      "--primary": "161 94% 24%",
      "--primary-foreground": "0 0% 100%",
      "--ring": "161 94% 30%",
      "--brand": "153 47% 42%",
      "--accent": "152 45% 93%",
      "--accent-foreground": "161 94% 20%",
    },
    dark: {
      "--primary": "153 52% 48%",
      "--primary-foreground": "160 60% 7%",
      "--ring": "153 52% 48%",
      "--brand": "153 52% 52%",
      "--accent": "158 32% 14%",
      "--accent-foreground": "153 52% 62%",
    },
  },
};

// CSS variable formatter
function formatVariables(variables: CSSVariables): string {
  return Object.entries(variables)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");
}

// Export CSS
const output = computed(() => {
  const preset = tokenMap[accent.value];

  const header =
    `/* Vuetrix Theme */\n` +
    `/* Accent: ${accent.value} */\n` +
    `/* Radius: ${radius.value}rem */\n\n`;

  if (!preset) {
    return (
      header +
      `:root {\n` +
      `  --radius: ${radius.value}rem;\n` +
      `}\n\n` +
      `/* Accent preset: data-accent="${accent.value}" */\n` +
      `/* Use the corresponding preset from src/index.css. */`
    );
  }

  return (
    header +
    `:root {\n` +
    `  --radius: ${radius.value}rem;\n` +
    `${formatVariables(preset.light)}\n` +
    `}\n\n` +
    `.dark {\n` +
    `${formatVariables(preset.dark)}\n` +
    `}`
  );
});

// Actions
function exportTokens() {
  copy(output.value, "tokens", "Theme tokens copied successfully!");
}

function selectTheme(mode: (typeof modes)[number]["id"]) {
  theme.value = mode;
}

function selectAccent(id: Accent) {
  accent.value = id;
}

function selectRadius(value: number) {
  radius.value = value;
}

function confirmReset() {
  resetAppearance();
  resetOpen.value = false;
  toast.success("Appearance reset successfully.");
}
</script>

<template>
  <PageHeader
    eyebrow="Playground"
    title="Restyle the whole site from one panel"
    description="Customize your design tokens in real time. Change colors, themes, and corner radius, then export your CSS."
  />

  <div
    class="container-app grid min-w-0 items-start gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
  >
    <!-- SETTINGS -->
    <Card>
      <CardHeader>
        <CardTitle>Design Tokens</CardTitle>
        <CardDescription>
          Changes are applied instantly and persisted in this browser.
        </CardDescription>
      </CardHeader>

      <CardContent class="flex flex-col gap-7">
        <!-- COLOR MODE -->
        <div class="space-y-3">
          <Label>Color Mode</Label>

          <div class="grid grid-cols-3 gap-2">
            <Button
              v-for="mode in modes"
              :key="mode.id"
              size="sm"
              :variant="theme === mode.id ? 'default' : 'outline'"
              :aria-pressed="theme === mode.id"
              @click="selectTheme(mode.id)"
            >
              <component :is="mode.icon" class="size-4" />
              {{ mode.label }}
            </Button>
          </div>
        </div>

        <!-- ACCENT COLOR -->
        <div class="space-y-3">
          <Label>Accent Color</Label>

          <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <button
              v-for="item in ACCENTS"
              :key="item.id"
              type="button"
              class="flex min-h-10 items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors hover:border-foreground/30"
              :class="accent === item.id ? 'border-primary bg-accent font-medium' : 'border-border'"
              :aria-pressed="accent === item.id"
              @click="selectAccent(item.id)"
            >
              <span
                class="flex size-4 shrink-0 items-center justify-center rounded-full"
                :style="{ backgroundColor: item.swatch }"
              >
                <IconCheck v-if="accent === item.id" class="size-3 text-white" />
              </span>

              {{ item.label }}
            </button>
          </div>
        </div>

        <!-- CORNER RADIUS -->
        <div class="space-y-3">
          <Label>Corner Radius</Label>

          <div class="flex flex-wrap gap-2">
            <Button
              v-for="item in RADIUS_OPTIONS"
              :key="item.value"
              size="sm"
              :variant="radius === item.value ? 'default' : 'outline'"
              class="font-mono"
              @click="selectRadius(item.value)"
            >
              {{ item.label }}
            </Button>
          </div>

          <p class="font-mono text-xs text-muted-foreground">--radius: {{ radius }}rem</p>
        </div>

        <!-- ACTIONS -->
        <div class="flex flex-wrap gap-3 border-t pt-5">
          <Button @click="exportTokens"> Copy CSS Variables </Button>

          <Button variant="ghost" @click="resetOpen = true">
            <IconRotate class="size-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- PREVIEW -->
    <div class="flex min-w-0 flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
          <CardDescription>
            Preview your components with the selected design tokens.
          </CardDescription>
        </CardHeader>

        <CardContent class="flex flex-col gap-6">
          <!-- BUTTONS -->
          <div class="flex flex-wrap items-center gap-2">
            <Button>Get Started</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>

            <Badge>Beta</Badge>
            <Badge variant="outline">v0.0.0</Badge>
          </div>

          <!-- INPUT AND SWITCH -->
          <div class="grid items-end gap-4 sm:grid-cols-2">
            <div class="space-y-2">
              <Label for="pg-input"> Project Name </Label>

              <Input id="pg-input" model-value="vuetrix-app" />
            </div>

            <div class="flex items-center justify-between gap-4">
              <div class="space-y-1">
                <Label for="notifications"> Deploy Notifications </Label>

                <p class="text-xs text-muted-foreground">Email on every build</p>
              </div>

              <Switch
                id="notifications"
                v-model:checked="notifications"
                aria-label="Deploy notifications"
              />
            </div>
          </div>

          <!-- PROGRESS -->
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span>Build Progress</span>

              <span class="font-mono text-muted-foreground"> 64% </span>
            </div>

            <Progress :model-value="64" />
          </div>

          <!-- ALERT -->
          <Alert>
            <IconInfoCircle class="size-4" />

            <AlertTitle> Tokens in Action </AlertTitle>

            <AlertDescription>
              Buttons, links, focus rings, and other components use the same design variables.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <!-- CSS EXPORT -->
      <Card>
        <CardHeader>
          <CardTitle>Export</CardTitle>
          <CardDescription>
            Your current theme configuration as CSS. Paste it into src/index.css.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <pre
            class="max-h-64 overflow-auto rounded-lg border bg-muted p-4 font-mono text-xs leading-relaxed"
          ><code>{{ output }}</code></pre>

          <div class="mt-4 flex flex-wrap items-center gap-3">
            <Button variant="outline" @click="exportTokens"> Copy to Clipboard </Button>

            <p class="text-xs text-muted-foreground">Preferences persist only in this browser.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>

  <!-- RESET CONFIRMATION -->
  <Dialog v-model:open="resetOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle> Reset Appearance? </DialogTitle>

        <DialogDescription>
          Accent color returns to emerald and corner radius returns to its default. Your color mode
          stays unchanged.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button variant="outline" @click="resetOpen = false"> Cancel </Button>

        <Button @click="confirmReset">
          <IconRotate class="size-4" />
          Reset
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
