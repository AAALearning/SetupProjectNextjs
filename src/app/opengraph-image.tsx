import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "This is open graph alt image for home";
export const size = {
  // Kích thước thẻ meta og:image:width và og:image:height
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const bytesizedBuffer = await readFile(join(process.cwd(), "src/assets/fonts/Bytesized-Regular.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        This is open graph image for home
      </div>
    ),
    {
      // Để kích thước thực sự của ảnh giống với kích thước trong thẻ meta
      ...size,
      fonts: [
        {
          name: "Bytesized",
          data: bytesizedBuffer,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
