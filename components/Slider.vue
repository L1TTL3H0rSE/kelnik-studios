<script setup lang="ts">
import type { StyleValue } from "vue";

export type SliderProps = {
  min: number | null;
  max: number | null;
};

const props = defineProps<SliderProps>();

const selectedMin = defineModel<number | null>("selectedMin");
const selectedMax = defineModel<number | null>("selectedMax");

const leftDot = computed<StyleValue>(() => {
  if (!selectedMin.value || !props.max || !props.min) return { left: "0%" };
  const percent =
    ((selectedMin.value - props.min) * 100) / (props.max - props.min);
  return { left: `${percent}%` };
});

const rightDot = computed<StyleValue>(() => {
  if (!selectedMax.value || !props.max || !props.min) return { left: "0%" };
  const percent =
    ((selectedMax.value - props.min) * 100) / (props.max - props.min);
  return { left: `${percent}%` };
});

const filled = computed<StyleValue>(() => {
  const left = Number(leftDot.value!.left.replace("%", ""));
  const right = Number(rightDot.value!.left.replace("%", ""));
  const overall = right - left;
  return { left: `${left}%`, width: `${overall}%` };
});
</script>

<template>
  <div class="slider">
    <div class="slider__body" />
    <div
      class="slider__dot"
      :style="leftDot"
    />
    <div
      class="slider__dot"
      :style="rightDot"
    />
    <div
      class="slider__filled"
      :style="filled"
    />
  </div>
</template>

<style scoped lang="scss">
.slider {
  position: relative;
  height: 14px;
  display: flex;
  align-items: center;
  &__body {
    height: 3px;
    background: var(--background-slider-color);
    flex: 1;
  }
  &__dot {
    height: 14px;
    width: 14px;
    border-radius: 14px;
    background: var(--primary-main-color);
    position: absolute;
    left: 100%;
    transform: translateX(-50%);
  }
  &__filled {
    height: 3px;
    background: var(--primary-main-color);
    position: absolute;
  }
}
</style>
