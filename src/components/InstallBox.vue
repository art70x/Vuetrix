<script setup lang="ts">
import { computed, ref } from "vue";
import { IconCheck, IconCopy } from "@tabler/icons-vue";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { INSTALL_COMMANDS } from "@/lib/data";
import { useCopy } from "@/composables/use-copy";

type PackageManager = keyof typeof INSTALL_COMMANDS;

const pm = ref<PackageManager>("pnpm");
const { copied, copy } = useCopy();

const command = computed(() => INSTALL_COMMANDS[pm.value].install);

function copyCommand() {
  copy(command.value, "install");
}
</script>

<template>
  <div class="flex items-center gap-2 rounded-xl border bg-card p-2 text-left">
    <Select v-model="pm">
      <SelectTrigger
        class="h-9 w-auto min-w-24 border-0 bg-muted font-mono text-sm"
        aria-label="Package manager"
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem v-for="(_, key) in INSTALL_COMMANDS" :key="key" :value="key">
          {{ key }}
        </SelectItem>
      </SelectContent>
    </Select>

    <code class="min-w-0 flex-1 truncate px-2 font-mono text-sm">
      {{ command }}
    </code>

    <Button
      type="button"
      variant="ghost"
      size="icon"
      class="size-9 shrink-0"
      aria-label="Copy install command"
      :title="copied === 'install' ? 'Copied' : 'Copy command'"
      @click="copyCommand"
    >
      <IconCheck v-if="copied === 'install'" class="size-4 text-brand" />
      <IconCopy v-else class="size-4" />
    </Button>
  </div>
</template>
