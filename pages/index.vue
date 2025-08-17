<script setup lang="ts">
import FlatsFilters from "~/components/FlatsFilters.vue";
import FlatsTable from "~/components/FlatsTable.vue";
</script>

<template>
  <main class="page">
    <FlatsTable />
    <FlatsFilters />
  </main>
</template>

<style lang="scss">
.page {
  display: flex;
  justify-content: space-between;
}
</style>
