<script setup lang="ts">
import { computed, onUnmounted, reactive, ref } from "vue";
import { toast } from "vue-sonner";
import {
  IconSortAZ,
  IconSortZA,
  IconCheck,
  IconChevronUp,
  IconLoader2,
  IconRotateClockwise,
  IconZoomCancel,
  IconStar,
  IconTrash,
} from "@tabler/icons-vue";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { FEATURES, type ShowcaseItem } from "@/lib/data";

const props = defineProps<{ item: ShowcaseItem }>();

// Demo state
const saving = ref(false);
const starred = ref(false);
const align = ref<"left" | "center" | "right">("left");

const styleOptions = ["bold", "italic", "underline"] as const;
type TextStyle = (typeof styleOptions)[number];
const styles = ref<TextStyle[]>(["bold"]);

const form = reactive({
  name: "",
  description: "",
  template: "",
  private: false,
});

const errors = reactive<Record<string, string>>({});
const submitting = ref(false);

const input = reactive({
  name: "vuetrix-app",
  notes: "",
  region: "fra1",
  autosave: true,
  density: "comfortable",
  public: false,
});

const slider = ref([42]);
const dialogOpen = ref(false);
const deleteOpen = ref(false);
const displayName = ref("Ada Lovelace");
const width = ref("1280");
const sheetOpen = ref(false);

const prefs = reactive({
  sounds: false,
  telemetry: true,
  beta: false,
});

const preferenceOptions = [
  { key: "sounds", label: "Interface sounds" },
  { key: "telemetry", label: "Usage telemetry" },
  { key: "beta", label: "Beta features" },
] as const;

const loadState = ref<"done" | "loading" | "error">("done");
const failNext = ref(false);

type SortKey = "name" | "version" | "kind";

const sort = ref<{ key: SortKey; dir: number }>({
  key: "name",
  dir: 1,
});

const headers: { label: string; key: SortKey }[] = [
  { label: "Package", key: "name" },
  { label: "Version", key: "version" },
  { label: "Category", key: "kind" },
];

const page = ref(1);
const pageSize = 4;

const deps = [
  { name: "vue", version: "^3.5.41", kind: "Framework" },
  { name: "vue-router", version: "^4.6.3", kind: "Routing" },
  { name: "vite", version: "^7.2.4", kind: "Build" },
  { name: "typescript", version: "~5.9.3", kind: "Language" },
  { name: "tailwindcss", version: "^3.4.18", kind: "Styling" },
  { name: "reka-ui", version: "^2.6.0", kind: "Components" },
  { name: "vue-sonner", version: "^2.0.2", kind: "Feedback" },
  { name: "@vueuse/core", version: "^13.9.0", kind: "Utilities" },
];

const sorted = computed(() => {
  const { key, dir } = sort.value;

  return deps.toSorted((a, b) => {
    const comparison = a[key].localeCompare(b[key], undefined, {
      numeric: true,
    });

    return comparison * dir;
  });
});

const pages = computed(() => Math.max(1, Math.ceil(FEATURES.length / pageSize)));

const visible = computed(() => FEATURES.slice((page.value - 1) * pageSize, page.value * pageSize));

// Keep demo timers from running after unmount.
const timers = new Set<ReturnType<typeof setTimeout>>();

function schedule(callback: () => void, delay: number) {
  const timer = setTimeout(() => {
    timers.delete(timer);
    callback();
  }, delay);

  timers.add(timer);
}

onUnmounted(() => {
  timers.forEach((timer) => clearTimeout(timer));
  timers.clear();
});

// Demo actions
function save() {
  saving.value = true;

  schedule(() => {
    saving.value = false;
    toast.success("Changes saved");
  }, 1200);
}

function runPromise() {
  toast.promise(
    new Promise<void>((resolve) => {
      schedule(() => resolve(), 1800);
    }),
    {
      loading: "Building…",
      success: "Build finished",
      error: "Build failed",
    },
  );
}

