export function getAmountOfVisibleChilds(element: Element): number {
  const elRect = element.getBoundingClientRect();
  let childNodesWidth = 0;
  let visibleChildren = 0;
  Array.from(element.children).forEach((childEl: HTMLElement, index) => {
    const style = window.getComputedStyle(childEl);
    const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    const width = childEl.getBoundingClientRect().width + margin;
    if (childNodesWidth + width <= elRect.width) {
      childNodesWidth += width;
      visibleChildren = index + 1;
    }
  });
  return visibleChildren;
}
