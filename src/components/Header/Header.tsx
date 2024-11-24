import React from "react";
import globalStyles from "../Styles.module.css";
import headerStyles from "./Header.module.css";

export const Header = (props: { title: string }) => {
  return (
    <section className={`${globalStyles.wrapper} ${headerStyles.header}`}>
      <div
        className={`${globalStyles.container} ${headerStyles.headerContainer}`}
      >
        <h1 className={globalStyles.title}>{props.title}</h1>
      </div>
    </section>
  );
};

export default Header;