function resetForm() {
  Object.assign(form, {
    name: "",
    description: "",
    template: "",
    private: false,
  });

  Object.keys(errors).forEach((key) => delete errors[key]);
}

function submit() {
  Object.keys(errors).forEach((key) => delete errors[key]);

  if (!/^[a-z0-9-]{3,30}$/.test(form.name)) {
    errors.name = "Use 3–30 lowercase letters, numbers or hyphens.";
  }

  if (form.description.length > 120) {
    errors.description = "Keep it under 120 characters.";
  }

  if (!form.template) {
    errors.template = "Pick a template.";
  }

  if (Object.keys(errors).length > 0) return;

  submitting.value = true;

  schedule(() => {
    submitting.value = false;

    toast.success("Project scaffolded", {
      description: `${form.name} would use ${form.template}.`,
    });

    resetForm();
  }, 900);
}

function load() {
  loadState.value = "loading";

  schedule(() => {
    loadState.value = failNext.value ? "error" : "done";
    failNext.value = false;
  }, 1500);
}

function toggleSort(key: SortKey) {
  sort.value = {
    key,
    dir: sort.value.key === key ? sort.value.dir * -1 : 1,
  };
}

function toggleStyle(style: TextStyle) {
  if (styles.value.includes(style)) {
    styles.value = styles.value.filter((item) => item !== style);
  } else {
    styles.value.push(style);
  }
}

function confirmDelete() {
  deleteOpen.value = false;
  toast.error("Project deleted");
}
</script>

