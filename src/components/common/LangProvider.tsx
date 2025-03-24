"use client";

import { createContext, useContext } from "react";

const TranslationContext = createContext<Record<string, string>>({});

export function TranslationProvider({ dict, children }: { dict: Record<string, string>; children: React.ReactNode }) {
  return <TranslationContext value={dict}>{children}</TranslationContext>;
}

export function useTranslation() {
  return useContext(TranslationContext);
}
