<script setup lang="ts">
import type { Flats } from "~/types";
const filters = useFiltersStore();
const sortKey = ref<keyof Flats | null>(null);
const sortDirection = ref<"asc" | "desc">("asc");

const sortedApartments = computed(() => {
  if (!sortKey.value) {
    return filters.filteredFlats;
  }

  const sorted = [...filters.filteredFlats];

  sorted.sort((a, b) => {
    const key = sortKey.value!;
    const valA = a[key];
    const valB = b[key];

    if (valA < valB) {
      return -1;
    }
    if (valA > valB) {
      return 1;
    }
    return 0;
  });

  if (sortDirection.value == "desc") {
    sorted.reverse();
  }

  return sorted;
});

function sortBy(key: keyof Flats) {
  if (key == "layout" || key == "id") return;

  if (sortKey.value == key) {
    sortDirection.value = sortDirection.value == "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortDirection.value = "asc";
  }
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  }).format(price);
};
</script>

<template>
  <div class="flats-table__wrapper">
    <h1 class="h-1">Квартиры</h1>
    <table class="flats-table">
      <thead>
        <tr>
          <th class="col-layout">Планировка</th>
          <th
            class="sortable"
            @click="sortBy('name')"
          >
            Квартира
            <span v-if="sortKey == 'name'">
              {{ sortDirection == "asc" ? "▲" : "▼" }}
            </span>
          </th>
          <th
            class="sortable"
            @click="sortBy('area')"
          >
            S, м²
            <span v-if="sortKey == 'area'">
              {{ sortDirection == "asc" ? "▲" : "▼" }}
            </span>
          </th>
          <th
            class="sortable"
            @click="sortBy('floor')"
          >
            Этаж
            <span v-if="sortKey == 'floor'">
              {{ sortDirection == "asc" ? "▲" : "▼" }}
            </span>
          </th>
          <th
            class="sortable"
            @click="sortBy('price')"
          >
            Цена, ₽
            <span v-if="sortKey == 'price'">
              {{ sortDirection == "asc" ? "▲" : "▼" }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="sortedApartments.length == 0">
          <td
            class="empty-cell"
            colspan="5"
          >
            Нет данных для отображения
          </td>
        </tr>
        <tr
          v-for="apt in sortedApartments"
          :key="apt.id"
        >
          <td class="col-layout">
            <IconsFlat />
          </td>
          <td>{{ apt.name }}</td>
          <td>{{ apt.area }}</td>
          <td>{{ apt.floor }}</td>
          <td>{{ formatPrice(apt.price) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.flats-table {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 48px;
  }
  .apartment-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;

    th,
    td {
      padding: 12px 16px;
      border-bottom: 1px solid #e0e0e0;
      vertical-align: middle;
    }

    thead {
      background-color: #f7f9fa;
      color: #6c757d;
      font-size: 14px;
      font-weight: 500;

      th.sortable {
        cursor: pointer;
        user-select: none; // Запрещаем выделение текста заголовка
        &:hover {
          background-color: #eef2f5;
        }
        span {
          margin-left: 4px;
        }
      }
    }

    tbody {
      font-size: 14px;
      color: #212529;

      tr {
        &:last-child td {
          border-bottom: none;
        }

        &:hover {
          background-color: #f7f9fa;
        }
      }

      .empty-cell {
        text-align: center;
        padding: 40px;
        color: #6c757d;
      }
    }

    // Стили для колонки с планировкой
    .col-layout {
      width: 80px; // Фиксированная ширина
      :deep(svg) {
        // Используем :deep для стилизации SVG внутри v-html
        display: block;
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
