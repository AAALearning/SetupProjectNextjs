import React from "react";
import styles from "./index.module.css";

type TimelineItem = {
  place: string;
  time: string;
  city: string;
  title: string;
  details: string[];
};
type TimelineArr = TimelineItem[];

const DetailsTimeline = ({ timelines }: { timelines: TimelineArr }) => {
  return (
    <section className={styles.timeline}>
      {timelines.map((e, i) => (
        <React.Fragment key={i}>
          <div className={styles["timeline__left"]}>
            <h5 aria-label="location">{e.place}</h5>
            <h6 aria-label="time">{e.time}</h6>
            <h6 aria-label="city">{e.city}</h6>
          </div>
          <div className={styles["timeline__right"]}>
            <h3 aria-label="role">{e.title}</h3>
            <ul className={styles["timeline__right--list"]}>
              {e.details.map((d, j) => (
                <li key={j}>{d}</li>
              ))}
            </ul>
          </div>
        </React.Fragment>
      ))}
    </section>
  );
};

export default DetailsTimeline;
