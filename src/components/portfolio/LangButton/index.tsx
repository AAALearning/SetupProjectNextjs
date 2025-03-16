"use client";

import { setLangCookie } from "@/actions/portfolio/langCookie";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import styles from "./index.module.css";
import { useParams } from "next/navigation";

const LangButton = () => {
  const params = useParams();
  const router = useRouter();
  const [langState, setLangState] = useState(params.lang);

  const debounceSetLangCookie = useMemo(
    () =>
      debounce(async (newLang) => {
        try {
          await setLangCookie({ lang: newLang });
          router.push("/portfolio", { scroll: false });
        } catch (ex) {
          console.log("Error::", ex);
          setLangState(params.lang);
        }
      }, 1000),
    [params.lang, router]
  );

  const changeLanguage = async () => {
    const newLang = langState == "vi" ? "en" : "vi";
    setLangState(newLang);
    await debounceSetLangCookie(newLang);
  };

  return (
    <>
      <button className={styles["portfolio__langButton"]} onClick={() => changeLanguage()}>
        Lang: {langState}
      </button>
    </>
  );
};

export default LangButton;
