<script setup lang="ts">
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
          <span class="p-m">{{ filters.priceMin }}</span>
        </div>
        <div>
          <p class="p-m meta">До</p>
          <span class="p-m">{{ filters.priceMax }}</span>
        </div>
      </div>
    </div>
    <div class="flats-filters__slider">
      <p class="p-m">Площадь, м²</p>
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
