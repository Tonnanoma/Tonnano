/**
 * Formats a PostgreSQL sequence number into a display Member ID
 * 
 * The sequence number comes directly from PostgreSQL nextval(),
 * guaranteeing uniqueness and preventing race conditions.
 * 
 * Format: TN-XXXXXX (e.g., TN-000510, TN-000511)
 * 
 * @param sequenceNumber - The integer from member_id_seq
 * @returns Formatted Member ID (e.g., TN-000510)
 */
export function formatMemberId(sequenceNumber: number): string {
  const paddedNumber = String(sequenceNumber).padStart(6, '0')
  return `TN-${paddedNumber}`
}

/**
 * Parses a display Member ID to extract the sequence number
 * Inverse operation of formatMemberId
 * 
 * @param memberId - The formatted Member ID (e.g., TN-000510)
 * @returns The sequence number (510), or 0 if invalid format
 */
export function parseMemberId(memberId: string): number {
  const match = memberId.match(/^TN-(\d+)$/)
  return match ? parseInt(match[1], 10) : 0
}
