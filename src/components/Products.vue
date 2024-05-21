<script setup lang="ts">
import { useProductStore } from "@/stores/productStore";
import { computed, ref } from "vue";
import { useAutoAnimate } from "@formkit/auto-animate/vue";
import TransitionFade from "./TransitionFade.vue";
import ProductCard from "./ProductCard.vue";
import Hint from "./Hint.vue";
import { IProduct } from "@/types";

const store = useProductStore();
const { addToCart, isProductInCart } = store;
const [parent] = useAutoAnimate({
  duration: 700,
  easing: "ease-in-out",
});

const activeProduct = ref<Record<string, boolean> | null>(null);
const setActiveProduct = (id: string) => {
  activeProduct.value = { [id]: true };
};

const dynamicClasses = computed(() => (product: IProduct) => {
  return {
    "bg-black": product.quantity > 0,
    "bg-red-500 cursor-not-allowed": product.quantity === 0,
    "bg-green-500": isProductInCart(product.id),
  };
});
const dynamicContent = computed(() => (product: IProduct) => {
  return product.quantity === 0
    ? "Out of stock"
    : isProductInCart(product.id)
    ? "Already in cart"
    : "Add to cart";
});
</script>
<template>
  <div class="wrapper-products" ref="parent">
    <div
      v-for="(product, _i) of store.products"
      :key="product.id"
      @mouseenter="setActiveProduct(product.id)"
      @mouseleave="activeProduct = null"
      @click="addToCart(product)"
    >
      <Hint :content="dynamicContent(product)" class="relative w-full h-full">
        <TransitionFade
          class="absolute inset-0 fl-ic justify-center bg-opacity-30"
          :class="dynamicClasses(product)"
        >
          <ProductCard
            :product="product"
            :activeProduct="activeProduct?.[product.id] || false"
          />
        </TransitionFade>
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-64 object-cover"
        />
      </Hint>
    </div>
  </div>
</template>

<style scoped>
.wrapper-products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  position: relative;
}
</style>
