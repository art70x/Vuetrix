<script setup lang="ts">
import { IconTerminal } from "@tabler/icons-vue";
import CopyButton from "./CopyButton.vue";

const props = withDefaults(
  defineProps<{
    code: string;
    filename?: string;
    lang?: string;
    terminal?: boolean;
  }>(),
  {
    terminal: false,
  },
);

const label = props.filename || props.lang || "Code";
const copyId = props.filename || props.code.slice(0, 20);
</script>

<template>
  <div class="min-w-0 overflow-hidden rounded-xl border border-code bg-code text-code-foreground">
    <div class="flex h-11 items-center gap-2 border-b border-code px-4">
      <IconTerminal v-if="terminal" class="size-4 shrink-0 text-code-muted" aria-hidden="true" />

      <span v-else class="size-2 shrink-0 rounded-full bg-brand/70" aria-hidden="true" />

      <span class="flex-1 truncate font-mono text-xs text-code-muted">
        {{ label }}
      </span>

      <CopyButton :text="code" :id="copyId" on-code />
    </div>

    <pre class="overflow-x-auto p-4 font-mono text-[13px] leading-6"><code>{{ code }}</code></pre>
  </div>
</template>
