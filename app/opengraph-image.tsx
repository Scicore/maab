import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MAAB — International Business & Professional Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0f1a2c 0%, #1d2d43 50%, #263c58 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
              background: "white",
              color: "#0f1a2c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                color: "white",
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: "0.16em",
              }}
            >
              MAAB
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 14,
                letterSpacing: "0.22em",
                marginTop: 4,
              }}
            >
              TEXAS · USA
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              width: 60,
              height: 3,
              background: "#b8894a",
            }}
          />
          <div
            style={{
              color: "white",
              fontSize: 68,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Building Trusted Connections Across Markets
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 24,
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            International business and professional services from Texas, United States.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}