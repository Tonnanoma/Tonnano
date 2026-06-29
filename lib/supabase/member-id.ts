/**
 * Formats a PostgreSQL sequence number into a display Member ID
 * 
 * The sequence number comes directly from PostgreSQL nextval(),
 * guaranteeing uniqueness and preventing race conditions.
 * 
 * Format: TN-XXXXXX (e.g., TN-000510, TN-000511)
 * 
 * @param sequenceNumber - The integer from member_id_seq (510, 511, 512...)
 * @returns Formatted Member ID (e.g., TN-000510)
 */
export function formatMemberId(sequenceNumber?: number | null): string {
  if (typeof sequenceNumber !== 'number' || Number.isNaN(sequenceNumber)) {
    // Guard: if sequence is missing for any reason, return a neutral placeholder
    // This avoids runtime crashes while keeping the DB sequence as the single source of truth.
    return 'TN-000000'
  }
  const paddedNumber = String(sequenceNumber).padStart(6, '0')
  return `TN-${paddedNumber}`
}
