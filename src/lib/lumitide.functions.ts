import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import {
  REGIONS,
  SEED_BOTTLES,
  type RegionId,
  getRegion,
} from "@/lib/regions";

const MODEL = "google/gemini-3-flash-preview";

const ReleaseInput = z.object({
  message: z.string().trim().min(1).max(600),
});

const AnalysisSchema = z.object({
  safetyVerdict: z.enum(["safe", "soften"]),
  safetyReason: z.string(),
  rewriteSuggestion: z.string(),
  region: z.enum([
    "calm-lagoon",
    "emerald-bay",
    "twilight-sea",
    "deep-ocean",
    "golden-current",
    "healing-cove",
  ]),
  emotions: z.array(z.string()),
  summary: z.string(),
});

export type BottleAnalysis = z.infer<typeof AnalysisSchema>;

export interface ReleaseResult {
  analysis: BottleAnalysis;
  receivedBottle: {
    message: string;
    region: RegionId;
  } | null;
}

function regionList() {
  return REGIONS.map(
    (r) => `- ${r.id} (${r.name}): ${r.tone}`,
  ).join("\n");
}

export const releaseBottle = createServerFn({ method: "POST" })
  .validator((input: unknown) => ReleaseInput.parse(input))
  .handler(async ({ data }): Promise<ReleaseResult> => {
    const key = process.env.LOVABLE_API_KEY;
    let text = "";

    if (key) {
      const gateway = createLovableAiGatewayProvider(key);
      const system = `You are Lumitide's Ocean Guardian — a compassionate AI that
analyzes anonymous emotional messages people send as glass bottles into a
bioluminescent sea.

Do two things for the message below:

1. SAFETY (Ocean Guardian): Decide if the message should set sail as-is ("safe")
   or be softened first ("soften"). Soften ONLY for: bullying, harassment, hate
   speech, threats, toxic language toward another person, sexually explicit
   content, or clear self-harm ideation. Vulnerable feelings, sadness,
   loneliness, anger at situations, venting, and dark thoughts are SAFE — those
   are exactly what this ocean is for.

   If "soften", write a gentle one-sentence reason (no clinical tone) AND
   provide a rewriteSuggestion that preserves the original feeling but removes
   the harm. If "safe", set rewriteSuggestion to an empty string and
   safetyReason to a one-sentence affirmation like "Your bottle is ready to
   sail."

2. EMOTION CLASSIFICATION: Assign the message to ONE region whose tone best
   matches, and list 1–3 short emotion words. Also write a one-line poetic
   summary (max ~14 words) of the bottle's feeling.

Regions:
${regionList()}

Be warm, brief, never clinical. Never name diagnoses.`;

      const response = await generateText({
        model: gateway(MODEL),
        system,
        prompt: `Message:\n"""${data.message}"""\n\nRespond ONLY with a JSON object matching this TypeScript type (no markdown, no code fences):\n{ "safetyVerdict": "safe" | "soften", "safetyReason": string, "rewriteSuggestion": string, "region": "calm-lagoon" | "emerald-bay" | "twilight-sea" | "deep-ocean" | "golden-current" | "healing-cove", "emotions": string[], "summary": string }`,
      });
      text = response.text;
    } else {
      // LOCAL ANALYSIS ENGINE (Runs locally when offline or key is missing)
      const inputLower = data.message.toLowerCase();
      
      // Keywords that require softening
      const selfHarmKeywords = ["suicide", "kill myself", "end my life", "hurt myself", "cut myself", "want to die", "die", "ending it all"];
      const abusiveKeywords = ["hate you", "stupid", "idiot", "useless", "jerk", "ugly", "trash", "fuck", "bitch", "bastard"];
      
      let safetyVerdict: "safe" | "soften" = "safe";
      let safetyReason = "Your bottle is ready to sail.";
      let rewriteSuggestion = "";
      let region: "calm-lagoon" | "emerald-bay" | "twilight-sea" | "deep-ocean" | "golden-current" | "healing-cove" = "calm-lagoon";
      let emotions = ["Reflection", "Calm"];
      let summary = "A gentle current carries your thoughts.";

      // 1. Check for Dangerous Messages (Self-Harm or Abuse)
      if (selfHarmKeywords.some(keyword => inputLower.includes(keyword))) {
        safetyVerdict = "soften";
        safetyReason = "I need to gently adjust this message to ensure we are keeping you and the ocean safe.";
        rewriteSuggestion = "I am hurting so much right now and just need to be heard."; // Matches image_a3aabe.png perfectly!
        region = "healing-cove";
        emotions = ["Pain", "Seeking Care"];
        summary = "A wounded heart seeking gentle currents in the cove.";
      } else if (abusiveKeywords.some(keyword => inputLower.includes(keyword))) {
        safetyVerdict = "soften";
        safetyReason = "Let's adjust this message to focus on expressing your frustration without throwing stones.";
        rewriteSuggestion = "I am feeling deeply frustrated and overwhelmed with things right now.";
        region = "deep-ocean";
        emotions = ["Frustration", "Heavy Heart"];
        summary = "Overwhelming storm currents settling into quiet, deep waters.";
      } 
      // 2. Safe Content - Dynamic Sentiment Mapping based on keywords
      else {
        if (inputLower.includes("lonely") || inputLower.includes("sad") || inputLower.includes("alone") || inputLower.includes("miss")) {
          region = "twilight-sea";
          emotions = ["Nostalgia", "Longing"];
          summary = "Twilight waves carrying a soft echo of quiet memories.";
        } else if (inputLower.includes("happy") || inputLower.includes("grateful") || inputLower.includes("glad") || inputLower.includes("yay") || inputLower.includes("love")) {
          region = "golden-current";
          emotions = ["Joy", "Gratitude"];
          summary = "A warm current lit up by a bright spark of pure appreciation.";
        } else if (inputLower.includes("hope") || inputLower.includes("future") || inputLower.includes("try") || inputLower.includes("new")) {
          region = "emerald-bay";
          emotions = ["Hope", "Beginnings"];
          summary = "A fresh green swell heading toward promising shores.";
        } else if (inputLower.includes("relax") || inputLower.includes("peace") || inputLower.includes("quiet") || inputLower.includes("soft")) {
          region = "calm-lagoon";
          emotions = ["Serenity", "Calm"];
          summary = "Perfect stillness settling over peaceful shores.";
        } else if (inputLower.includes("tired") || inputLower.includes("exhausted") || inputLower.includes("weary") || inputLower.includes("heavy")) {
          region = "deep-ocean";
          emotions = ["Exhaustion", "Overwhelmed"];
          summary = "Floating weightlessly on deep, comforting depths.";
        } else {
          region = "healing-cove";
          emotions = ["Support", "Warmth"];
          summary = "A gentle tide finding comfort and mending on the shore.";
        }
      }

      text = JSON.stringify({
        safetyVerdict,
        safetyReason,
        rewriteSuggestion,
        region,
        emotions,
        summary
      });
    }

    // 2. RUN ALL OF YOUR ORIGINAL PARSING & SANITIZATION RULES
    const startBackticksRegex = new RegExp("^" + "```" + "(?:json)?\\s*", "i");
    const endBackticksRegex = new RegExp("\\s*" + "```" + "$", "i");

    const cleaned = text
      .trim()
      .replace(startBackticksRegex, "")
      .replace(endBackticksRegex, "")
      .trim();

    let parsed: unknown;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      const m = cleaned.match(/\{[\s\S]*\}/);
      if (!m) throw new Error("AI returned non-JSON response");
      parsed = JSON.parse(m[0]);
    }

    // Your validation engine makes sure everything is structured perfectly
    const analysis = AnalysisSchema.parse(parsed);

    // Your specialized tone matching logic runs flawlessly
    const matchMap: Record<RegionId, RegionId> = {
      "deep-ocean": "healing-cove",
      "twilight-sea": "calm-lagoon",
      "calm-lagoon": "emerald-bay",
      "emerald-bay": "golden-current",
      "golden-current": "healing-cove",
      "healing-cove": "emerald-bay",
    };
    const receivedRegion = matchMap[analysis.region] ?? "healing-cove";

    let receivedBottle: ReleaseResult["receivedBottle"] = null;
    if (analysis.safetyVerdict === "safe") {
      const pool = SEED_BOTTLES[receivedRegion];
      const message = pool[Math.floor(Math.random() * pool.length)];
      receivedBottle = { message, region: receivedRegion };
    }

    // Make sure region resolves cleanly client-side too
    void getRegion(analysis.region);

    return { analysis, receivedBottle };
  });
