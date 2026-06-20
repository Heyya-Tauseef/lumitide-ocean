// Shared mood region metadata used across client and server.
export type RegionId =
  | "calm-lagoon"
  | "emerald-bay"
  | "twilight-sea"
  | "deep-ocean"
  | "golden-current"
  | "healing-cove";

export interface Region {
  id: RegionId;
  name: string;
  color: string; // hex
  tailwindColor: string; // token name in styles.css (lagoon, bay, ...)
  emoji: string;
  tone: string;
  description: string;
}

export const REGIONS: Region[] = [
  {
    id: "calm-lagoon",
    name: "Calm Lagoon",
    color: "#93c5fd",
    tailwindColor: "lagoon",
    emoji: "🌊",
    tone: "calm, peaceful",
    description: "A sanctuary for peace and quiet reflection.",
  },
  {
    id: "emerald-bay",
    name: "Emerald Bay",
    color: "#34d399",
    tailwindColor: "bay",
    emoji: "🌱",
    tone: "hopeful, growing",
    description: "Vibrant energy and hopeful beginnings.",
  },
  {
    id: "twilight-sea",
    name: "Twilight Sea",
    color: "#c084fc",
    tailwindColor: "twilight",
    emoji: "🌙",
    tone: "reflective, nostalgic",
    description: "For nostalgia and twilight thoughts.",
  },
  {
    id: "deep-ocean",
    name: "Deep Ocean",
    color: "#3b82f6",
    tailwindColor: "deep",
    emoji: "💙",
    tone: "lonely, overwhelmed, heavy",
    description: "The weight of deep reflection. Safe and intimate.",
  },
  {
    id: "golden-current",
    name: "Golden Current",
    color: "#fde047",
    tailwindColor: "gold",
    emoji: "☀",
    tone: "grateful, joyful, celebratory",
    description: "Celebration and shared warmth.",
  },
  {
    id: "healing-cove",
    name: "Healing Cove",
    color: "#99f6e4",
    tailwindColor: "healing",
    emoji: "✨",
    tone: "healing, comforting, supportive",
    description: "Soft mending and gentle support.",
  },
];

export function getRegion(id: RegionId): Region {
  return REGIONS.find((r) => r.id === id) ?? REGIONS[0];
}

// A small seed pool of supportive replies per region so the receive experience
// always works, even without persisting community bottles yet.
export const SEED_BOTTLES: Record<RegionId, string[]> = {
  "calm-lagoon": [
    "Breathe in. The tide will hold you for as long as you need.",
    "Quiet moments are not empty. They are full of you.",
    "You don't have to do anything to deserve this calm.",
  ],
  "emerald-bay": [
    "Small green shoots are still the whole spring.",
    "Whatever you're building, it's already beginning.",
    "You are allowed to hope, gently and without proof.",
  ],
  "twilight-sea": [
    "It's okay to miss things. Memory is its own kind of love.",
    "The sky between day and night belongs to dreamers like you.",
    "Soft thoughts deserve a soft place to land.",
  ],
  "deep-ocean": [
    "You don't have to figure everything out today. Small steps still move you forward.",
    "Even down here, the water knows your name.",
    "Heavy is not the same as broken. You are still whole.",
  ],
  "golden-current": [
    "Celebrate every victory, no matter how small.",
    "Your light is reaching shores you'll never see. Keep shining.",
    "Joy shared on the tide comes back doubled.",
  ],
  "healing-cove": [
    "Healing isn't linear, but it is happening.",
    "Be as gentle with yourself as you would be with a friend.",
    "You are not behind. You are exactly where mending begins.",
  ],
};
