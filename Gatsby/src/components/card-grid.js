import React from "react";
import Card from "./card";
import * as styles from "../styles/articles.module.scss";

const CardGrid = ({ data }) => {
  return (
    <div className={styles.container} data-testid="grid">
      {data.map((data) => (
        <Card
          key={data.title}
          img={data.img}
          title={data.title}
          text={data.text}
          annotation={data.annotation}
          url={data.url}
        />
      ))}
    </div>
  );
};

export default CardGrid;
