import type { Flats } from "~/types";

export const useFiltersStore = defineStore("filters", () => {
  const flats = ref<Flats[]>();
  const loading = ref(false);

  const rooms = ref<number[]>([]);
  const availableRooms = ref<number[]>([]);
  const priceMin = ref<number | null>(null);
  const priceMax = ref<number | null>(null);
  const areaMin = ref<number | null>(null);
  const areaMax = ref<number | null>(null);

  const selectedRooms = ref<number>();
  const selectedPriceMin = ref<number | null>(null);
  const selectedPriceMax = ref<number | null>(null);
  const selectedAreaMin = ref<number | null>(null);
  const selectedAreaMax = ref<number | null>(null);

  const allowUpdate = ref(true);

  function recalculate(data?: Flats[]) {
    if (!data?.length) {
      priceMin.value = null;
      priceMax.value = null;
      areaMin.value = null;
      areaMax.value = null;
      availableRooms.value = [];
      return;
    }
    allowUpdate.value = false;
    const prices = data.map((e) => e.price);
    const areas = data.map((e) => e.area);
    priceMin.value = Math.min(...prices);
    priceMax.value = Math.max(...prices);
    areaMin.value = Math.min(...areas);
    areaMax.value = Math.max(...areas);
    availableRooms.value = [...new Set(data.map((e) => e.rooms))].sort(
      (a, b) => a - b,
    );

    if (
      selectedPriceMin.value == null ||
      selectedPriceMin.value < priceMin.value
    ) {
      selectedPriceMin.value = priceMin.value;
    }
    if (
      selectedPriceMax.value == null ||
      selectedPriceMax.value > priceMax.value
    ) {
      selectedPriceMax.value = priceMax.value;
    }
    if (
      selectedAreaMin.value == null ||
      selectedAreaMin.value < areaMin.value
    ) {
      selectedAreaMin.value = areaMin.value;
    }
    if (
      selectedAreaMax.value == null ||
      selectedAreaMax.value > areaMax.value
    ) {
      selectedAreaMax.value = areaMax.value;
    }
    allowUpdate.value = true;
  }

  async function init() {
    loading.value = true;
    try {
      const result = await fetch("/data/apartments.json");
      if (!result.ok) throw new Error("Не удалось загрузить");
      flats.value = (await result.json()) as Flats[];
      rooms.value = [...new Set(flats.value.map((e) => e.rooms))].sort(
        (a, b) => a - b,
      );
      recalculate(flats.value);
    } finally {
      loading.value = false;
    }
  }

  function inRange(value: number, min?: number | null, max?: number | null) {
    if (min != null && value < min) return false;
    if (max != null && value > max) return false;
    return true;
  }

  const filteredFlats = computed(() =>
    flats.value?.filter(
      (e) =>
        inRange(e.price, selectedPriceMin.value, selectedPriceMax.value) &&
        inRange(e.area, selectedAreaMin.value, selectedAreaMax.value) &&
        (!selectedRooms.value || e.rooms == selectedRooms.value),
    ),
  );

  function resetFilters() {
    selectedPriceMin.value = priceMin.value;
    selectedPriceMax.value = priceMax.value;
    selectedAreaMin.value = areaMin.value;
    selectedAreaMax.value = areaMax.value;
    selectedRooms.value = undefined;
  }

  watch(
    () => filteredFlats.value,
    () => {
      if (allowUpdate.value) recalculate(filteredFlats.value);
    },
  );

  return {
    flats,
    loading,
    rooms,
    availableRooms,
    priceMax,
    priceMin,
    areaMax,
    areaMin,
    selectedAreaMax,
    selectedAreaMin,
    selectedPriceMax,
    selectedPriceMin,
    selectedRooms,
    init,
    resetFilters,
  };
});
