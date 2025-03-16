import { ReactScan } from "@/components/common/ReactScan";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <ReactScan/> */}
      <head>
        <link rel="preload" as="image" href="../favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
