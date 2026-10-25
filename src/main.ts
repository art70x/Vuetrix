import { ViteSSG } from "vite-ssg";
import { routes } from "vue-router/auto-routes";

import App from "./app.vue";

import "@/main.css";

export const createApp = ViteSSG(App, {
  routes,
  base: import.meta.env.BASE_URL,
});
