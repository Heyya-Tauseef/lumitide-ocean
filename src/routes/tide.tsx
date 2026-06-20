import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { OceanScene, SiteNav } from "@/components/ocean-scene";
import { releaseBottle, type BottleAnalysis } from "@/lib/lumitide.functions";
import { getRegion, type RegionId } from "@/lib/regions";
import bottleImg from "@/assets/bottle-pastel.png";
import scrollRolled from "@/assets/scroll-rolled.png";
import parchment from "@/assets/parchment.jpg";

export const Route = createFileRoute("/tide")({
  head: () => ({
    meta: [
      { title: "The Tide — Lumitide" },
      {
        name: "description",
        content:
          "Pen a thought on parchment, seal it in a bottle, and let the tide carry it away.",
      },
    ],
  }),
  component: TidePage,
});

type Phase = "compose" | "sailing" | "arriving" | "received";

const PROMPTS = [
  "Warm tea on rainy days.",
  "Someone checking in on me.",
  "Watching clouds drift by.",
  "I'm tired but I'm still here.",
];

/* ---------- Reusable parchment surface ---------- */
function ParchmentSurface({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        backgroundImage: `url(${parchment})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "0.5rem",
        boxShadow:
          "0 30px 60px rgba(74,40,15,0.35), inset 0 0 80px rgba(120,60,20,0.18)",
        ...style,
      }}
    >
      {/* Scroll wooden rods top + bottom */}
      <div
        aria-hidden
        className="absolute -top-3 left-[-2%] right-[-2%] h-6 rounded-full"
        style={{
          background:
            "linear-gradient(180deg,#a36a3a 0%,#6b3d1c 50%,#3d1f0a 100%)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.35)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-3 left-[-2%] right-[-2%] h-6 rounded-full"
        style={{
          background:
            "linear-gradient(180deg,#a36a3a 0%,#6b3d1c 50%,#3d1f0a 100%)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.35)",
        }}
      />
      {children}
    </div>
  );
}

function TidePage() {
  const release = useServerFn(releaseBottle);
  const [message, setMessage] = useState("");
  const [phase, setPhase] = useState<Phase>("compose");
  const [analysis, setAnalysis] = useState<BottleAnalysis | null>(null);
  const [received, setReceived] = useState<{
    message: string;
    region: RegionId;
  } | null>(null);
  const [guardianOpen, setGuardianOpen] = useState(false);
  const [opened, setOpened] = useState(false);

  const mutation = useMutation({
    mutationFn: (text: string) => release({ data: { message: text } }),
    onSuccess: (result) => {
      setAnalysis(result.analysis);
      if (result.analysis.safetyVerdict === "soften") {
        setGuardianOpen(true);
        setPhase("compose");
        return;
      }
      setPhase("sailing");
      window.setTimeout(() => setPhase("arriving"), 2400);
      window.setTimeout(() => {
        setReceived(result.receivedBottle);
        setOpened(false);
        setPhase("received");
      }, 4800);
    },
  });

  function handleRelease() {
    if (!message.trim() || mutation.isPending) return;
    setReceived(null);
    setAnalysis(null);
    setOpened(false);
    mutation.mutate(message.trim());
  }

  function acceptRewrite() {
    if (analysis?.rewriteSuggestion) setMessage(analysis.rewriteSuggestion);
    setGuardianOpen(false);
  }

  function reset() {
    setMessage("");
    setAnalysis(null);
    setReceived(null);
    setOpened(false);
    setPhase("compose");
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-[#1c4e7a]">
      <OceanScene intensity={1} phase={phase} />
      <SiteNav />

      <main className="relative z-20 mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center gap-10 px-5 pt-28 pb-20">
        {phase === "compose" && (
          <ComposeScroll
            message={message}
            setMessage={setMessage}
            onRelease={handleRelease}
            pending={mutation.isPending}
          />
        )}
        {phase === "sailing" && <SailingScene message={message} />}
        {phase === "arriving" && <ArrivingScene />}
        {phase === "received" && received && analysis && (
          <ReceivedScroll
            sentRegion={analysis.region}
            received={received}
            opened={opened}
            onOpen={() => setOpened(true)}
            onAgain={reset}
          />
        )}

        {mutation.isError && (
          <p className="text-sm text-destructive">
            The tide is restless. Please try again in a moment.
          </p>
        )}
      </main>

      

      <GuardianModal
        open={guardianOpen}
        analysis={analysis}
        onClose={() => setGuardianOpen(false)}
        onAccept={acceptRewrite}
      />
    </div>
  );
}

/* ----------------------------- Compose ----------------------------- */

function ComposeScroll({
  message,
  setMessage,
  onRelease,
  pending,
}: {
  message: string;
  setMessage: (v: string) => void;
  onRelease: () => void;
  pending: boolean;
}) {
  const rollingOut = pending;
  return (
    <div className="animate-fade-up w-full max-w-2xl">
      <div className="mb-8 text-center">
        <span
          className="inline-flex -rotate-2 items-center gap-2 px-4 py-1.5 font-mono text-[10px] font-bold tracking-[0.3em] text-[#7a3f2a] uppercase"
          style={{
            background: "linear-gradient(180deg,#fff4dd 0%,#ffe1bd 100%)",
            border: "1.5px dashed rgba(122,63,42,0.35)",
            boxShadow: "2px 4px 0 rgba(122,63,42,0.12)",
          }}
        >
          Pen a thought · seal it · cast it
        </span>
      </div>

      <ParchmentSurface
        className={`px-10 py-12 md:px-14 md:py-14 ${rollingOut ? "animate-scroll-roll-up" : ""}`}
      >
        <div className="relative">
          <h2
            className="font-display text-center text-3xl font-bold italic md:text-4xl"
            style={{ color: "#4a280f" }}
          >
            What would you like to send into the tide?
          </h2>
          <p className="mt-3 text-center text-sm font-semibold text-[#6b3d1c]/80">
            Your message is anonymous. An honest sentence is enough.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => setMessage(p)}
                className="rounded-full border border-[#7a3f2a]/30 bg-[#fff4dd]/80 px-3 py-1 text-xs font-semibold text-[#6b3d1c] hover:bg-[#fff4dd]"
              >
                {p}
              </button>
            ))}
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, 600))}
            placeholder="Dear stranger…"
            className="mt-6 min-h-[180px] w-full resize-none rounded-md border border-[#7a3f2a]/25 bg-[rgba(255,250,235,0.55)] p-5 font-display text-lg italic text-[#3d1f0a] placeholder:text-[#6b3d1c]/40 focus:border-[#7a3f2a]/60 focus:outline-none"
            style={{ boxShadow: "inset 0 2px 8px rgba(120,60,20,0.12)" }}
          />

          <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-[#6b3d1c]/75">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c44569]" />
              Ocean Guardian watching gently
            </span>
            <span>{message.length}/600</span>
          </div>

          <button
            onClick={onRelease}
            disabled={!message.trim() || pending}
            className="mt-7 w-full rounded-full px-6 py-4 text-base font-bold text-white shadow-[0_12px_30px_rgba(122,63,42,0.45)] transition-all hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              background:
                "linear-gradient(110deg,#a3552a 0%,#c44569 50%,#7a3f2a 100%)",
            }}
          >
            {pending ? "Rolling your scroll…" : "🍾 Seal & Cast into the Tide"}
          </button>
        </div>
      </ParchmentSurface>
    </div>
  );
}

/* --------------------------- Sailing / Arriving --------------------------- */

function SailingScene({ message }: { message: string }) {
  return (
    <div className="animate-fade-up flex w-full flex-col items-center justify-end gap-4 pb-10 text-center">
      <img
        src={scrollRolled}
        alt=""
        className="h-28 w-auto animate-float drop-shadow-[0_18px_30px_rgba(74,40,15,0.4)]"
      />
      <p
        className="rounded-full px-6 py-3 font-display text-xl font-bold italic md:text-2xl"
        style={{
          background: "rgba(255,244,221,0.92)",
          color: "#4a280f",
          border: "1.5px solid rgba(122,63,42,0.25)",
          boxShadow: "0 10px 30px rgba(122,63,42,0.18)",
        }}
      >
        A wave carries your bottle out to sea…
      </p>
      {message && (
        <p className="max-w-md rounded-full bg-white/75 px-5 py-2 text-sm font-bold text-[#4a280f]/80 shadow-sm">
          “{message.slice(0, 90)}{message.length > 90 ? "…" : ""}”
        </p>
      )}
    </div>
  );
}

function ArrivingScene() {
  return (
    <div className="animate-fade-up flex w-full flex-col items-center justify-end gap-4 pb-10 text-center">
      <img
        src={bottleImg}
        alt=""
        className="h-28 w-auto animate-float drop-shadow-[0_18px_30px_rgba(28,78,122,0.35)]"
      />
      <p
        className="rounded-full px-6 py-3 font-display text-xl font-bold italic md:text-2xl"
        style={{
          background: "rgba(255,244,221,0.92)",
          color: "#4a280f",
          border: "1.5px solid rgba(122,63,42,0.25)",
          boxShadow: "0 10px 30px rgba(122,63,42,0.18)",
        }}
      >
        A bottle washes onto the shore for you…
      </p>
    </div>
  );
}

/* ----------------------------- Received ----------------------------- */

function ReceivedScroll({
  sentRegion,
  received,
  opened,
  onOpen,
  onAgain,
}: {
  sentRegion: RegionId;
  received: { message: string; region: RegionId };
  opened: boolean;
  onOpen: () => void;
  onAgain: () => void;
}) {
  const recv = getRegion(received.region);
  const sent = getRegion(sentRegion);

  if (!opened) {
    return (
      <div className="animate-fade-up flex w-full flex-col items-center text-center">
        <p className="mb-6 font-mono text-[10px] font-bold tracking-[0.3em] text-[#7a3f2a] uppercase">
          A message from anonymous
        </p>
        <button
          type="button"
          onClick={onOpen}
          className="group relative outline-none"
          aria-label="Open the message"
        >
          <img
            src={scrollRolled}
            alt="Rolled scroll sealed with red wax"
            className="h-64 w-auto animate-scroll-wiggle drop-shadow-[0_24px_40px_rgba(74,40,15,0.45)] transition-transform group-hover:scale-105"
          />
        </button>
        <p
          className="mt-6 rounded-full px-5 py-2 font-display text-lg font-bold italic"
          style={{
            background: "rgba(255,244,221,0.92)",
            color: "#4a280f",
            border: "1.5px solid rgba(122,63,42,0.3)",
            boxShadow: "0 8px 24px rgba(122,63,42,0.2)",
          }}
        >
          ✶ Tap the scroll to unfold ✶
        </p>
        <p className="mt-3 text-xs font-semibold text-[#4a280f]/65">
          drifted in from {recv.emoji} {recv.name}
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-up w-full max-w-2xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-[#7a3f2a] uppercase">
          From the shores of {recv.emoji} {recv.name}
        </span>
        <span className="font-mono text-[10px] tracking-[0.25em] text-[#7a3f2a]/70 uppercase">
          Yours sailed to {sent.emoji} {sent.name}
        </span>
      </div>

      <ParchmentSurface className="animate-scroll-unfold px-10 py-12 md:px-14 md:py-16">
        <div className="text-center">
          <p
            className="font-display text-2xl leading-relaxed italic md:text-3xl"
            style={{ color: "#3d1f0a" }}
          >
            “{received.message}”
          </p>
          <p className="mt-6 font-mono text-[10px] tracking-[0.3em] text-[#7a3f2a]/80 uppercase">
            — Anonymous, somewhere on the tide
          </p>
        </div>
      </ParchmentSurface>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onAgain}
          className="flex-1 rounded-full px-6 py-3 font-bold text-white shadow-[0_10px_28px_rgba(122,63,42,0.4)] transition-all hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95"
          style={{
            background:
              "linear-gradient(110deg,#a3552a 0%,#c44569 50%,#7a3f2a 100%)",
          }}
        >
          Send Another Bottle
        </button>
        <button
          onClick={onAgain}
          className="flex-1 rounded-full border border-[#7a3f2a]/30 bg-[#fff4dd]/85 px-6 py-3 font-bold text-[#4a280f] hover:bg-[#fff4dd]"
        >
          Sail Again
        </button>
      </div>
    </div>
  );
}

/* ----------------------------- Guardian Modal ----------------------------- */

function GuardianModal({
  open,
  analysis,
  onClose,
  onAccept,
}: {
  open: boolean;
  analysis: BottleAnalysis | null;
  onClose: () => void;
  onAccept: () => void;
}) {
  if (!open || !analysis) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#1c4e7a]/40 px-4 py-6 backdrop-blur-md md:items-center">
      <div className="animate-fade-up relative w-full max-w-lg overflow-hidden rounded-[2rem] p-8"
        style={{
          background: "linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(255,243,224,0.92) 100%)",
          border: "1.5px solid rgba(255,255,255,0.9)",
          boxShadow: "0 22px 60px rgba(28,78,122,0.2)",
        }}
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#6fc3b4]/40 bg-[#6fc3b4]/15 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.25em] text-[#2e8a78] uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6fc3b4]" />
          Ocean Guardian
        </div>
        <h3 className="font-display text-2xl font-bold leading-snug italic text-[#1c4e7a] md:text-3xl">
          “This bottle may carry a storm. Would you like to soften its waves before it sets sail?”
        </h3>
        <p className="mt-3 text-sm font-semibold text-[#1c4e7a]/70">
          {analysis.safetyReason}
        </p>

        {analysis.rewriteSuggestion && (
          <div className="mt-5 rounded-2xl border border-[#6fc3b4]/30 bg-[#6fc3b4]/10 p-4">
            <div className="mb-2 font-mono text-[10px] font-bold tracking-[0.25em] text-[#2e8a78] uppercase">
              Suggested rewrite
            </div>
            <p className="text-sm leading-relaxed text-[#1c4e7a]/90 italic">
              “{analysis.rewriteSuggestion}”
            </p>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onAccept}
            className="flex-1 rounded-full bg-[#6fc3b4] py-3 font-bold text-[#1c4e7a] transition-all hover:scale-[1.02] active:scale-95"
          >
            Use this gentler version
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-full border border-[#1c4e7a]/15 bg-white/70 py-3 font-bold text-[#1c4e7a] hover:bg-white"
          >
            Let me edit it myself
          </button>
        </div>
        <p className="mt-4 text-center text-[11px] font-semibold text-[#1c4e7a]/55">
          Your words are yours. The Guardian only ever invites — never blocks.
        </p>
      </div>
    </div>
  );
}



