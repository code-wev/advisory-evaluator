import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    console.log("📌 Signup request received");

    const { firstName, lastName, email, password } = await req.json();
    console.log("Received body:", { firstName, lastName, email });

    await connectDB();
    console.log("📌 Database connected");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("⚠️ User already exists");
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("📌 Password hashed");

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    console.log("✅ User created:", newUser._id);

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );

  } catch (error) {
    console.error("🔥 SIGNUP API ERROR:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
