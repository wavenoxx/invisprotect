export const APPROVED_SERVICE_IDS = [
  "balcony-invisible-grills",
  "staircase-invisible-grills",
  "windows-invisible-grills",
  "child-safety-invisible-grills",
  "balcony-safety-nets",
  "children-safety-nets",
  "staircase-safety-nets",
  "building-safety-nets",
  "construction-safety-nets",
  "industrial-safety-nets",
  "terrace-top-nets",
  "car-parking-safety-nets",
  "pigeon-safety-nets",
  "pigeons-bird-spikes",
  "monkey-safety-nets",
  "mosquito-safety-nets",
  "sports-practice-nets",
  "coconut-safety-nets",
  "swimming-pool-nets",
  "cloth-drying-hangers",
] as const;

export type ServiceId = (typeof APPROVED_SERVICE_IDS)[number];

const approvedServiceIds = new Set<string>(APPROVED_SERVICE_IDS);

export function isApprovedServiceId(value: string): value is ServiceId {
  return approvedServiceIds.has(value);
}
