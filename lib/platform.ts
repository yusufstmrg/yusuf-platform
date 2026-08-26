export const visibilityStates = [
  "private",
  "draft",
  "ready_to_publish",
  "published",
  "archived",
] as const;

export type VisibilityState = (typeof visibilityStates)[number];

export type PlatformArea = "public" | "private";

export type PublicationEntity =
  | "profile"
  | "project"
  | "evidence"
  | "achievement"
  | "skill"
  | "insight"
  | "business";

export const publicSafeStates: VisibilityState[] = ["published"];

/**
 * Public rendering must only receive records explicitly published through the
 * publication workflow. This predicate is intentionally tiny so it can be
 * reused by future repository/database adapters.
 */
export function isPubliclyVisible(state: VisibilityState): boolean {
  return state === "published";
}

export const unifiedPlatform = {
  publicProductName: "Yusuf B. Situmorang",
  publicPositioning: "Finance × Business × AI × Growth",
  philosophy: "Build. Serve. Grow. Give.",
  privateRoutePrefix: "/os",
  publicRoutePrefix: "/",
} as const;
