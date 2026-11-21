import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { halftoneDisc } from "@/lib/halftone";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const W = 1200;
const H = 630;
const STAR = { cx: 1030, cy: 770, r: 330 };
const dots = halftoneDisc(STAR.r, 19, 7.6, { x: -0.25, y: -0.45 }).filter((d) => STAR.cy + d.y - d.r < H - 24);

/** Link-preview image (1200×630) for each site language. */
export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const t = getDictionary(locale);
  const fonts = join(process.cwd(), "src/assets/fonts");
  const [sans, serif] = await Promise.all([
    readFile(join(fonts, "onest-500.ttf")),
    readFile(join(fonts, "noto-serif-display-condensed-500.ttf")),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: W, height: H, display: "flex", background: "#e6e7ea", padding: 24 }}>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            background: "#ffffff",
            borderRadius: 36,
            overflow: "hidden",
            padding: "52px 60px",
          }}
        >
          <svg
            width={W - 48}
            height={H - 48}
            viewBox={`0 0 ${W - 48} ${H - 48}`}
            style={{ position: "absolute", left: 0, top: 0 }}
          >
            {dots.map((d, i) => (
              <circle
                key={i}
                cx={STAR.cx - 24 + d.x}
                cy={STAR.cy - 24 + d.y}
                r={d.r}
                fill={Math.hypot(d.x, d.y + 40) < 150 ? "#c2371d" : "#000000"}
              />
            ))}
          </svg>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "Onest", fontSize: 30 }}>
            <div style={{ width: 20, height: 20, borderRadius: 999, background: "#000" }} />
            scutilabs
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 56,
              maxWidth: 760,
              fontFamily: "Noto Serif Display",
              fontSize: 118,
              lineHeight: 0.9,
              letterSpacing: -1,
              color: "#000",
            }}
          >
            {t.hero.title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 34,
              maxWidth: 620,
              fontFamily: "Onest",
              fontSize: 28,
              lineHeight: 1.35,
              color: "#55565e",
            }}
          >
            {t.footer.about}
          </div>
        </div>
      </div>
    ),
    {
      width: W,
      height: H,
      fonts: [
        { name: "Onest", data: sans, weight: 500, style: "normal" },
        { name: "Noto Serif Display", data: serif, weight: 500, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=86400, immutable" },
    },
  );
}
