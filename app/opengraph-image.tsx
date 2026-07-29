import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "Abah Prince Evans — Dev Full-Stack & Cybersécurité";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  let profileSrc = "";
  try {
    const buf = await readFile(join(process.cwd(), "public/images/profile.jpg"));
    // Le fichier peut être un PNG malgré son extension .jpg — on détecte le vrai type
    const isPng = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
    profileSrc = `data:image/${isPng ? "png" : "jpeg"};base64,${buf.toString("base64")}`;
  } catch { /* no photo fallback */ }

  const skills = ["Next.js", "React", "Python", "Pentest", "OSINT"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px", height: "630px", display: "flex",
          background: "linear-gradient(135deg, #030712 0%, #071828 50%, #030b12 100%)",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Cyber grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(0,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }} />
        {/* Glow top-left */}
        <div style={{
          position: "absolute", top: "-120px", left: "-80px",
          width: "560px", height: "560px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,255,255,0.14) 0%, transparent 70%)",
        }} />
        {/* Glow bottom-right */}
        <div style={{
          position: "absolute", bottom: "-80px", right: "180px",
          width: "420px", height: "420px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,255,150,0.09) 0%, transparent 70%)",
        }} />

        {/* ── Left column ── */}
        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          flex: 1, padding: "56px 40px 56px 80px", gap: "18px", position: "relative",
        }}>
          {/* Status badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            background: "rgba(0,255,255,0.07)", border: "1px solid rgba(0,255,255,0.22)",
            borderRadius: "100px", padding: "8px 18px", alignSelf: "flex-start",
            fontSize: "15px", color: "rgba(0,255,255,0.85)", fontFamily: "monospace",
          }}>
            <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#00ff96", boxShadow: "0 0 8px #00ff96" }} />
            available_for_work = true
          </div>

          {/* Name */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            <div style={{ fontSize: "68px", fontWeight: "800", lineHeight: 1.05, color: "#dff6f6", letterSpacing: "-1px" }}>
              Abah Prince
            </div>
            <div style={{
              fontSize: "68px", fontWeight: "800", lineHeight: 1.05, letterSpacing: "-1px",
              background: "linear-gradient(90deg, #00ffff 0%, #00ff96 50%, #ffaa00 100%)",
              backgroundClip: "text", color: "transparent",
            }}>
              Evans
            </div>
          </div>

          {/* Subtitle */}
          <div style={{ fontSize: "22px", color: "rgba(180,230,230,0.65)", fontWeight: "400", letterSpacing: "0.5px" }}>
            Cybersécurité · Dev Full-Stack · IA
          </div>

          {/* Location — pas d'emoji : le fallback twemoji nécessite un accès réseau au build */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", color: "rgba(140,200,200,0.5)" }}>
            Yaoundé, Cameroun
          </div>

          {/* Skills pills */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "4px" }}>
            {skills.map((s) => (
              <div key={s} style={{
                background: "rgba(0,255,255,0.07)", border: "1px solid rgba(0,255,255,0.18)",
                borderRadius: "8px", padding: "6px 14px",
                fontSize: "14px", color: "#00e5e5", fontFamily: "monospace",
              }}>{s}</div>
            ))}
          </div>

          {/* URL */}
          <div style={{ fontSize: "14px", color: "rgba(0,255,255,0.35)", fontFamily: "monospace", marginTop: "6px" }}>
            portfolio-evans-abah.vercel.app
          </div>
        </div>

        {/* ── Right column — Profile photo ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "40px 80px 40px 20px", position: "relative",
        }}>
          {profileSrc ? (
            <div style={{
              width: "290px", height: "290px", borderRadius: "50%", overflow: "hidden",
              border: "3px solid rgba(0,255,255,0.35)",
              boxShadow: "0 0 0 8px rgba(0,255,255,0.06), 0 0 80px rgba(0,255,255,0.22), 0 0 140px rgba(0,255,150,0.1)",
              display: "flex",
            }}>
              {/* @ts-ignore */}
              <img src={profileSrc} width="290" height="290" style={{ objectFit: "cover", objectPosition: "top center" }} />
            </div>
          ) : (
            <div style={{
              width: "290px", height: "290px", borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(0,255,255,0.15), rgba(0,255,150,0.1))",
              border: "3px solid rgba(0,255,255,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "72px", fontWeight: "800", color: "rgba(0,255,255,0.8)", fontFamily: "monospace",
            }}>
              APE
            </div>
          )}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
