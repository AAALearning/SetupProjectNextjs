import Script from "next/script";
import "./globals.css";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  return (
    <html lang={cookieStore.get("lang")?.value ?? "en"}>
      <head>
        <link rel="preload" as="image" href="../favicon.ico" />
        {/* Phải dùng Script tránh lỗi */}
        {/* <Script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js"></Script> */}
      </head>
      <body>{children}</body>
    </html>
  );
}
