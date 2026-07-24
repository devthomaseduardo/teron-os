import fs from 'fs';
import { tenantPaths } from '../platform/tenant-runtime.js';

export function enqueueOwnerMessage(chatId: string, text: string): void {
  const p = tenantPaths();
  let queue: any[] = [];
  try {
    if (fs.existsSync(p.ownerOutbox)) {
      queue = JSON.parse(fs.readFileSync(p.ownerOutbox, 'utf8'));
    }
  } catch (err) {}
  queue.push({ chatId, text, ts: Date.now() });
  fs.writeFileSync(p.ownerOutbox, JSON.stringify(queue, null, 2));
}

export function startOutboxWorker(
  pushText: (chatId: string, text: string) => Promise<void>
): void {
  setInterval(() => {
    const p = tenantPaths();
    if (!fs.existsSync(p.ownerOutbox)) return;
    try {
      const txt = fs.readFileSync(p.ownerOutbox, 'utf8');
      if (!txt.trim()) return;
      const q: any[] = JSON.parse(txt);
      if (q.length === 0) return;
      fs.writeFileSync(p.ownerOutbox, '[]'); // limpa rapido
      for (const msg of q) {
        pushText(msg.chatId, msg.text).catch((err) => {
          console.error('[outbox] fail push', msg.chatId, err.message);
        });
      }
    } catch (e) {
      console.error('[outbox] erro ler fila', e);
    }
  }, 2000);
}
