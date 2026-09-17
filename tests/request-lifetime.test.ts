import assert from "node:assert/strict";
import test from "node:test";

import { registerOrAwaitTask } from "../src/server/request-lifetime.ts";

test("registers notification work with waitUntil without delaying the response", async () => {
  let completeTask: (() => void) | undefined;
  const task = new Promise<void>((resolve) => {
    completeTask = resolve;
  });
  let registered: Promise<unknown> | undefined;

  const strategy = await registerOrAwaitTask(task, (promise) => {
    registered = promise;
  });

  assert.equal(strategy, "deferred");
  assert.ok(registered);
  completeTask?.();
  await registered;
});

test("awaits notification work when waitUntil is unavailable", async () => {
  let completeTask: (() => void) | undefined;
  const task = new Promise<void>((resolve) => {
    completeTask = resolve;
  });
  let settled = false;
  const operation = registerOrAwaitTask(task).then((strategy) => {
    settled = true;
    return strategy;
  });

  await Promise.resolve();
  assert.equal(settled, false);
  completeTask?.();
  assert.equal(await operation, "awaited");
});
