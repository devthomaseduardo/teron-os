/**
 * Cliente API tipado para o ecossistema Teron OS Bot.
 * Conecta o frontend React ao backend HTTP do Bot (porta 8787 ou /api).
 */

const BOT_API_BASE =
  import.meta.env.VITE_BOT_API_URL ||
  (typeof window !== 'undefined' && window.location.port === '3005'
    ? 'http://localhost:8787'
    : '');

export interface TenantMeta {
  id: string;
  name: string;
  nicheId: string;
  plan: 'starter' | 'pro' | 'business';
  status: 'provisioning' | 'qr_pending' | 'live' | 'suspended';
  createdAt: string;
  slug: string;
  ownerName?: string;
  ownerEmail?: string;
  ownerPassword?: string;
  ownerToken?: string;
  whatsappPhone?: string;
}

export interface NicheInfo {
  id: string;
  name: string;
  description: string;
}

export interface NicheLabels {
  nicheId: string;
  business: string;
  professional: string;
  professionals: string;
  service: string;
  services: string;
  booking: string;
  bookings: string;
  queue: string;
  client: string;
  clients: string;
  dayReport: string;
  daySchedule: string;
  urgency: string;
}

export interface PlatformConfig {
  platformName: string;
  supportEmail: string;
  defaultNiche: string;
  tenants: TenantMeta[];
  settings: {
    noShowGraceMin: number;
    unpaidRemindHours: number;
    maxTenants: number;
    panelUrl: string;
    adminUrl: string;
  };
}

export interface WaStatus {
  state: 'online' | 'qr' | 'offline' | 'unknown';
  session: string;
  detail: string;
  updatedAt?: string;
  qrDataUrl?: string;
  qrWebUrl?: string;
}

export interface ShopConfig {
  shop: {
    name: string;
    phone: string;
    address: string;
    pixKey: string;
    pixName: string;
    lat?: number;
    lng?: number;
    slotMinutes?: number;
    daysOpen?: number[];
  };
  services: Array<{
    id: string;
    name: string;
    price: number;
    durationMin: number;
    category?: string;
  }>;
  barbers: Array<{
    id: string;
    name: string;
    nickname: string;
    specialty: string;
    schedule: Record<string, [string, string]>;
    onDuty?: boolean;
    avatar?: string;
  }>;
}

export interface Appointment {
  id: string;
  chatId: string;
  clientName: string;
  serviceId: string;
  serviceName: string;
  barberId: string;
  barberName: string;
  date: string;
  time: string;
  price: number;
  status:
    | 'booked'
    | 'awaiting_payment'
    | 'paid'
    | 'checked_in'
    | 'waiting'
    | 'in_service'
    | 'done'
    | 'rated'
    | 'cancelled'
    | 'no_show';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  sender: 'client' | 'bot' | 'owner';
  text: string;
  timestamp: string;
}

function getAdminToken(): string {
  if (typeof window === 'undefined') return 'admin-dev';
  return (
    localStorage.getItem('admin_token') ||
    localStorage.getItem('panel_token') ||
    'admin-dev'
  );
}

function getOwnerToken(): string {
  if (typeof window === 'undefined') return 'teron-dev';
  return localStorage.getItem('panel_token') || 'teron-dev';
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  tokenType: 'admin' | 'owner' = 'owner'
): Promise<T> {
  const token = tokenType === 'admin' ? getAdminToken() : getOwnerToken();
  const url = `${BOT_API_BASE}${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => res.statusText);
    throw new Error(errorText || `Erro na requisição HTTP ${res.status}`);
  }

  return res.json();
}

// ── Funções da API ──

export async function loginTenantOwner(identifier: string, secret: string) {
  const url = `${BOT_API_BASE}/api/auth/login`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password: secret }),
  });
  if (!res.ok) throw new Error('Credenciais inválidas');
  return res.json() as Promise<{
    ok: boolean;
    tenant: TenantMeta;
    token: string;
    role: string;
  }>;
}

export async function fetchPlatformOverview() {
  return request<{
    platform: PlatformConfig;
    health: {
      logExists: boolean;
      logAgeSec: number | null;
      sessionDir: boolean;
      appointments: number;
    };
    niches: NicheInfo[];
    liveTenant: {
      shop: ShopConfig['shop'];
      services: number;
      barbers: number;
      today: number;
      ticketsOpen: number;
      ratingAvg: number;
      ratingCount: number;
    };
  }>('/api/admin/overview', {}, 'admin');
}

export async function fetchNiches(): Promise<{ niches: NicheInfo[] }> {
  return request('/api/niches');
}

export async function fetchNicheLabels(nicheId: string): Promise<NicheLabels> {
  return request(`/api/niche-labels?nicheId=${encodeURIComponent(nicheId)}`);
}

export async function createTenant(data: {
  name: string;
  slug: string;
  ownerName?: string;
  ownerEmail?: string;
  ownerPassword?: string;
  nicheId: string;
  plan: 'starter' | 'pro' | 'business';
}) {
  return request<{
    tenant: TenantMeta;
    setupUrl: string;
    accessToken: string;
    message: string;
    platform: PlatformConfig;
  }>(
    '/api/admin/tenants',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    'admin'
  );
}

export async function updateTenant(id: string, patch: Partial<TenantMeta>) {
  return request<{ tenant: TenantMeta }>(
    `/api/admin/tenants/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(patch),
    },
    'admin'
  );
}

export async function deleteTenant(id: string) {
  return request<{ ok: boolean; message: string; platform: PlatformConfig }>(
    `/api/admin/tenants/${id}`,
    { method: 'DELETE' },
    'admin'
  );
}

export async function fetchShopConfig(): Promise<ShopConfig> {
  return request('/api/admin/shop-config', {}, 'owner');
}

export async function saveShopConfig(config: Partial<ShopConfig>) {
  return request<ShopConfig>(
    '/api/setup/shop',
    {
      method: 'POST',
      body: JSON.stringify(config),
    },
    'owner'
  );
}

export async function fetchWaStatus(): Promise<WaStatus> {
  return request('/api/wa/status', {}, 'owner');
}

export async function fetchMessages(chatId?: string): Promise<{ messages: ChatMessage[]; count: number }> {
  const query = chatId ? `?chatId=${encodeURIComponent(chatId)}` : '';
  return request(`/api/messages${query}`, {}, 'owner');
}

export async function sendOwnerMessage(chatId: string, text: string) {
  return request<{ ok: boolean; queued: boolean }>(
    '/api/teron/send-message',
    {
      method: 'POST',
      body: JSON.stringify({ chatId, text }),
    },
    'owner'
  );
}

export async function fetchOwnerDashboard() {
  return request<{
    shop: ShopConfig['shop'];
    labels: NicheLabels;
    dayReport: {
      date: string;
      total: number;
      upcoming: number;
      inQueue: number;
      inService: number;
      waiting: number;
      completed: number;
      noShow: number;
      cancelled: number;
      payPending: number;
      revenuePaid: number;
      revenuePending: number;
      avgTicket: number;
      ticketsOpen: number;
    };
  }>('/api/me', {}, 'owner');
}
