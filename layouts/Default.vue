<script setup lang="ts">
import LFooter from "~/components/LFooter.vue";
import LHeader from "~/components/LHeader.vue";
import NavArrow from "~/components/NavArrow.vue";
</script>
<template>
  <div class="layout">
    <div class="layout__body">
      <LHeader />
      <div class="layout__content">
        <slot />
      </div>
      <nav class="layout__arrow">
        <NavArrow />
      </nav>
    </div>
    <LFooter />
  </div>
</template>

<style scoped lang="scss">
body {
  margin: 0;
}

.layout {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &__body {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    // padding-bottom: 96px;
  }
  &__content {
    max-width: 1440px;
    padding: 96px 80px;
    margin: 0 auto;
    flex: 1;
    display: flex;
  }
  &__arrow {
    position: fixed;
    bottom: 32px;
    right: 32px;
    z-index: 100;
  }
}
</style>
