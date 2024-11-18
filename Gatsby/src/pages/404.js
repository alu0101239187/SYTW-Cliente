import * as React from "react";
import { Link } from "gatsby";
import Layout from "../layouts/layout";
import { center } from "../styles/common.module.scss";

const NotFoundPage = () => {
  return (
    <Layout>
      <h1 className={center}>Error 404</h1>
      <h2 className={center}>Esta página no existe</h2>
      <Link className={center} to="/">
        Volver al inicio
      </Link>
    </Layout>
  );
};

export default NotFoundPage;

export const Head = () => <title>Not found</title>;
