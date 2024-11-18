import React from "react";
import { Link } from "gatsby";
import * as styles from "../styles/card.module.scss";

const Card = ({ img, title, text, annotation, url }) => {
  return (
    <div className={styles.card} data-testid="card">
      {img ? <img src={img} className={styles.image} /> : null}
      <div className={styles.content}>
        {title ? <h3>{title}</h3> : null}
        {text ? <p className={styles.text}>{text}</p> : null}
        {annotation ? (
          <p className={styles.daysPublished}>{annotation}</p>
        ) : null}
        {url ? (
          <Link role="button" to={url} style={{ textDecoration: "none" }}>
            <button
              role="button"
              aria-pressed="false"
              className={styles.button}
            >
              Ver más...
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Card;
