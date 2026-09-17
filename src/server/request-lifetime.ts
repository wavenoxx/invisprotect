export type WaitUntil = (promise: Promise<unknown>) => void;

export async function registerOrAwaitTask(
  task: Promise<unknown>,
  waitUntil?: WaitUntil,
): Promise<"deferred" | "awaited"> {
  if (waitUntil) {
    try {
      waitUntil(task);
      return "deferred";
    } catch {
      // Fall back to awaiting the same bounded task when registration is unavailable.
    }
  }

  await task;
  return "awaited";
}
