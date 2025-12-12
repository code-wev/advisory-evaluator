import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";


import User from "@/models/User";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  try {
    // 1️⃣ Check session
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2️⃣ Get firm CRD from request
    const { crd } = await req.json();

    if (!crd || isNaN(crd)) {
      return NextResponse.json(
        { error: "Invalid firm CRD" },
        { status: 400 }
      );
    }

    // 3️⃣ Connect DB
    await connectDB();

    // 4️⃣ Find user
   const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // 5️⃣ Toggle save/remove
    const alreadySaved = user.savedFirms.includes(Number(crd));

    if (alreadySaved) {
      user.savedFirms = user.savedFirms.filter(
        (id) => id !== Number(crd)
      );
    } else {
      user.savedFirms.push(Number(crd));
    }

    await user.save();

    // 6️⃣ Success response
    return NextResponse.json({
      success: true,
      action: alreadySaved ? "removed" : "saved",
      savedFirms: user.savedFirms,
    });
  } catch (error) {
    console.error("Save firm error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
