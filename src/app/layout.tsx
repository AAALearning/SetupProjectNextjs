import Script from "next/script";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="../favicon.ico" />
        {/* Phải dùng Script tránh lỗi */}
        <Script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js"></Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
