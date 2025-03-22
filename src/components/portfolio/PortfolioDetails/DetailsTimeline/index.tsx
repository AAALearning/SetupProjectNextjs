import React from "react";
import styles from "./index.module.css";
import { cookies } from "next/headers";
import { getDictionary } from "@/utils/dictionaries";

type TimelineItem = {
  place: string;
  time: string;
  city: string;
  title: string;
  details: string[];
};
type TimelineArr = TimelineItem[];

const DetailsTimeline = async ({ timelines }: { timelines: TimelineArr }) => {
  const cookieStore = await cookies();
  const dict = await getDictionary(cookieStore.get("lang")?.value ?? "en");
  return (
    <section className={styles.timeline}>
      {timelines.map((e, i) => (
        <React.Fragment key={i}>
          <div className={styles["timeline__left"]}>
            <h5 aria-label="location">{dict[e.place]}</h5>
            <h6 aria-label="time">{e.time}</h6>
            <h6 aria-label="city">{e.city}</h6>
          </div>
          <div className={styles["timeline__right"]}>
            <h3 aria-label="role">{dict[e.title]}</h3>
            <ul className={styles["timeline__right--list"]}>
              {e.details.map((d, j) => (
                <li key={j}>{dict[d]}</li>
              ))}
            </ul>
          </div>
        </React.Fragment>
      ))}
    </section>
  );
};

export default DetailsTimeline;
