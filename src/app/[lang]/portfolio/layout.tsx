import { TranslationProvider } from "@/components/common/LangProvider";
import { getDictionary, Language } from "@/utils/dictionaries";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Language }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <TranslationProvider dict={dict}>{children}</TranslationProvider>;
}
