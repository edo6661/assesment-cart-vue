<script setup lang="ts">
import { cn } from "@/lib/utils";
import { HTMLAttributes, Transition } from "vue";
interface Props {
  class?: HTMLAttributes["class"];
}
const props = defineProps<Props>();
</script>
<template>
  <Transition name="fade" mode="in-out" :class="cn(props.class)">
    <slot />
  </Transition>
</template>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
