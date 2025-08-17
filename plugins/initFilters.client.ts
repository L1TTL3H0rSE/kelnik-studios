import { useFiltersStore } from "~/stores/filters";

export default defineNuxtPlugin(() => {
  const store = useFiltersStore();
  store.init();
});
