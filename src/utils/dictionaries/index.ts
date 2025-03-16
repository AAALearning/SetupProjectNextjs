import "server-only";

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  vi: () => import("./vi.json").then((module) => module.default),
};

export type Language = "en" | "vi";

export const getDictionary = async (locale?: Language) => dictionaries[locale ?? "en"]();
