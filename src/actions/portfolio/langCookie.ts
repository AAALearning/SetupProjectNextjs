"use server";

import { Language } from "@/utils/dictionaries";
import { cookies } from "next/headers";

export async function setLangCookie({ lang }: { lang: Language }) {
  const rawCookie = await cookies();
  if (rawCookie.get("lang")?.value != lang) {
    rawCookie.set("lang", lang); // Tự render lại
  }
}
