import { NextResponse } from "next/server";

function buildFeeLabel(item5E = {}) {
  const fees = [];

  if (item5E.Q5E1 === "Y") fees.push("AUM-based");
  if (item5E.Q5E2 === "Y") fees.push("Hourly");
  if (item5E.Q5E3 === "Y") fees.push("Subscription");
  if (item5E.Q5E4 === "Y") fees.push("Fixed");
  if (item5E.Q5E5 === "Y") fees.push("Commission");
  if (item5E.Q5E6 === "Y") fees.push("Performance-based");

  return fees.length ? fees.join(", ") : "Not disclosed";
}

export async function POST(req) {
  try {
    const { crd } = await req.json();

    if (!crd) {
      return NextResponse.json({ error: "Missing CRD" }, { status: 400 });
    }

    const apiKey = process.env.SEC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "SEC_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.sec-api.io/form-adv/firm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify({
        query: `Info.FirmCrdNb:${Number(crd)}`,
        from: 0,
        size: 1,
      }),
    });

    const json = await response.json();
    const filing = json?.filings?.[0] || null;

    if (!filing) {
      return NextResponse.json({ filing: null });
    }

    const item5E = filing?.FormInfo?.Part1A?.Item5E || {};

    return NextResponse.json({
      filing,
      feeType: buildFeeLabel(item5E),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
