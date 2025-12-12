import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import User from "@/models/User";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findById(session.user.id).select("savedFirms");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      savedFirms: user.savedFirms || [],
    });
  } catch (error) {
    console.error("FETCH SAVED FIRMS ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
