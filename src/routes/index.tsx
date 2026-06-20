import { createFileRoute, Link } from "@tanstack/react-router";
import { OceanScene, SiteNav, SiteFooter } from "@/components/ocean-scene";
import { REGIONS } from "@/lib/regions";
import bottleShore from "@/assets/bottle-shore.jpg";
import shoreCollage from "@/assets/shore-collage.jpg";
import landingBottle from "@/assets/landing-bottle.jpg";
import shellsFoam from "@/assets/shells-foam.jpg";
import bottleImg from "@/assets/bottle-pastel.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumitide — Where gentle thoughts drift beyond the horizon" },
      {
        name: "description",
        content:
          "Anonymous AI-powered mental wellness. Send a bottle across a sunlit sea and receive one back from a kindred soul.",
      },
      { property: "og:title", content: "Lumitide" },
      {
        property: "og:description",
        content:
          "Send a comforting thought. Receive one in return. AI-matched emotional support, no signups, no identities.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-[#1c4e7a]">
      <OceanScene />
      <SiteNav />

      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 pt-28 pb-16 text-center">
        <div className="animate-fade-up max-w-4xl">
          {/* tape-on-paper label, slightly tilted */}
          <span
            className="mb-8 inline-flex -rotate-2 items-center gap-2 px-5 py-2 font-mono text-[10px] font-bold tracking-[0.3em] text-[#7a3f2a] uppercase"
            style={{
              background:
                "linear-gradient(180deg,#fff4dd 0%,#ffe1bd 100%)",
              border: "1.5px dashed rgba(122,63,42,0.35)",
              boxShadow: "2px 4px 0 rgba(122,63,42,0.12)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#e8748c]" />
            A quiet, anonymous shore
          </span>

          <h1
            className="font-display text-balance text-5xl leading-[1.02] font-bold italic sm:text-7xl md:text-[5.5rem]"
            style={{
              color: "#1c4e7a",
              textShadow:
                "0 2px 0 rgba(255,255,255,0.7), 0 6px 28px rgba(255,255,255,0.5)",
            }}
          >
            Where gentle thoughts
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(110deg,#2e6a9b 0%,#1c4e7a 55%,#2e8a78 100%)",
              }}
            >
              drift beyond the horizon.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-lg font-semibold leading-relaxed text-[#1c4e7a]/85 md:text-xl">
            Slip a thought into a bottle. Let the tide carry it. Receive one
            back from a stranger who feels what you feel.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/onboarding"
              className="group relative rounded-full px-12 py-5 text-base font-bold text-white shadow-[0_14px_40px_rgba(231,111,81,0.55)] transition-all hover:-translate-y-0.5 hover:scale-[1.03] active:scale-95"
              style={{
                background:
                  "linear-gradient(110deg,#f4a87e 0%,#e8748c 50%,#c9a0e6 100%)",
              }}
            >
              <span className="relative z-10 tracking-wide">
                ✶ Send a Bottle
              </span>
              <span
                aria-hidden
                className="absolute inset-0 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(110deg,#e76f51 0%,#c9466b 50%,#9a5fb8 100%)",
                }}
              />
            </Link>
          </div>
        </div>

        {/* offset floating thumbnails — collaged, hand-placed feel */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-44 md:block">
          <img
            src={bottleShore}
            alt=""
            loading="lazy"
            width={300}
            height={400}
            className="absolute bottom-6 left-[5%] h-36 w-28 -rotate-6 rounded-2xl object-cover shadow-[0_18px_40px_rgba(28,78,122,0.25)] ring-4 ring-white/80"
          />
          <img
            src={shellsFoam}
            alt=""
            loading="lazy"
            width={300}
            height={300}
            className="absolute bottom-12 left-[28%] h-28 w-28 rotate-[8deg] rounded-2xl object-cover shadow-[0_18px_40px_rgba(28,78,122,0.25)] ring-4 ring-white/80"
          />
          <img
            src={shoreCollage}
            alt=""
            loading="lazy"
            width={300}
            height={300}
            className="absolute bottom-10 right-[6%] h-32 w-32 rotate-3 rounded-2xl object-cover shadow-[0_18px_40px_rgba(28,78,122,0.25)] ring-4 ring-white/80"
          />
        </div>
      </section>

      {/* ───────────────────────── Mood Regions ───────────────────────── */}
      <section
        id="regions"
        className="relative z-20 px-6 py-28 md:py-36"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold tracking-[0.32em] text-[#e76f51] uppercase">
                ✷  Emotional Geography
              </span>
              <h2 className="mt-3 font-display text-4xl font-bold italic text-[#1c4e7a] md:text-5xl">
                Six regions, one tide.
              </h2>
            </div>
            <p className="max-w-sm font-medium text-[#1c4e7a]/75">
              AI reads the heart of each bottle and sets it adrift in the
              waters that match its feeling.
            </p>
          </div>

          {/* equal-spacing bento grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-7">
            {REGIONS.map((r, i) => (
              <div
                key={r.id}
                className="group relative rounded-[1.75rem] p-7 transition-all hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(255,243,224,0.85) 100%)",
                  border: "1.5px solid rgba(255,255,255,0.9)",
                  boxShadow:
                    "0 18px 40px rgba(28,78,122,0.10), inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
                    style={{
                      background: `${r.color}22`,
                      boxShadow: `inset 0 0 0 1.5px ${r.color}55, 0 6px 18px ${r.color}33`,
                    }}
                  >
                    {r.emoji}
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[#1c4e7a]/40 uppercase">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold italic text-[#1c4e7a]">
                  {r.name}
                </h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-[#1c4e7a]/70">
                  {r.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── AI Features ───────────────────────── */}
      <section id="ai" className="relative z-20 px-6 py-28 md:py-36">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16">
            {/* image stack — overlapping, slightly tilted */}
            <div className="relative h-[520px]">
              <img
                src={landingBottle}
                alt="A bottle on warm wet sand"
                width={800}
                height={1000}
                loading="lazy"
                className="absolute left-2 top-0 h-[78%] w-[78%] -rotate-3 rounded-[2rem] object-cover shadow-[0_20px_50px_rgba(28,78,122,0.22)] ring-4 ring-white/85"
              />
              <img
                src={shellsFoam}
                alt="Starfish and shells resting on warm sand"
                width={600}
                height={800}
                loading="lazy"
                className="absolute right-0 bottom-0 h-[55%] w-[58%] rotate-3 rounded-[1.75rem] object-cover shadow-[0_20px_50px_rgba(28,78,122,0.22)] ring-4 ring-white/85"
              />
              <span
                className="absolute -bottom-4 left-8 -rotate-3 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.25em] text-[#7a3f2a] uppercase"
                style={{
                  background: "#fff4dd",
                  border: "1.5px dashed rgba(122,63,42,0.35)",
                }}
              >
                Field notes from the shore
              </span>
            </div>

            <div
              className="space-y-8 rounded-[2rem] p-8 md:p-10"
              style={{
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(18px) saturate(150%)",
                WebkitBackdropFilter: "blur(18px) saturate(150%)",
                border: "1.5px solid rgba(255,255,255,0.75)",
                boxShadow: "0 18px 50px rgba(28,78,122,0.14), inset 0 1px 0 rgba(255,255,255,0.85)",
              }}
            >
              <Feature
                index="01"
                kicker="Core Innovation"
                title="Emotion Classification"
                body="Our AI senses the heart behind your words, guiding your bottle to its natural home among kindred spirits."
              />
              <Feature
                index="02"
                kicker="Safety First"
                title="Ocean Guardian"
                body="A compassionate sentinel that keeps the tides gentle — softening storms before they set sail, never with blame, always with care."
              />
              <Feature
                index="03"
                kicker="The Collective"
                title="Emotional Matching"
                body="Not random. AI pairs your bottle with one that offers exactly the comfort, gratitude, or hope you need to receive."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Guardian quote ───────────────────────── */}
      <section
        id="guardian"
        className="relative z-20 px-6 py-28 md:py-36"
      >
        <div className="mx-auto max-w-2xl">
          <div
            className="relative overflow-hidden rounded-[2.5rem] p-12 text-center md:p-16"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(214,239,234,0.88) 100%)",
              border: "1.5px solid rgba(255,255,255,0.9)",
              boxShadow: "0 22px 60px rgba(28,78,122,0.14)",
            }}
          >
            <div
              className="absolute -top-24 -left-24 h-48 w-48 rounded-full opacity-60 blur-3xl"
              style={{ background: "rgba(111,195,180,0.45)" }}
            />
            <div className="relative">
              <img
                src={bottleImg}
                alt=""
                width={120}
                height={180}
                loading="lazy"
                className="animate-float mx-auto mb-6 h-28 w-auto"
              />
              <p className="font-display text-2xl font-bold leading-relaxed text-[#1c4e7a] italic md:text-3xl">
                “This bottle may carry a storm. Would you like to soften its
                waves before it sets sail?”
              </p>
              <p className="mt-6 text-sm font-semibold text-[#1c4e7a]/65">
                The Ocean Guardian helps find gentler words when emotions run
                high — never blocking, always inviting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Footer (shared) ───────────────────────── */}
      <SiteFooter />
    </div>
  );
}

function Feature({
  index,
  kicker,
  title,
  body,
}: {
  index: string;
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-5">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-mono text-xs font-bold text-[#1c4e7a]"
        style={{
          background: "rgba(255,255,255,0.85)",
          border: "1.5px solid rgba(28,78,122,0.15)",
          boxShadow: "0 6px 18px rgba(28,78,122,0.1)",
        }}
      >
        {index}
      </div>
      <div>
        <div className="mb-1 font-mono text-[10px] font-bold tracking-[0.28em] text-[#e76f51] uppercase">
          {kicker}
        </div>
        <h3 className="mb-2 font-display text-2xl font-bold italic text-[#1c4e7a]">
          {title}
        </h3>
        <p className="text-pretty text-sm font-medium leading-relaxed text-[#1c4e7a]/75">
          {body}
        </p>
      </div>
    </div>
  );
}
