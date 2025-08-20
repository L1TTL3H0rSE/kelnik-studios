<script setup lang="ts">
import type { StyleValue } from "vue";

export type SliderProps = {
  min: number | null;
  max: number | null;
};

const props = defineProps<SliderProps>();

const selectedMin = defineModel<number | null>("selectedMin");
const selectedMax = defineModel<number | null>("selectedMax");
const slider = ref<HTMLDivElement>();
const leftDotElement = ref<HTMLElement>();
const rightDotElement = ref<HTMLElement>();

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

const handleDrag = (event: MouseEvent, dotType: "left" | "right") => {
  let newValue = getNewValue(event);
  if (!newValue) return;

  if (dotType == "left") {
    if (selectedMax.value != null && newValue > selectedMax.value) {
      selectedMax.value = newValue;
      return;
    }
    selectedMin.value = newValue;
  } else {
    if (selectedMin.value != null && newValue < selectedMin.value) {
      selectedMin.value = newValue;
      return;
    }
    selectedMax.value = newValue;
  }
};

function getNewValue(event: MouseEvent) {
  if (!slider.value || props.min == null || props.max == null) return;
  const sliderRect = slider.value.getBoundingClientRect();
  let percent = (event.clientX - sliderRect.left) / sliderRect.width;

  if (percent < 0) percent = 0;
  if (percent > 1) percent = 1;
  return Math.round(props.min + percent * (props.max - props.min));
}

const handleClick = (event: MouseEvent) => {
  const newValue = getNewValue(event);
  if (!newValue || !selectedMax.value || !selectedMin.value) return;
  const distToMin = Math.abs(newValue - selectedMin.value);
  const distToMax = Math.abs(newValue - selectedMax.value);
  if (distToMin <= distToMax) {
    selectedMin.value = newValue;
  } else {
    selectedMax.value = newValue;
  }
};

//@ts-expect-error
useMouseDrag(leftDotElement, (event) => handleDrag(event, "left"));
//@ts-expect-error
useMouseDrag(rightDotElement, (event) => handleDrag(event, "right"));
</script>

<template>
  <div
    ref="slider"
    class="slider"
    @click="handleClick"
  >
    <div class="slider__body" />
    <div
      ref="leftDotElement"
      class="slider__dot"
      :style="leftDot"
    />
    <div
      ref="rightDotElement"
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
    cursor: pointer;
  }
  &__dot {
    height: 14px;
    width: 14px;
    border-radius: 14px;
    background: var(--primary-main-color);
    position: absolute;
    left: 100%;
    transform: translateX(-50%);
    cursor: pointer;
  }
  &__filled {
    height: 3px;
    background: var(--primary-main-color);
    cursor: pointer;
    position: absolute;
  }
}
</style>
