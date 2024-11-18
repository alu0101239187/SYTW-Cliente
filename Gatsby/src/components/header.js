import React from "react";
import { Link } from "gatsby";
import * as styles from "../styles/header.module.scss";
import { link } from "../styles/common.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>
        <Link to="/" className={link}>
          Gatsby
        </Link>
      </h1>
    </div>
  );
};

export default Header;
