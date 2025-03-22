import PorfolioBannerIcon from "./PortfolioBannerIcon";
import styles from "./index.module.css";
import { bannerData } from "@/config/porfolio";
import { getDictionary, Language } from "@/utils/dictionaries";
import { Roboto, Roboto_Flex } from "next/font/google";
import localFont from "next/font/local";

// Static fonts
const robotoFont = Roboto({
  subsets: ["latin"],
  weight: "700",
});

// Variable font
const robotoFlexFont = Roboto_Flex({
  subsets: ["latin"],
});

// Local font
const montserratFont = localFont({
  src: "../../../assets/fonts/Montserrat_variablefonts.ttf",
  display: "swap",
});

export default async function PorfolioBanner({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <section className={styles.banner}>
      <h2 className={styles["banner__smalltitle"]} aria-label="shorthand name">
        R | N
      </h2>
      <h1 className={`${styles["banner__bigTitle"]} ${robotoFlexFont.className}`} aria-label="name">
        {dict["portfolio.banner.title"]}
      </h1>
      <div className="flex items-center gap-[4rem] pb-[1rem]">
        <div className={styles["banner__line"]}></div>
        <h2 className={`${styles["banner__smalltitle"]} ${robotoFont.className}`} aria-label="job">
          {dict["portfolio.banner.job"]}
        </h2>
        <div className={styles["banner__line"]}></div>
      </div>
      <div className={styles["banner__contacts"]}>
        {bannerData.map((b, i) => (
          <div key={i} className={styles["banner__contacts--item"]}>
            <PorfolioBannerIcon icon={b.icon} />
            <p className={montserratFont.className} aria-label={b.icon}>
              {b.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
