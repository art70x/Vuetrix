<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

withDefaults(
  defineProps<{
    delay?: number;
    as?: string;
    class?: string;
  }>(),
  {
    as: "div",
    delay: 0,
  },
);

const el = ref<HTMLElement>();

let observer: IntersectionObserver | undefined;

onMounted(() => {
  const node = el.value;
  if (!node) return;

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        node.classList.add("is-visible");
        observer?.disconnect();
        observer = undefined;
      }
    },
    { threshold: 0.08 },
  );

  observer.observe(node);
});

onUnmounted(() => {
  observer?.disconnect();
  observer = undefined;
});
</script>

<template>
  <component
    :is="as"
    ref="el"
    class="reveal"
    :class="$props.class"
    :style="{ animationDelay: `${delay}ms` }"
  >
    <slot />
  </component>
</template>
