export function useMouseDrag(
  element?: Ref<HTMLElement>,
  callback?: (ev: MouseEvent) => void,
) {
  if (!callback || !element) return;
  let isMouseDown = false;

  const onMouseDown = () => {
    isMouseDown = true;
  };

  const onMouseMove = (event: MouseEvent) => {
    if (!isMouseDown) return;
    callback(event);
  };

  const onMouseUp = () => {
    isMouseDown = false;
  };

  onMounted(() => {
    if (element?.value) {
      element.value.addEventListener("mousedown", onMouseDown);
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  });

  onUnmounted(() => {
    if (element?.value) {
      element.value.removeEventListener("mousedown", onMouseDown);
    }
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  });
}
