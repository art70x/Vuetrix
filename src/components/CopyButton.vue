<script setup lang="ts">
import { IconCheck, IconCopy } from "@tabler/icons-vue";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/composables/use-copy";

const props = defineProps<{
  text: string;
  id?: string;
  class?: string;
  onCode?: boolean;
}>();

const { copied, copy } = useCopy();

const copyId = props.id || "copy";
</script>

<template>
  <Button
    type="button"
    variant="ghost"
    size="icon"
    :class="[
      'size-8 rounded-md transition-colors',
      onCode ? 'text-code-muted hover:bg-white/10 hover:text-code-foreground' : 'hover:bg-muted',
      props.class,
    ]"
    :aria-label="copied === copyId ? 'Copied' : 'Copy'"
    @click="copy(text, copyId)"
  >
    <IconCheck v-if="copied === copyId" class="size-4" />
    <IconCopy v-else class="size-4" />
  </Button>
</template>
