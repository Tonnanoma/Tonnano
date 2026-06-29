import { validateEmail, validatePhoneNumber, validateRequired } from '@/lib/validators'
import { formatMemberId } from '@/lib/supabase/member-id'
import { supabase } from '@/lib/supabase/client'
import { WhitelistFormInput, WhitelistResponse } from '@/lib/supabase/types'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

/**
 * POST /api/whitelist
 *
 * Handles whitelist form submissions with:
 * - Server-side validation
 * - Duplicate email prevention
 * - PostgreSQL sequence-based Member ID (atomic, race-condition safe)
 * - Supabase integration
 *
 * The database generates member_id_seq via nextval('member_id_seq')
 * This ensures uniqueness without application-level counting or race conditions.
 */
export async function POST(request: NextRequest): Promise<NextResponse<WhitelistResponse>> {
  try {
    const body: WhitelistFormInput = await request.json()

    // === VALIDATION ===

    if (!validateRequired(body.firstName)) {
      return NextResponse.json(
        { success: false, error: 'First name is required.' },
        { status: 400 }
      )
    }

    if (!validateRequired(body.lastName)) {
      return NextResponse.json(
        { success: false, error: 'Last name is required.' },
        { status: 400 }
      )
    }

    if (!validateRequired(body.country)) {
      return NextResponse.json(
        { success: false, error: 'Country is required.' },
        { status: 400 }
      )
    }

    if (!validateRequired(body.city)) {
      return NextResponse.json(
        { success: false, error: 'City is required.' },
        { status: 400 }
      )
    }

    if (!validateRequired(body.phone)) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required.' },
        { status: 400 }
      )
    }

    if (!validatePhoneNumber(body.phone)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid phone number.' },
        { status: 400 }
      )
    }

    if (!validateRequired(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Email address is required.' },
        { status: 400 }
      )
    }

    if (!validateEmail(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    // === DUPLICATE EMAIL CHECK ===

    const { data: existingUser, error: queryError } = await supabase
      .from('whitelist_members')
      .select('email')
      .eq('email', body.email.toLowerCase())
      .single()

    if (queryError && queryError.code !== 'PGRST116') {
      console.error('[Whitelist API] Database query error:', queryError)
      return NextResponse.json(
        { success: false, error: 'An error occurred. Please try again.' },
        { status: 500 }
      )
    }

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'This email address is already registered.',
        },
        { status: 409 }
      )
    }

    // === INSERT WITH DATABASE-GENERATED MEMBER ID ===
    // The member_id_seq column uses DEFAULT nextval('member_id_seq')
    // This is atomic at the database level and prevents race conditions
    // even with thousands of concurrent requests

    const { data, error: insertError } = await supabase
      .from('whitelist_members')
      .insert([
        {
          first_name: body.firstName.trim(),
          last_name: body.lastName.trim(),
          country: body.country.trim(),
          city: body.city.trim(),
          phone_number: body.phone.trim(),
          email: body.email.toLowerCase().trim(),
          instagram_username: body.instagram?.trim() || null,
          // member_id_seq is NOT set here - database uses DEFAULT nextval('member_id_seq')
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (insertError) {
      console.error('[Whitelist API] Supabase insert error:', insertError)
      return NextResponse.json(
        { success: false, error: 'Failed to submit form. Please try again.' },
        { status: 500 }
      )
    }

    // Format the raw sequence number into TN-XXXXXX format for display
    const formattedMemberId = formatMemberId(data.member_id_seq)

    return NextResponse.json(
      {
        success: true,
        message: 'Welcome to TONNANO Inner Code!',
        data: {
          id: data.id,
          member_id_seq: data.member_id_seq,
          member_id: formattedMemberId,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[Whitelist API] Unexpected error:', error)
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
