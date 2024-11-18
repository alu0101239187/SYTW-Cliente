import React from "react";
import { Link } from "gatsby";
import * as styles from "../styles/navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link
        to="/technology"
        className={styles.element}
        data-testid="technology-link"
      >
        Tecnología
      </Link>
      <Link to="/ecology" className={styles.element} data-testid="ecology-link">
        Ecología
      </Link>
      <Link to="/economy" className={styles.element} data-testid="economy-link">
        Economía
      </Link>
    </div>
  );
};

export default Navbar;
