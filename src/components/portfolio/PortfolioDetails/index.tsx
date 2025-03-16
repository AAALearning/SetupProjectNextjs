import Image from "next/image";
import styles from "./index.module.css";
import React from "react";
import DetailsSubtitle from "./DetailsSubtitle";
import { detailsLeftData, detailsRightData } from "@/config/porfolio";
import DetailsTimeline from "./DetailsTimeline";

const PorfolioDetails = () => {
  return (
    <div className={styles.content}>
      <section className={styles["content__left"]}>
        <div className={styles["content__left--avatar"]} aria-label="avatar">
          <figure>
            <Image
              src="/portfolio/avatar.png"
              layout="fill"
              alt="avatar"
              style={{ objectFit: "contain" }}
              priority={true}
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="
              placeholder="blur"
            />
          </figure>
        </div>
        {detailsLeftData.map((l, i) => (
          <section key={i}>
            <DetailsSubtitle text={l.key} />
            <ul className="pt-[0.8rem] pb-[1.5rem]">
              {l.value.map((v, j) => (
                <li className="my-[2rem]" key={j}>
                  <div className={styles["content__left--list-item"]}>
                    <h3>{v.name}</h3>
                    <div style={{ "--_content-item-level": v.level } as React.CSSProperties}></div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </section>
      <section className={styles["content__right"]}>
        <DetailsSubtitle text="ABOUT ME" />
        <p className={styles["content__right--aboutme"]} aria-label="description about me">
          With 5 years of experience as a Frontend Developer (HTML, CSS, JS, ReactJS) and an additional 3 years in
          Backend Development, I possess a robust skill set that bridges both aspects of web development.
        </p>
        {detailsRightData.map((d, i) => (
          <React.Fragment key={i}>
            <DetailsSubtitle text={d.key} />
            <DetailsTimeline timelines={d.value} />
          </React.Fragment>
        ))}
        <DetailsSubtitle text="OTHER" />
      </section>
    </div>
  );
};

export default PorfolioDetails;
