<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortProduct } from "@/constants/sorting";
import { useProductStore } from "@/stores/productStore";

const store = useProductStore();
</script>

<template>
  <Select v-model="store.sort">
    <SelectTrigger class="w-[180px]">
      <SelectValue placeholder="Select to Sort" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Sort By Price</SelectLabel>
        <SelectItem
          v-for="product in sortProduct"
          :key="product.label"
          :value="product.value"
        >
          {{ product.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
