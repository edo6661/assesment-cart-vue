<script setup lang="ts">
import { IProduct } from "@/types";
import Hint from "./Hint.vue";
interface Props {
  product: IProduct;
  activeProduct: boolean;
}
const props = defineProps<Props>();
</script>
<template>
  <div
    v-show="props.activeProduct"
    class="flex flex-col items-center justify-center"
  >
    <Hint
      :content="`$${product.price.toString()}`"
      content-class="text-red-300"
    >
      <h1 class="text-white text-2xl">{{ product.name }}</h1>
    </Hint>
  </div>
</template>

<style scoped></style>
