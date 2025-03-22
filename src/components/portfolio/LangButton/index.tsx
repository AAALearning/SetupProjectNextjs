"use client";

import { setLangCookie } from "@/actions/portfolio/langCookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./index.module.css";
import { useParams } from "next/navigation";
import { useTranslation } from "@/components/common/LangProvider";
import i18n from "@/../i18n.json";

const LangButton = () => {
  const dict = useTranslation();
  const params = useParams();
  const [langState, setLangState] = useState(params.lang);
  const router = useRouter();

  // const debounceSetLangCookie = useMemo(
  //   () =>
  //     debounce(async (newLang) => {
  //       try {
  //         await setLangCookie({ lang: newLang });
  //         router.push("/portfolio", { scroll: false });
  //       } catch (ex) {
  //         console.log("Error::", ex);
  //         setLangState(params.lang);
  //       }
  //     }, 500),
  //   [params.lang, router]
  // );

  const changeLanguage = async (newLang: string) => {
    setLangState(newLang);
    // await debounceSetLangCookie(newLang);
    await setLangCookie({ lang: newLang });
    router.push("/portfolio", { scroll: false });
  };

  return (
    <>
      <button popoverTarget="langDialog" popoverTargetAction="toggle" className={styles["portfolio__langButton"]}>
        {dict["portfolio.button.changelang"]}: {langState}
      </button>
      <dialog popover="auto" id="langDialog" className={styles["portfolio__langDialog"]}>
        {i18n.locale.targets.map((t) => (
          <button
            key={t}
            className={`${styles["portfolio__langDialog--item"]} ${langState == t ? styles["portfolio__langDialog--item-active"] : ""}`}
            onClick={() => changeLanguage(t)}
          >
            {t}
          </button>
        ))}
      </dialog>
    </>
  );
};

export default LangButton;