<template>
  <Card :id="props.item.id" class="min-w-0 scroll-mt-24 overflow-hidden">
    <CardHeader class="border-b">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0 space-y-1">
          <CardTitle class="font-display text-lg">
            {{ props.item.name }}
          </CardTitle>

          <CardDescription>
            {{ props.item.blurb }}
          </CardDescription>
        </div>

        <Badge variant="secondary" class="shrink-0">
          {{ props.item.category }}
        </Badge>
      </div>
    </CardHeader>

    <CardContent class="p-6">
      <!-- Buttons -->
      <div v-if="props.item.id === 'buttons'" class="flex flex-col gap-5">
        <div class="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>

        <hr />

        <div class="flex flex-wrap gap-2">
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>

          <Button size="icon" aria-label="Star">
            <IconStar class="size-4" />
          </Button>

          <Button :disabled="saving" @click="save">
            <IconLoader2 v-if="saving" class="size-4 animate-spin" />
            {{ saving ? "Saving…" : "Click to save" }}
          </Button>
        </div>

        <div class="flex flex-wrap gap-2">
          <Badge>stable</Badge>
          <Badge variant="secondary">v0.0.0</Badge>
          <Badge variant="outline">MIT</Badge>
          <Badge variant="destructive">breaking</Badge>
        </div>
      </div>

      <!-- Toggle and button states -->
      <div v-else-if="props.item.id === 'toggle'" class="flex flex-col gap-5">
        <div class="flex flex-wrap items-center gap-3">
          <Button
            :variant="starred ? 'default' : 'outline'"
            @click="
              starred = !starred;
              toast(starred ? 'Starred Vuetrix' : 'Removed star');
            "
          >
            <IconStar class="size-4" :class="starred ? 'fill-current' : ''" />
            {{ starred ? "Starred" : "Star" }}
          </Button>

          <span class="text-sm text-muted-foreground">
            {{ starred ? "Starred in component state" : "Not starred yet" }}
          </span>
        </div>

        <div class="flex flex-wrap gap-2">
          <Button
            v-for="option in ['left', 'center', 'right'] as const"
            :key="option"
            size="sm"
            :variant="align === option ? 'default' : 'outline'"
            @click="align = option"
          >
            Align {{ option }}
          </Button>
        </div>

        <div class="flex flex-wrap gap-2">
          <Button
            v-for="style in styleOptions"
            :key="style"
            size="sm"
            :variant="styles.includes(style) ? 'default' : 'outline'"
            @click="toggleStyle(style)"
          >
            {{ style }}
          </Button>
        </div>

        <p class="font-mono text-xs text-muted-foreground">
          align: {{ align }} · styles: [{{ styles.join(", ") || "none" }}]
        </p>
      </div>

      <!-- Form -->
      <form
        v-else-if="props.item.id === 'form'"
        class="flex flex-col gap-5"
        novalidate
        @submit.prevent="submit"
      >
        <div>
          <Label for="form-name">Project name</Label>

          <Input
            id="form-name"
            v-model="form.name"
            placeholder="my-vue-app"
            class="mt-2"
            :aria-invalid="!!errors.name"
            :aria-describedby="errors.name ? 'form-name-error' : undefined"
          />

          <p class="mt-1 text-xs text-muted-foreground">Used as the folder name — kebab-case.</p>

          <p
            v-if="errors.name"
            id="form-name-error"
            class="mt-1 text-xs text-destructive"
            role="alert"
          >
            {{ errors.name }}
          </p>
        </div>

        <div>
          <Label for="form-desc">Description (optional)</Label>

          <Textarea
            id="form-desc"
            v-model="form.description"
            :rows="2"
            class="mt-2"
            :aria-invalid="!!errors.description"
          />

          <p v-if="errors.description" class="mt-1 text-xs text-destructive" role="alert">
            {{ errors.description }}
          </p>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <Label for="form-template">Template</Label>

            <Select v-model="form.template">
              <SelectTrigger id="form-template" class="mt-2" :aria-invalid="!!errors.template">
                <SelectValue placeholder="Choose one" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="dashboard">Dashboard</SelectItem>
                <SelectItem value="marketing">Marketing site</SelectItem>
              </SelectContent>
            </Select>

            <p v-if="errors.template" class="mt-1 text-xs text-destructive" role="alert">
              {{ errors.template }}
            </p>
          </div>

          <label class="flex items-center gap-3 rounded-lg border p-3.5">
            <Checkbox v-model:checked="form.private" />

            <span>
              <span class="block text-sm font-medium"> Private repository </span>
              <span class="text-xs text-muted-foreground"> Only you can see it. </span>
            </span>
          </label>
        </div>

        <div class="flex flex-wrap gap-3">
          <Button type="submit" :disabled="submitting">
            <IconLoader2 v-if="submitting" class="size-4 animate-spin" />
            {{ submitting ? "Scaffolding…" : "Scaffold project" }}
          </Button>

          <Button type="button" variant="ghost" @click="resetForm"> Reset </Button>
        </div>
      </form>

      <!-- Inputs -->
      <div v-else-if="props.item.id === 'inputs'" class="flex flex-col gap-5">
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <Label for="demo-name">Workspace name</Label>
            <Input id="demo-name" v-model="input.name" class="mt-2" />
          </div>

          <div>
            <Label for="region">Region</Label>

            <Select v-model="input.region">
              <SelectTrigger id="region" class="mt-2">
                <SelectValue placeholder="Choose a region" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="fra1">Frankfurt (fra1)</SelectItem>
                <SelectItem value="iad1">Virginia (iad1)</SelectItem>
                <SelectItem value="sin1">Singapore (sin1)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label for="notes">Notes</Label>
          <Textarea id="notes" v-model="input.notes" :rows="2" class="mt-2" />
        </div>

        <div class="flex flex-wrap gap-6">
          <label class="flex items-center gap-2 text-sm">
            <Checkbox v-model:checked="input.autosave" />
            Auto-save drafts
          </label>

          <label class="flex items-center gap-2 text-sm">
            <Switch v-model:checked="input.public" />
            Public profile
          </label>

          <RadioGroup
            v-model="input.density"
            aria-label="Interface density"
            class="flex flex-wrap gap-4"
          >
            <label
              v-for="density in ['compact', 'comfortable', 'spacious']"
              :key="density"
              class="flex items-center gap-2 text-sm capitalize"
            >
              <RadioGroupItem :value="density" />
              {{ density }}
            </label>
          </RadioGroup>
        </div>

        <p class="break-all rounded-lg bg-muted p-3 font-mono text-xs text-muted-foreground">
          { name: "{{ input.name }}", region: "{{ input.region }}", autosave: {{ input.autosave }},
          density: "{{ input.density }}" }
        </p>
      </div>

      <!-- Slider and progress -->
      <div v-else-if="props.item.id === 'slider'" class="flex flex-col gap-5">
        <div class="flex justify-between">
          <Label>Build cache used</Label>
          <span class="font-mono text-sm text-muted-foreground"> {{ slider[0] }}% </span>
        </div>

        <Slider v-model="slider" :max="100" :min="0" :step="1" aria-label="Build cache used" />

        <Progress :model-value="slider[0]" />

        <p class="text-sm text-muted-foreground">
          The slider and progress bar share one piece of state.
        </p>
      </div>

      <!-- Dialogs -->
      <div v-else-if="props.item.id === 'dialog'" class="flex flex-wrap gap-3">
        <Button variant="outline" @click="dialogOpen = true"> Edit profile </Button>

        <Button variant="destructive" @click="deleteOpen = true">
          <IconTrash class="size-4" />
          Delete project
        </Button>

        <p class="w-full text-sm text-muted-foreground">
          Destructive flows always confirm — the red action requires a deliberate second click.
        </p>
      </div>

      <!-- Popover and tooltip -->
      <div v-else-if="props.item.id === 'popover'" class="flex flex-wrap items-center gap-4">
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline">Canvas settings</Button>
          </PopoverTrigger>

          <PopoverContent class="w-64">
            <p class="text-sm font-medium">Dimensions</p>

            <Label for="pop-width" class="mt-3 block"> Max width (px) </Label>

            <Input id="pop-width" v-model="width" class="mt-2" inputmode="numeric" />

            <Button
              size="sm"
              class="mt-3"
              @click="
                toast.success('Canvas updated', {
                  description: `Max width: ${width}px`,
                })
              "
            >
              Apply
            </Button>
          </PopoverContent>
        </Popover>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="outline"> Keyboard tooltip </Button>
            </TooltipTrigger>

            <TooltipContent class="max-w-64">
              Hover or focus me — tooltips are keyboard-accessible.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <!-- Sheet -->
      <div v-else-if="props.item.id === 'sheet'">
        <Button variant="outline" @click="sheetOpen = true"> Open quick settings </Button>

        <p class="mt-3 text-sm text-muted-foreground">
          Current: sounds {{ prefs.sounds ? "on" : "off" }}, telemetry
          {{ prefs.telemetry ? "on" : "off" }}, beta {{ prefs.beta ? "on" : "off" }}.
        </p>
      </div>

      <!-- Toasts -->
      <div v-else-if="props.item.id === 'toasts'" class="flex flex-wrap gap-2">
        <Button
          variant="outline"
          @click="
            toast.success('Saved', {
              description: 'All changes are persisted.',
            })
          "
        >
          Success
        </Button>

        <Button
          variant="outline"
          @click="
            toast.error('Type check failed', {
              description: 'src/App.vue:24 — Property x does not exist.',
            })
          "
        >
          Error
        </Button>

        <Button variant="outline" @click="toast.info('New version available')"> Info </Button>

        <Button variant="outline" @click="runPromise"> Promise (async) </Button>
      </div>

      <!-- Skeleton and loading states -->
      <div v-else-if="props.item.id === 'skeleton'" class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" :disabled="loadState === 'loading'" @click="load">
            <IconLoader2 v-if="loadState === 'loading'" class="size-4 animate-spin" />
            <IconRotateClockwise v-else class="size-4" />
            {{ loadState === "loading" ? "Loading…" : "Reload data" }}
          </Button>

          <label class="flex items-center gap-2 text-sm">
            <Checkbox v-model:checked="failNext" />
            Fail next request
          </label>
        </div>

        <div v-if="loadState === 'loading'" class="flex items-center gap-4 rounded-lg border p-4">
          <Skeleton class="size-10 rounded-full" />

          <div class="flex flex-1 flex-col gap-2">
            <Skeleton class="h-4 w-1/3" />
            <Skeleton class="h-3 w-2/3" />
          </div>
        </div>

        <Alert v-else-if="loadState === 'error'" variant="destructive">
          <IconZoomCancel class="size-4" />

          <AlertTitle>Couldn’t load the release</AlertTitle>

          <AlertDescription>
            <p>The request timed out.</p>

            <Button size="sm" variant="outline" class="mt-2" @click="load"> Retry </Button>
          </AlertDescription>
        </Alert>

        <div v-else class="flex items-center gap-4 rounded-lg border p-4">
          <Avatar class="bg-brand/15 font-mono text-xs">
            <AvatarFallback>VT</AvatarFallback>
          </Avatar>

          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium">vuetrix@1.0.0 — latest</p>
            <p class="text-xs text-muted-foreground">Loaded just now · 12 features · MIT</p>
          </div>

          <Badge variant="secondary">cached</Badge>
        </div>
      </div>

      <!-- Alerts -->
      <div v-else-if="props.item.id === 'alerts'" class="flex flex-col gap-4">
        <Alert>
          <IconCheck class="size-4" />

          <AlertTitle>Type check passed</AlertTitle>

          <AlertDescription> vue-tsc found no errors across the project. </AlertDescription>
        </Alert>

        <Alert variant="destructive">
          <IconZoomCancel class="size-4" />

          <AlertTitle>Deprecated dependency</AlertTitle>

          <AlertDescription> Run pnpm up to resolve the outdated package. </AlertDescription>
        </Alert>

        <div class="rounded-lg border py-8 text-center">
          <IconZoomCancel class="mx-auto size-6 text-muted-foreground" />

          <h3 class="mt-3 font-medium">No matching components</h3>

          <p class="mt-1 text-sm text-muted-foreground">
            Try a different search term or clear the filters.
          </p>

          <Button variant="outline" size="sm" class="mt-4" @click="toast.info('Filters cleared')">
            Clear filters
          </Button>
        </div>
      </div>

      <!-- Table -->
      <div v-else-if="props.item.id === 'table'">
        <div class="overflow-x-auto rounded-lg border">
          <table class="w-full min-w-112.5 text-sm">
            <thead>
              <tr class="border-b">
                <th
                  v-for="header in headers"
                  :key="header.key"
                  class="h-11 px-4 text-left"
                  :aria-sort="
                    sort.key === header.key ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'
                  "
                >
                  <button
                    type="button"
                    class="inline-flex items-center gap-1.5 font-medium"
                    @click="toggleSort(header.key)"
                  >
                    {{ header.label }}

                    <IconSortAZ v-if="sort.key === header.key && sort.dir === 1" class="size-3.5" />

                    <IconSortZA v-else-if="sort.key === header.key" class="size-3.5" />

                    <IconChevronUp v-else class="size-3.5 opacity-30" />
                  </button>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="dependency in sorted"
                :key="dependency.name"
                class="border-b last:border-0"
              >
                <td class="p-3 font-mono text-xs">
                  {{ dependency.name }}
                </td>

                <td class="p-3 font-mono text-xs text-muted-foreground">
                  {{ dependency.version }}
                </td>

                <td class="p-3">
                  <Badge variant="secondary">
                    {{ dependency.kind }}
                  </Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="mt-3 text-xs text-muted-foreground">Click a column header to sort.</p>
      </div>

      <!-- Tabs and accordion -->
      <div v-else-if="props.item.id === 'tabs'" class="flex flex-col gap-5">
        <Tabs default-value="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent
            value="account"
            class="mt-3 rounded-lg border p-4 text-sm text-muted-foreground"
          >
            Profile, display name and public URL. Arrow keys move between tabs.
          </TabsContent>

          <TabsContent
            value="security"
            class="mt-3 rounded-lg border p-4 text-sm text-muted-foreground"
          >
            Sessions, tokens and two-factor settings.
          </TabsContent>

          <TabsContent
            value="billing"
            class="mt-3 rounded-lg border p-4 text-sm text-muted-foreground"
          >
            Vuetrix is free and MIT-licensed.
          </TabsContent>
        </Tabs>

        <Accordion type="single" collapsible>
          <AccordionItem value="a1">
            <AccordionTrigger> Does it work with my existing ESLint config? </AccordionTrigger>

            <AccordionContent class="text-sm text-muted-foreground">
              Yes — the flat config composes with your own rules.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="a2">
            <AccordionTrigger> Can I eject from a decision? </AccordionTrigger>

            <AccordionContent class="text-sm text-muted-foreground">
              Every choice is plain configuration in the repo.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <!-- Pagination -->
      <div v-else-if="props.item.id === 'pagination'" class="flex flex-col gap-4">
        <ul class="divide-y rounded-lg border">
          <li
            v-for="feature in visible"
            :key="feature.title"
            class="flex items-center justify-between gap-3 px-4 py-2.5 text-sm"
          >
            <span>{{ feature.title }}</span>
            <Badge variant="outline">{{ feature.group }}</Badge>
          </li>
        </ul>

        <nav class="flex flex-wrap items-center justify-center gap-1" aria-label="Pagination">
          <Button size="sm" variant="outline" :disabled="page === 1" @click="page--">
            Previous
          </Button>

          <Button
            v-for="pageNumber in pages"
            :key="pageNumber"
            size="sm"
            :variant="pageNumber === page ? 'default' : 'ghost'"
            :aria-current="pageNumber === page ? 'page' : undefined"
            @click="page = pageNumber"
          >
            {{ pageNumber }}
          </Button>

          <Button size="sm" variant="outline" :disabled="page === pages" @click="page++">
            Next
          </Button>
        </nav>
      </div>
    </CardContent>
  </Card>

  <!-- Edit profile dialog -->
  <Dialog :open="dialogOpen" @update:open="dialogOpen = $event">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Focus is trapped inside the dialog; Escape closes it.
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-2">
        <Label for="dialog-name">Display name</Label>
        <Input id="dialog-name" v-model="displayName" />
      </div>

      <DialogFooter>
        <Button variant="ghost" @click="dialogOpen = false"> Cancel </Button>

        <Button
          @click="
            dialogOpen = false;
            toast.success('Profile updated', {
              description: displayName,
            });
          "
        >
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <!-- Destructive confirmation -->
  <AlertDialog :open="deleteOpen" @update:open="deleteOpen = $event">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle> Delete my-vue-app? </AlertDialogTitle>

        <AlertDialogDescription>
          This removes the project and its deployments. This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel> Cancel </AlertDialogCancel>

        <AlertDialogAction
          class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          @click="confirmDelete"
        >
          Delete permanently
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  <!-- Quick settings sheet -->
  <Sheet :open="sheetOpen" @update:open="sheetOpen = $event">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Quick settings</SheetTitle>
        <SheetDescription> The same sheet component powers mobile navigation. </SheetDescription>
      </SheetHeader>

      <div class="mt-6 flex flex-col gap-5">
        <div
          v-for="setting in preferenceOptions"
          :key="setting.key"
          class="flex items-center justify-between gap-4"
        >
          <Label :for="`pref-${setting.key}`" class="text-sm">
            {{ setting.label }}
          </Label>

          <Switch :id="`pref-${setting.key}`" v-model:checked="prefs[setting.key]" />
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>
