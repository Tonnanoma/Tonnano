export type WhitelistMember = {
  id: string // UUID from Supabase
  first_name: string
  last_name: string
  country: string
  city: string
  phone_number: string
  email: string
  instagram_username: string | null
  member_id_seq: number // Raw sequence number from database (510, 511, 512...)
  created_at: string
}

export type WhitelistFormInput = {
  firstName: string
  lastName: string
  country: string
  city: string
  phone: string
  email: string
  instagram?: string
}

export type WhitelistResponse = {
  success: boolean
  message?: string
  error?: string
  data?: {
    id: string // UUID
    member_id_seq: number // Raw sequence number
    member_id: string // Formatted: TN-000510
  }
}
