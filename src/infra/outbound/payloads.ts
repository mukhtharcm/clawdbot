import type { ReplyPayload } from "../../auto-reply/types.js";

export type NormalizedOutboundPayload = {
  text: string;
  mediaUrls: string[];
  audioAsVoice?: boolean;
};

export type OutboundPayloadJson = {
  text: string;
  mediaUrl: string | null;
  mediaUrls?: string[];
  audioAsVoice?: boolean;
};

export function normalizeOutboundPayloads(
  payloads: ReplyPayload[],
): NormalizedOutboundPayload[] {
  return payloads
    .map((payload) => ({
      text: payload.text ?? "",
      mediaUrls:
        payload.mediaUrls ?? (payload.mediaUrl ? [payload.mediaUrl] : []),
      audioAsVoice: payload.audioAsVoice,
    }))
    .filter((payload) => payload.text || payload.mediaUrls.length > 0);
}

export function normalizeOutboundPayloadsForJson(
  payloads: ReplyPayload[],
): OutboundPayloadJson[] {
  return payloads.map((payload) => ({
    text: payload.text ?? "",
    mediaUrl: payload.mediaUrl ?? null,
    mediaUrls:
      payload.mediaUrls ?? (payload.mediaUrl ? [payload.mediaUrl] : undefined),
    audioAsVoice: payload.audioAsVoice,
  }));
}

export function formatOutboundPayloadLog(
  payload: NormalizedOutboundPayload,
): string {
  const lines: string[] = [];
  if (payload.text) lines.push(payload.text.trimEnd());
  for (const url of payload.mediaUrls) lines.push(`MEDIA:${url}`);
  return lines.join("\n");
}
