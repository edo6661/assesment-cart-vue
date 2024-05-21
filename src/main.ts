import { createApp } from "vue";
import "./assets/index.css";
import App from "./App.vue";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import { createPinia } from "pinia";
import { setupProductStoreWatcher } from "./stores/productStore";
createApp(App).use(autoAnimatePlugin).use(createPinia()).mount("#app");

setupProductStoreWatcher();
