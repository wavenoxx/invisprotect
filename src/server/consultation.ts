/**
 * Server Consultation Adapter — Consolidated entrypoint.
 * Re-exports the primary server function implementation from '@/functions/consultation'.
 */
export {
  ConsultationInputSchema,
  submitConsultationServerFn,
  type ConsultationInput,
  type ConsultationResponse,
} from "@/functions/consultation";
