<script setup lang="ts">
import LFooter from "~/components/LFooter.vue";
import NavArrow from "~/components/NavArrow.vue";
</script>
<template>
  <div class="layout">
    <div class="layout__body">
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

<style lang="scss">
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
    box-sizing: border-box;
  }
  &__content {
    max-width: 1440px;
    padding: 96px 80px;
    margin: 0 auto;
    display: flex;
    > .page {
      width: 100%;
    }
  }
  &__arrow {
    position: fixed;
    bottom: 32px;
    right: 32px;
    z-index: 100;
  }
}
</style>
