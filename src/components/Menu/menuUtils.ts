function getElementWidhtWithMargins(childEl: Element) {
  const style = window.getComputedStyle(childEl);
  const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
  const width = childEl.getBoundingClientRect().width + margin;
  return width;
}

export function getPrecalculatedWidthData(element: Element) {
  const elRect = element.getBoundingClientRect();
  const childElems = Array.from(element.children);
  const menuElemsData = childElems.reduce(
    (res, el) => {
      const width = getElementWidhtWithMargins(el);
      if (el.id === "more") {
        res.moreElemWidth = width;
        return res;
      }
      res.menuElemsWidth.push(width);
      return res;
    },
    {
      menuElemsWidth: [] as number[],
      moreElemWidth: 0,
    },
  );
  return {
    containerWidth: elRect.width,
    ...menuElemsData,
  };
}

export function getAmountOfVisibleChilds(
  containerElem: Element,
  menuElemsWidth: number[],
  moreElemWidth: number,
): number {
  const containerWidth = getElementWidhtWithMargins(containerElem);
  let visibleChildren = 0;
  let width = moreElemWidth;
  menuElemsWidth.forEach((menuElemWidth, index) => {
    if (menuElemWidth + width <= containerWidth) {
      width += menuElemWidth;
      visibleChildren = index + 1;
    }
  });
  return visibleChildren;
}
