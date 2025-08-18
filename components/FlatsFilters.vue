<script setup lang="ts">
import Slider from "./Slider.vue";

const filters = useFiltersStore();

function clickRoom(n: number) {
  if (n == filters.selectedRooms) {
    filters.selectedRooms = undefined;
    return;
  }
  filters.selectedRooms = n;
}
</script>

<template>
  <div class="flats-filters">
    <div class="flats-filters__buttons">
      <template
        v-for="r in filters.rooms"
        :key="r"
      >
        <div
          :current="filters.selectedRooms == r"
          @click="clickRoom(r)"
        >
          <p class="p-m">
            {{ `${r}к` }}
          </p>
        </div>
      </template>
    </div>
    <div class="flats-filters__slider">
      <p class="p-m">Стоимость квартиры, ₽</p>
      <div>
        <div>
          <p class="p-m meta">От</p>
          <span class="p-m">{{ filters.selectedPriceMin }}</span>
        </div>
        <div>
          <p class="p-m meta">До</p>
          <span class="p-m">{{ filters.selectedPriceMax }}</span>
        </div>
      </div>
      <Slider
        v-model:selectedMax="filters.selectedPriceMax"
        v-model:selectedMin="filters.selectedPriceMin"
        :max="filters.availablePrice.max"
        :min="filters.availablePrice.min"
      />
    </div>
    <div class="flats-filters__slider">
      <p class="p-m">Площадь, м²</p>
      <div>
        <div>
          <p class="p-m meta">От</p>
          <span class="p-m">{{ filters.selectedAreaMin }}</span>
        </div>
        <div>
          <p class="p-m meta">До</p>
          <span class="p-m">{{ filters.selectedAreaMax }}</span>
        </div>
      </div>
      <Slider
        v-model:selectedMax="filters.selectedAreaMax"
        v-model:selectedMin="filters.selectedAreaMin"
        :max="filters.availableArea.max"
        :min="filters.availableArea.min"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.flats-filters {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 400px;
  background: var(--background-main-color);
  padding: 40px;
  border-radius: 10px;
  &__buttons {
    display: flex;
    gap: 16px;
    > div {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100px;
      background: var(--background-light-color);
      height: 44px;
      width: 44px;
      &[current="true"] {
        background: var(--primary-main-color);
        box-shadow: 0px 6px 20px 0px var(--box-shadow-color);
        > p {
          color: var(--text-light-color);
        }
      }
    }
  }
  &__slider {
    display: flex;
    flex-direction: column;
    gap: 8px;
    > div {
      display: flex;
      > div {
        display: flex;
        gap: 8px;
        width: 50%;
        &.meta {
          opacity: 20%;
        }
      }
    }
  }
}
</style>
