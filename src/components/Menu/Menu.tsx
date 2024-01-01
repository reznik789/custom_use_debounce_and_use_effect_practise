import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "./Menu.module.css";
import {
  getAmountOfVisibleChilds,
  getPrecalculatedWidthData,
} from "./menuUtils";
import { menuItems, MenuItem } from "./items";
import { useDebounce } from "../../hooks/useDebounce";

const Menu: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleAmount, setVisibleAmount] = useState<null | number>(null);
  const [menuItemsData, setMenuItemsData] = useState<{
    menuElemsWidth: number[];
    moreElemWidth: number;
  }>({
    menuElemsWidth: [],
    moreElemWidth: 0,
  });
  const containerRef = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const { containerWidth, menuElemsWidth, moreElemWidth } =
      getPrecalculatedWidthData(containerRef.current);
    setVisibleAmount(
      getAmountOfVisibleChilds(
        containerRef.current,
        menuElemsWidth,
        moreElemWidth,
      ),
    );
    setMenuItemsData({
      menuElemsWidth,
      moreElemWidth,
    });
  }, [containerRef]);

  const handleResize = useCallback(() => {
    console.log("resize");
    containerRef.current &&
      setVisibleAmount(
        getAmountOfVisibleChilds(
          containerRef.current,
          menuItemsData.menuElemsWidth,
          menuItemsData.moreElemWidth,
        ),
      );
  }, [menuItemsData]);

  const handleResizeDebounced = useDebounce(handleResize, 25);

  useEffect(() => {
    window.addEventListener("resize", handleResizeDebounced);
    return () => {
      window.removeEventListener("resize", handleResizeDebounced);
    };
  }, [handleResizeDebounced]);

  const handleVisiblityChange = () => {
    setIsVisible((prev) => !prev);
  };

  const visibleItems =
    visibleAmount !== null ? menuItems.slice(0, visibleAmount) : menuItems;
  const othersItems =
    visibleAmount !== null
      ? menuItems.slice(visibleAmount, menuItems.length)
      : [];

  const popeverClass = `menuPopover__${isVisible ? "visible" : "hidden"}`;
  return (
    <div ref={containerRef} className={styles.menu}>
      {visibleItems.map((item: MenuItem) => (
        <a key={item.id} href={item.link} className={styles.menuItem}>
          {item.title}
        </a>
      ))}
      {(visibleAmount === null || othersItems.length > 0) && (
        <div id="more" className={styles.menuItem}>
          <span onClick={handleVisiblityChange}>...</span>
          <div className={styles[popeverClass]}>
            <ul>
              {othersItems.map((item) => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default Menu;
