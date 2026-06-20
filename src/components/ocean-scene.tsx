import { Link } from "@tanstack/react-router";
const beachVideo = "/beach-loop.mp4";
const beachPoster = "/beach-ref.jpg";
import logoMark from "@/assets/lumitide-mark.png";
import bottleImg from "@/assets/bottle-pastel.png";

/**
 * Photorealistic animated shoreline backdrop, zoomed-out to show the full
 * frame on every viewport. The pastel radial gradient fills any space around
 * the video so wide / tall screens don't look cropped.
 */
export function OceanScene({
  intensity = 1,
  phase = "compose",
}: {
  intensity?: number;
  phase?: "compose" | "sailing" | "arriving" | "received";
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ocean-scene ocean-scene--${phase}`}
      style={{ opacity: intensity }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #ffe8c9 0%, #ffd9b8 30%, #f9c9b0 60%, #f6b59a 100%)",
        }}
      />

      <video
        className="absolute inset-0 h-full w-full"
        style={{ objectFit: "cover", objectPosition: "center 65%" }}
        src={beachVideo}
        poster={beachPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="absolute inset-x-0 top-0 h-[22%] bg-[linear-gradient(180deg,rgba(255,232,201,1)_0%,rgba(255,232,201,0.55)_55%,rgba(255,232,201,0)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,247,235,0.10)_0%,rgba(255,247,235,0)_30%,rgba(255,237,214,0.16)_100%)]" />

      {(phase === "sailing" || phase === "arriving") && (
        <img
          src={bottleImg}
          alt=""
          className={`absolute left-1/2 bottom-[20%] h-32 w-auto drop-shadow-[0_18px_24px_rgba(31,88,111,0.25)] ${
            phase === "sailing" ? "animate-background-bottle-out" : "animate-background-bottle-in"
          }`}
        />
      )}
    </div>
  );
}

export function SiteNav() {
  return (
    <nav className="fixed top-4 left-4 z-50 md:top-6 md:left-8">
      <Link
        to="/"
        className="group relative flex items-center gap-3 rounded-2xl px-4 py-2.5 transition-transform hover:-rotate-1"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(255,232,201,0.88) 100%)",
          border: "1.5px solid rgba(255,255,255,0.9)",
          boxShadow:
            "0 10px 30px rgba(244,168,126,0.25), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        <span
          className="absolute -inset-px -z-10 rounded-2xl opacity-60 blur-md"
          style={{ background: "linear-gradient(135deg,#f4a87e,#6fc3b4)" }}
        />
        <img
          src={logoMark}
          alt=""
          className="h-8 w-8 drop-shadow-[0_2px_4px_rgba(31,88,111,0.18)]"
        />
        <span className="font-display text-2xl font-bold italic tracking-tight text-[#1c4e7a]">
          Lumitide
        </span>
      </Link>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer
      className="relative z-20 mt-12 px-6 pt-16 pb-6 text-center"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,232,201,0) 0%, #ffe8c9 22%, #ffd1c0 60%, #f4b8d0 100%)",
      }}
    >
      <div className="mx-auto max-w-2xl">
        <h2
          className="font-display text-3xl font-bold italic md:text-4xl"
          style={{ color: "#7a2f4f" }}
        >
          Ready to let your thoughts drift?
        </h2>
        <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/onboarding"
            className="rounded-full px-10 py-4 font-bold text-white shadow-[0_14px_40px_rgba(231,111,81,0.55)] transition-all hover:-translate-y-0.5 hover:scale-[1.03] active:scale-95"
            style={{
              background:
                "linear-gradient(110deg,#f4a87e 0%,#e8748c 50%,#c9a0e6 100%)",
            }}
          >
            ✶ Launch a Bottle
          </Link>
          <p className="text-sm font-bold tracking-wide text-[#7a2f4f]/75">
            No accounts. No identities. Just feelings.
          </p>
        </div>
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-between gap-3 border-t border-[#7a2f4f]/15 pt-5 md:flex-row">
          <div className="font-display text-lg font-bold italic text-[#7a2f4f]">
            Lumitide
          </div>
          <div className="font-mono text-[10px] tracking-[0.25em] text-[#7a2f4f]/55">
            © 2026 Emotional Ocean Ecosystem
          </div>
        </div>
      </div>
    </footer>
  );
}
