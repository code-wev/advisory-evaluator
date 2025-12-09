import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { crd } = await req.json();

    const response = await fetch("https://api.sec-api.io/form-adv/firm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.SEC_API_KEY,
      },
      body: JSON.stringify({
        query: `Info.FirmCrdNb:${crd}`,
        size: 1,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data.filings?.[0] || null);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
