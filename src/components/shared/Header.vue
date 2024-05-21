<script setup lang="ts">
import { useProductStore } from "@/stores/productStore";
import SwitchTheme from "./SwitchTheme.vue";
import { Icon } from "@iconify/vue";
import Button from "../ui/button/Button.vue";
import { Transition, ref } from "vue";
import Cart from "../Cart.vue";
const state = useProductStore();
const show = ref(false);
const toggle = () => (show.value = !show.value);
</script>
<template>
  <header class="py-4">
    <nav class="container fl-ic justify-between">
      <div>
        <h1 class="text-2xl font-semibold">Logo</h1>
      </div>
      <div class="fl-ic gap-4">
        <SwitchTheme />
        <Button variant="outline" class="relative p-2 w-14" @click="toggle">
          <Transition name="cart">
            <Icon
              :key="state.cart.length"
              icon="bi:cart"
              class="w-[32px] absolute h-6"
            />
          </Transition>
          <Transition name="length">
            <span :key="state.cart.length" class="absolute top-1 right-1">{{
              state.cart.length
            }}</span>
          </Transition>
        </Button>
        <Cart :toggle="toggle" :show="show" />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.cart-enter-active,
.cart-leave-active {
  transition: opacity 0.2s;
  transition-delay: 0.3s;
  color: rgb(34 197 94);
}
.cart-enter-from,
.cart-leave-to {
  opacity: 0;
  color: rgb(34 197 94);
}
.cart-enter-to,
.cart-leave-from {
  opacity: 1;
  color: white;
}
@media (prefers-color-scheme: dark) {
  .cart-enter-to,
  .cart-leave-from {
    color: black;
  }
}
.length-enter-active,
.length-leave-active {
  transition: opacity 0.5s;
  position: absolute;
  filter: blur(10px);
}
.length-enter-from,
.length-leave-to {
  opacity: 0;
  filter: blur(10px);
}
.length-enter-to,
.length-leave-from {
  opacity: 1;
  filter: blur(0);
}
</style>
