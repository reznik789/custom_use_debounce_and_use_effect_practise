import React from "react";
import styles from "./Menu.module.css";

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

const Menu: React.FC = () => (
  <div className={styles.menu}>
    {menu.map((item: MenuItem) => (
      <a key={item.id} href={item.link} className={styles.menuItem}>
        {item.title}
      </a>
    ))}
    <div className={styles.menuItem}>
      <span>...</span>
      <div className={styles.menuPopover}></div>
    </div>
  </div>
);

export default Menu;
