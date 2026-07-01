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
    const body = await request.json();

    // Validation

    if (!validateRequired(body.firstName)) {
      return NextResponse.json(
        { success: false, error: "First name is required." },
        { status: 400 }
      );
    }

    if (!validateRequired(body.lastName)) {
      return NextResponse.json(
        { success: false, error: "Last name is required." },
        { status: 400 }
      );
    }

    if (!validateRequired(body.country)) {
      return NextResponse.json(
        { success: false, error: "Country is required." },
        { status: 400 }
      );
    }

    if (!validateRequired(body.city)) {
      return NextResponse.json(
        { success: false, error: "City is required." },
        { status: 400 }
      );
    }

    if (!validateRequired(body.phone)) {
      return NextResponse.json(
        { success: false, error: "Phone number is required." },
        { status: 400 }
      );
    }

    if (!validatePhoneNumber(body.phone)) {
      return NextResponse.json(
        { success: false, error: "Invalid phone number." },
        { status: 400 }
      );
    }

    if (!validateRequired(body.email)) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    if (!validateEmail(body.email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Duplicate email

    const { data: existingUser, error: duplicateError } = await supabase
      .from("whitelist_members")
      .select("id")
      .eq("email", body.email.toLowerCase().trim())
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
          first_name: body.firstName.trim(),
          last_name: body.lastName.trim(),
          country: body.country.trim(),
          city: body.city.trim(),
          phone_number: body.phone.trim(),
          email: body.email.toLowerCase().trim(),
          instagram_username: body.instagram?.trim() || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
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
