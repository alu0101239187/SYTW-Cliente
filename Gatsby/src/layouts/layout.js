import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import * as styles from "../styles/layout.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <Navbar />
      <div className={styles.content} data-testid="content">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
