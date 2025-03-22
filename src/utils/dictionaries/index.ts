import "server-only";
import i18n from "@/../i18n.json";

export const langs = i18n.locale.targets;

export type Language = (typeof langs)[number];

function createCustomObject<T extends Record<string, string>>(obj: T = {} as T): T {
  return new Proxy(obj, {
    get(target, key: string) {
      if (key in target) {
        return target[key];
      }
      return key; // Return the key as a string if not found
    },
  }) as T;
}

const dictionaries = langs.reduce(
  (acc, lang) => {
    acc[lang] = () => import(`./${lang}.json`).then((module) => module.default);
    return acc;
  },
  {} as Record<Language, () => Promise<Record<string, string>>>
);

export const getDictionary = async (locale?: Language) => createCustomObject(await dictionaries[locale ?? "en"]());
