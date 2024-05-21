<script setup lang="ts">
import { Teleport, Transition } from "vue";
import { Icon } from "@iconify/vue";
import { useProductStore } from "@/stores/productStore";
import Button from "./ui/button/Button.vue";

defineProps<{
  show: boolean;
  toggle: () => void;
}>();

const store = useProductStore();
const { quantityControl, removeFromCart } = store;
</script>
<template>
  <Teleport to="body">
    <Transition name="show" appear>
      <div
        v-if="show"
        class="fixed min-h-screen sm:w-96 w-80 right-0 top-0 shadow-muted-foreground shadow-2xl p-4 z-50 bg-primary-black/50 border-2 border-white/10 border-solid text-white overflow-y-auto"
      >
        <div class="fl-ic justify-between">
          <h3 class="text-xl text-white">Your Cart</h3>
          <button @click="toggle">
            <Icon
              icon="zondicons:close-outline"
              class="w-8 h-8 text-primary-white"
            />
          </button>
        </div>
        <hr
          class="my-4 h-1 bg-primary-white shadow-2xl shadow-muted-foreground"
        />
        <div>
          <div v-if="store.cart.length === 0">
            <p class="text-center">Your cart is empty</p>
          </div>
          <div v-else class="space-y-4">
            <div
              v-for="(product, _i) of store.cart"
              :key="product.id"
              class="fl-ic justify-between"
            >
              <div class="flex-1 fl-ic gap-5">
                <img :src="product.image" class="object-cover h-24" />
                <div class="flex flex-col gap-1">
                  <p>{{ product.name }}</p>
                  <p>${{ product.price }}</p>
                  <Button size="xs" @click="removeFromCart(product)">
                    Remove
                  </Button>
                </div>
              </div>
              <div
                class="fl-ic border-2 border-solid p-2 justify-between gap-1"
              >
                <Button
                  size="xs"
                  variant="link"
                  class="text-white text-lg"
                  @click="quantityControl(product, 'increment')"
                  >+</Button
                >
                <span>{{ product.amount }}</span>
                <Button
                  size="xs"
                  variant="link"
                  class="text-white text-lg"
                  @click="quantityControl(product, 'decrement')"
                  >-</Button
                >
              </div>
            </div>
          </div>
          <hr
            class="my-4 h-1 bg-primary-white shadow-2xl shadow-muted-foreground"
          />
          <div v-show="store.cart.length > 0">
            <div class="justify-between fl-ic">
              <h4 class="text-center">Summary</h4>
              <p>${{ store.getCartTotal }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.show-enter-active,
.show-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.show-enter-from,
.show-leave-to {
  opacity: 0;
}
.show-enter-from {
  transform: translateX(24rem);
}
.show-leave-to {
  transform: translateX(24rem);
}
</style>
