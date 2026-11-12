import { ImageResponse } from "next/og";

export const alt = "Samad Kausar — Frontend-Heavy Full Stack Engineer";
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
          backgroundColor: "#0B0B0A",
          padding: "60px 80px",
          color: "#F3F3EE",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 24, color: "#00D4FF", fontWeight: 700, letterSpacing: "0.05em" }}>
            SAMAD KAUSAR
          </div>
          <div style={{ fontSize: 18, color: "rgba(243,243,238,0.6)" }}>
            PORTFOLIO 2026
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 78, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#F3F3EE" }}>
            Pixels move.
          </div>
          <div style={{ fontSize: 78, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#00D4FF" }}>
            Systems hold.
          </div>
          <div style={{ fontSize: 26, color: "rgba(243,243,238,0.7)", marginTop: 20, maxWidth: 960 }}>
            Frontend-heavy full stack engineer. High-performance React enterprise portals, mobile media engines, and resilient distributed microservices.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["React 19", "Next.js", "NestJS", "React Native", "TypeScript", "Redis / BullMQ", "95+ Vitals"].map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: 16,
                padding: "8px 18px",
                borderRadius: 999,
                border: "1px solid rgba(243,243,238,0.2)",
                backgroundColor: "rgba(255,255,255,0.06)",
                color: "#F3F3EE",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}

