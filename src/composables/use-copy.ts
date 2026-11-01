import { useClipboard, useTimeoutFn } from "@vueuse/core";
import { ref } from "vue";
import { toast } from "vue-sonner";

export function useCopy() {
  const copied = ref("");

  const { copy: copyToClipboard } = useClipboard();

  const { start: resetCopied } = useTimeoutFn(
    () => {
      copied.value = "";
    },
    1800,
    { immediate: false },
  );

  async function copy(text: string, id = "copy", message = "Copied to clipboard") {
    try {
      await copyToClipboard(text);

      copied.value = id;
      resetCopied();

      toast.success(message);
    } catch {
      toast.error("Could not access clipboard");
    }
  }

  return {
    copied,
    copy,
  };
}
