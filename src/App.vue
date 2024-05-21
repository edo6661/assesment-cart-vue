<script setup lang="ts">
import { Toaster } from "./components/ui/sonner";
import Header from "./components/shared/Header.vue";
import Footer from "./components/shared/Footer.vue";
import Wrapper from "./components/Wrapper.vue";
</script>

<template>
  <Header />
  <Toaster />
  <main class="min-h-[85vh] space-y-8">
    <Wrapper />
  </main>
  <Footer />
</template>

<style scoped></style>
