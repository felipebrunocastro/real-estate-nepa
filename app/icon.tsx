import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Branded app icon (monogram) — replaces the default framework favicon. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e1a2b",
          color: "#4691d0",
          fontSize: 40,
          fontWeight: 700,
          fontFamily: "sans-serif",
          letterSpacing: "-0.04em",
        }}
      >
        RE
      </div>
    ),
    { ...size },
  );
}
