import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "./Menu.module.css";
import { getAmountOfVisibleChilds } from "../utils/domUtils";
import { useDebounce } from "../hooks/useDebounce";

type MenuItem = {
  id: string;
  title: string;
  link: string;
};

const menu: MenuItem[] = [
  {
    id: "main",
    title: "Main",
    link: "/main",
  },
  {
    id: "about",
    title: "About",
    link: "/about",
  },
  {
    id: "keys",
    title: "Keys",
    link: "/keys",
  },
  {
    id: "others",
    title: "Others",
    link: "/others",
  },
  {
    id: "some",
    title: "Some",
    link: "/some",
  },
  {
    id: "info",
    title: "Info",
    link: "/info",
  },
];

const Menu: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleAmount, setVisibleAmount] = useState<null | number>(null);
  const containerRef = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    containerRef.current &&
      setVisibleAmount(getAmountOfVisibleChilds(containerRef.current));
  }, [containerRef]);

  const handleResize = useCallback(() => {
    console.log("resize");
    containerRef.current &&
      setVisibleAmount(getAmountOfVisibleChilds(containerRef.current));
  }, []);

  const handleResizeDebounced = useDebounce(handleResize);

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
    visibleAmount !== null ? menu.slice(0, visibleAmount) : menu;
  const othersItems =
    visibleAmount !== null ? menu.slice(visibleAmount, menu.length) : [];

  const popeverClass = `menuPopover__${isVisible ? "visible" : "hidden"}`;
  return (
    <div ref={containerRef} className={styles.menu}>
      {visibleItems.map((item: MenuItem) => (
        <a key={item.id} href={item.link} className={styles.menuItem}>
          {item.title}
        </a>
      ))}
      {(visibleAmount === null || othersItems.length > 0) && (
        <div className={styles.menuItem}>
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
