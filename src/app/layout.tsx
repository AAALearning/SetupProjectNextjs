import Script from "next/script";
import "./globals.css";
import { cookies } from "next/headers";
import Providers from "./providers";

export const metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  return (
    <html lang={cookieStore.get("lang")?.value ?? "en"} suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="../favicon.ico" />
        {/* Phải dùng Script tránh lỗi */}
        {/* <Script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js"></Script> */}
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
