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

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location") || "";

    const apiKey = process.env.SEC_API_KEY;

    const query = `
      MainAddr.State:${location.toUpperCase()} 
      OR MainAddr.City:"${location.toUpperCase()}" 
      OR MainAddr.PostlCd:${location}
    `;

    const response = await fetch("https://api.sec-api.io/form-adv/firm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify({
        query,
        size: 20,
      }),
    });

    const json = await response.json();
    const filings = json.filings || [];

    const firms = filings.map((item) => ({
      crd: item.Info?.FirmCrdNb,
      name: item.Info?.LegalNm || "Unknown Firm",
      cityState: `${item.MainAddr?.City || ""}, ${item.MainAddr?.State || ""}`,
      firmSize: item.FormInfo?.Part1A?.Item5F?.Q5F2C || "N/A",
      avgClientBalance: item.FormInfo?.Part1A?.Item5F?.Q5F2A || "N/A",
      keyService:
        item.FormInfo?.Part1A?.Item5G?.Q5G1 === "Y"
          ? "Financial Planning"
          : "Advisory Services",
      averageFee: buildFeeLabel(item.FormInfo?.Part1A?.Item5E),
      logo: "/avatar.png",
    }));

    return NextResponse.json({ firms });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
