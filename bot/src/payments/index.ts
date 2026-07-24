/**
 * Gateway de pagamento da plataforma.
 */
import type { ChargeRequest, ChargeResult, PaymentProviderId } from './types.js';
import {
  loadPaymentConfig,
  paymentProviderSummary,
  savePaymentConfig,
} from './config.js';
import { createMercadoPagoProvider } from './providers/mercado-pago.js';
import { createPixKeyProvider } from './providers/pix-key.js';

export {
  loadPaymentConfig,
  savePaymentConfig,
  paymentProviderSummary,
  bankLabel,
} from './config.js';
export type { PaymentProviderConfig, ChargeResult } from './types.js';
export {
  handleMercadoPagoWebhook,
  createCheckoutPreference,
} from './providers/mercado-pago.js';

