import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";
import {
  validateEmail,
  validatePhoneNumber,
  validateRequired,
} from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const honeypot = typeof body.website === 'string' ? body.website.trim() : ''
    if (honeypot) {
      return NextResponse.json({ success: false, error: 'Unable to process request.' }, { status: 400 })
    }

    const limit = (value: unknown, max: number) =>
      typeof value === 'string' ? value.trim().slice(0, max) : ''
    const firstName = limit(body.firstName, 80)
    const lastName = limit(body.lastName, 80)
    const country = limit(body.country, 80)
    const city = limit(body.city, 80)
    const phone = limit(body.phone, 40)
    const email = limit(body.email, 254).toLowerCase()
    const instagram = limit(body.instagram, 80)

    // Validation

    if (!validateRequired(firstName)) {
      return NextResponse.json(
        { success: false, error: "First name is required." },
        { status: 400 }
      );
    }

    if (!validateRequired(lastName)) {
      return NextResponse.json(
        { success: false, error: "Last name is required." },
        { status: 400 }
      );
    }

    if (!validateRequired(country)) {
      return NextResponse.json(
        { success: false, error: "Country is required." },
        { status: 400 }
      );
    }

    if (!validateRequired(city)) {
      return NextResponse.json(
        { success: false, error: "City is required." },
        { status: 400 }
      );
    }

    if (!validateRequired(phone)) {
      return NextResponse.json(
        { success: false, error: "Phone number is required." },
        { status: 400 }
      );
    }

    if (!validatePhoneNumber(phone)) {
      return NextResponse.json(
        { success: false, error: "Invalid phone number." },
        { status: 400 }
      );
    }

    if (!validateRequired(email)) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Duplicate email

    if (!supabase) {
      return NextResponse.json({ success: false, error: 'The membership service is unavailable.' }, { status: 503 })
    }

    const { data: existingUser, error: duplicateError } = await supabase
      .from("whitelist_members")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (duplicateError) {
      console.error("Duplicate check error:", duplicateError);

      return NextResponse.json(
        {
          success: false,
          error: "Database error.",
        },
        {
          status: 500,
        }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "This email is already registered.",
        },
        {
          status: 409,
        }
      );
    }

    // Insert

    const { data, error } = await supabase
      .from("whitelist_members")
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          country,
          city,
          phone_number: phone,
          email,
          instagram_username: instagram || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);

      return NextResponse.json(
        {
          success: false,
          error: "Unable to complete your request right now.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Welcome to TONNANO.",
        data: {
          id: data.id,
          email: data.email,
          created_at: data.created_at,
          member_id: `TN-${String(data.member_id_seq).padStart(6, '0')}`,
          member_id_seq: data.member_id_seq,
        },
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: "Unexpected server error.",
      },
      {
        status: 500,
      }
    );
  }
}
