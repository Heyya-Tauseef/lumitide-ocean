import { createFileRoute, Link } from "@tanstack/react-router";
import { OceanScene, SiteNav } from "@/components/ocean-scene";
import bottleImg from "@/assets/bottle-pastel.png";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Begin your journey — Lumitide" },
      {
        name: "description",
        content:
          "No signup, no login, no email. Just step into the tide and begin.",
      },
    ],
  }),
  component: OnboardingPage,
});

function OnboardingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-[#1c4e7a]">
      <OceanScene intensity={0.95} />
      <SiteNav />

      <main className="relative z-20 flex min-h-screen items-center justify-center px-6 py-24">
        <div
          className="animate-fade-up relative w-full max-w-lg overflow-hidden rounded-[2.5rem] p-10 text-center md:p-14"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(255,243,224,0.88) 100%)",
            border: "1.5px solid rgba(255,255,255,0.9)",
            boxShadow: "0 22px 60px rgba(28,78,122,0.14)",
          }}
        >
          <img
            src={bottleImg}
            alt="A softly glowing glass bottle"
            width={400}
            height={600}
            className="animate-float mx-auto h-56 w-auto"
          />
          <p className="font-display mt-6 text-balance text-2xl font-bold leading-relaxed italic text-[#1c4e7a] md:text-3xl">
            “The sea remembers nothing forever, but every feeling matters for a
            moment.”
          </p>
          <div className="mt-10 flex flex-col items-center gap-3">
            <Link
              to="/tide"
              className="w-full rounded-full px-8 py-4 font-bold text-white shadow-[0_14px_40px_rgba(231,111,81,0.45)] transition-all hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95"
              style={{
                background:
                  "linear-gradient(110deg,#f4a87e 0%,#e8748c 50%,#c9a0e6 100%)",
              }}
            >
              Begin Journey
            </Link>
            <p className="text-xs font-semibold tracking-wide text-[#1c4e7a]/55">
              No signup. No login. No email. Just you and the sea.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
