/**
 * Mídia — resposta de atendente real, nunca em silêncio.
 */
import type { MediaKind } from '../platform/types.js';
import type { RichMessage } from '../messaging/types.js';


export interface IncomingLike {
  type?: string;
  body?: string;
  caption?: string;
  filename?: string;
  lat?: number | string;
  lng?: number | string;
  selectedRowId?: string;
  selectedButtonId?: string;
}

export function classifyMedia(message: IncomingLike): MediaKind {
  const type = String(message.type || 'chat').toLowerCase();
  const body = (message.body || '').trim();
  const caption = (message.caption || '').trim();

  if (type === 'list_response' || type === 'buttons_response') {
    return { kind: 'list', text: body || caption || '', caption, rawType: type };
  }
  if (type === 'chat' || !type) {
    return { kind: 'text', text: body || caption || '', caption, rawType: type };
  }
  if (type === 'ptt' || type === 'audio') {
    return {
      kind: 'audio',
      text: caption || body || '[áudio]',
      caption,
      rawType: type,
    };
  }
  if (type === 'image') {
    return {
      kind: 'image',
      text: caption || body || '[imagem]',
      caption,
      rawType: type,
    };
  }
  if (type === 'video') {
    return {
      kind: 'video',
      text: caption || body || '[vídeo]',
      caption,
      rawType: type,
    };
  }
  if (type === 'document' || type === 'doc') {
    return {
      kind: 'document',
      text: caption || body || message.filename || '[documento]',
      caption,
      rawType: type,
    };
  }
  if (type === 'sticker') {
    return { kind: 'sticker', text: '[figurinha]', rawType: type };
  }
  if (type === 'location' || type === 'vlocation') {
    return { kind: 'location', text: '[localização]', rawType: type };
  }
  if (type === 'vcard' || type === 'multi_vcard') {
    return { kind: 'contact', text: '[contato]', rawType: type };
  }
  return {
    kind: 'unknown',
    text: body || caption || `[${type}]`,
    caption,
    rawType: type,
  };
}

export function mediaDefaultReply(
  media: MediaKind,
  opts?: { awaitingPayment?: boolean; clientName?: string }
): { text: string; rich: RichMessage } {
  const first = opts?.clientName?.split(' ')[0];
  const oi = first ? `${first}, ` : '';

  if (media.kind === 'audio') {
    const text = `Opa, ${oi}recebi seu áudio 🎧\n\n` +
      `Aqui às vezes o som falha — consegue me mandar em *texto* o que precisa?`;
    return { text, rich: { text, keepTogether: true } };
  }

  if (media.kind === 'image' || media.kind === 'document') {
    const text = `Recebi ${media.kind === 'image' ? 'sua foto' : 'seu arquivo'} 👍\n\n` +
      `Me conta em uma linha o que você precisa.`;
    return { text, rich: { text, keepTogether: true } };
  }

  if (media.kind === 'sticker' || media.kind === 'video') {
    const text = `Haha, recebi 😄\n\nMe fala o que você precisa.`;
    return { text, rich: { text, keepTogether: true } };
  }

  if (media.kind === 'location') {
    const text = `Valeu pela localização 📍\n\nComo posso ajudar?`;
    return { text, rich: { text, keepTogether: true } };
  }

  if (media.kind === 'contact') {
    const text = `Recebi o contato 👍\n\nComo posso ajudar?`;
    return { text, rich: { text, keepTogether: true } };
  }

  const text = `Oi! Me conta como posso te ajudar 👇`;
  return { text, rich: { text, keepTogether: true } };
}

export function isNonTextMedia(media: MediaKind): boolean {
  return !['text', 'list', 'buttons'].includes(media.kind);
}
