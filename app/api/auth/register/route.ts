import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Public registration is disabled. Administrator accounts are pre-configured." },
    { status: 403 }
  );
}
