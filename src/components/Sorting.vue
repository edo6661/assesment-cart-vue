<script setup lang="ts">
import { useProductStore } from "@/stores/productStore";
import SortProduct from "./SortProduct.vue";
import Input from "./ui/input/Input.vue";
const store = useProductStore();
</script>
<template>
  <div class="fl-ic justify-between flex-wrap">
    <div class="flex-1">
      <Input
        placeholder="Search for products..."
        class="placeholder:italic placeholder:text-sm"
        v-model="store.search"
      />
    </div>
    <div class="flex-1">
      <SortProduct />
    </div>
  </div>
</template>

<style scoped></style>
