import type { Flats } from "~/types";

export const useFiltersStore = defineStore("filters", () => {
  const flats = ref<Flats[]>([]);
  const loading = ref(false);

  const selectedRooms = ref<number | undefined>(undefined);
  const selectedPriceMin = ref<number | null>(null);
  const selectedPriceMax = ref<number | null>(null);
  const selectedAreaMin = ref<number | null>(null);
  const selectedAreaMax = ref<number | null>(null);

  function inRange(value: number, min?: number | null, max?: number | null) {
    if (min != null && value < min) return false;
    if (max != null && value > max) return false;
    return true;
  }

  const rooms = computed(() =>
    flats.value.length
      ? [...new Set(flats.value.map((e) => e.rooms))].sort((a, b) => a - b)
      : null,
  );
  const priceMin = computed(() =>
    flats.value.length ? Math.min(...flats.value.map((f) => f.price)) : null,
  );
  const priceMax = computed(() =>
    flats.value.length ? Math.max(...flats.value.map((f) => f.price)) : null,
  );
  const areaMin = computed(() =>
    flats.value.length ? Math.min(...flats.value.map((f) => f.area)) : null,
  );
  const areaMax = computed(() =>
    flats.value.length ? Math.max(...flats.value.map((f) => f.area)) : null,
  );

  const filteredBy = (exclude: "price" | "area" | "rooms" | null = null) => {
    if (!flats.value.length) return [] as Flats[];
    return flats.value.filter((f) => {
      const byRooms =
        exclude == "rooms"
          ? true
          : selectedRooms.value == null || f.rooms == selectedRooms.value;
      const byPrice =
        exclude == "price"
          ? true
          : inRange(
              f.price,
              selectedPriceMin.value ?? priceMin.value,
              selectedPriceMax.value ?? priceMax.value,
            );
      const byArea =
        exclude == "area"
          ? true
          : inRange(
              f.area,
              selectedAreaMin.value ?? areaMin.value,
              selectedAreaMax.value ?? areaMax.value,
            );

      return byRooms && byPrice && byArea;
    });
  };

  const availableRooms = computed(() =>
    Array.from(new Set(filteredBy("rooms").map((f) => f.rooms))).sort(
      (a, b) => a - b,
    ),
  );

  const availablePrice = computed(() => {
    const data = filteredBy("price");
    if (!data.length)
      return { min: null as number | null, max: null as number | null };
    const prices = data.map((d) => d.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  });

  const availableArea = computed(() => {
    const data = filteredBy("area");
    if (!data.length)
      return { min: null as number | null, max: null as number | null };
    const areas = data.map((d) => d.area);
    return { min: Math.min(...areas), max: Math.max(...areas) };
  });

  const filteredFlats = computed(() => filteredBy(null));

  async function init() {
    loading.value = true;
    try {
      const res = await fetch("/data/flats.json");
      if (!res.ok) throw new Error("Не удалось загрузить flats.json");
      flats.value = (await res.json()) as Flats[];

      selectedPriceMin.value = priceMin.value;
      selectedPriceMax.value = priceMax.value;
      selectedAreaMin.value = areaMin.value;
      selectedAreaMax.value = areaMax.value;
    } finally {
      loading.value = false;
    }
  }

  function resetFilters() {
    selectedPriceMin.value = priceMin.value;
    selectedPriceMax.value = priceMax.value;
    selectedAreaMin.value = areaMin.value;
    selectedAreaMax.value = areaMax.value;
    selectedRooms.value = undefined;
  }

  watch(
    () => [
      availablePrice.value.min,
      availablePrice.value.max,
      selectedRooms.value,
    ],
    ([min, max]) => {
      if (min == null || max == null) return;
      if (selectedPriceMin.value == null) selectedPriceMin.value = min;
      if (selectedPriceMax.value == null) selectedPriceMax.value = max;

      if (selectedPriceMin.value < min) selectedPriceMin.value = min;
      if (selectedPriceMax.value > max) selectedPriceMax.value = max;
      if (selectedPriceMin.value > selectedPriceMax.value)
        selectedPriceMin.value = selectedPriceMax.value;
    },
    { immediate: true },
  );

  watch(
    () => [
      availableArea.value.min,
      availableArea.value.max,
      selectedRooms.value,
    ],
    ([min, max]) => {
      if (min == null || max == null) return;
      if (selectedAreaMin.value == null) selectedAreaMin.value = min;
      if (selectedAreaMax.value == null) selectedAreaMax.value = max;

      if (selectedAreaMin.value! < min) selectedAreaMin.value = min;
      if (selectedAreaMax.value! > max) selectedAreaMax.value = max;
      if (selectedAreaMin.value! > selectedAreaMax.value!)
        selectedAreaMin.value = selectedAreaMax.value;
    },
    { immediate: true },
  );

  // watch(
  //   () => selectedRooms.value,
  //   () => {
  //     if (selectedRooms.value == undefined) resetFilters();
  //   },
  // );

  return {
    flats,
    loading,
    availableRooms,
    availablePrice,
    availableArea,
    selectedRooms,
    selectedPriceMin,
    selectedPriceMax,
    selectedAreaMin,
    selectedAreaMax,
    filteredFlats,
    rooms,
    init,
    resetFilters,
  };
});
