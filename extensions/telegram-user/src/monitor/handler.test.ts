import { describe, expect, it } from "vitest";
import { buildTelegramUserParentPeer, resolveTelegramUserTimestampMs } from "./handler.js";

describe("resolveTelegramUserTimestampMs", () => {
  it("uses Date values directly", () => {
    const date = new Date("2025-01-02T03:04:05Z");
    expect(resolveTelegramUserTimestampMs(date)).toBe(date.getTime());
  });

  it("converts seconds to milliseconds", () => {
    expect(resolveTelegramUserTimestampMs(1_710_000_000)).toBe(1_710_000_000 * 1000);
  });

  it("passes through millisecond values", () => {
    expect(resolveTelegramUserTimestampMs(1_710_000_000_000)).toBe(1_710_000_000_000);
  });

  it("returns undefined for invalid dates", () => {
    const invalid = new Date("invalid");
    expect(resolveTelegramUserTimestampMs(invalid)).toBeUndefined();
  });
});

describe("buildTelegramUserParentPeer", () => {
  it("returns parent group peer for forum topic messages", () => {
    expect(
      buildTelegramUserParentPeer({
        isGroup: true,
        chatId: -1001234567890,
        threadId: 99,
      }),
    ).toEqual({ kind: "group", id: "-1001234567890" });
  });

  it("returns undefined when thread id is missing", () => {
    expect(
      buildTelegramUserParentPeer({
        isGroup: true,
        chatId: -1001234567890,
      }),
    ).toBeUndefined();
  });

  it("returns undefined for non-group messages", () => {
    expect(
      buildTelegramUserParentPeer({
        isGroup: false,
        chatId: 12345,
        threadId: 99,
      }),
    ).toBeUndefined();
  });
});
