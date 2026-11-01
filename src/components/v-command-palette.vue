<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { IconSearch } from "@tabler/icons-vue";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { commandOpen } from "@/composables/use-command";
import { MAIN_NAV } from "@/lib/site";
import { DOCS_SECTIONS } from "@/lib/data";

const router = useRouter();

const pageItems = MAIN_NAV.map((item) => ({
  label: item.label,
  to: item.to,
}));

const documentationItems = DOCS_SECTIONS.map((section) => ({
  label: section.label,
  to: `/docs#${section.id}`,
}));

function go(to: string) {
  commandOpen.value = false;
  void router.push(to);
}

function handleKeydown(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k" && !event.repeat) {
    event.preventDefault();
    commandOpen.value = !commandOpen.value;
  }
}

onMounted(() => {
  globalThis.window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  globalThis.window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <CommandDialog :open="commandOpen" @update:open="commandOpen = $event">
    <CommandInput placeholder="Search pages and documentation..." />

    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>

      <CommandGroup heading="Pages">
        <CommandItem
          v-for="item in pageItems"
          :key="item.to"
          :value="item.label"
          @select="go(item.to)"
        >
          <IconSearch class="mr-2 size-4 text-muted-foreground" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </CommandItem>
      </CommandGroup>

      <CommandSeparator />

      <CommandGroup heading="Documentation">
        <CommandItem
          v-for="item in documentationItems"
          :key="item.to"
          :value="item.label"
          @select="go(item.to)"
        >
          <IconSearch class="mr-2 size-4 text-muted-foreground" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>
