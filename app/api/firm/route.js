// app/api/firm/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { crd } = await req.json();

    if (!crd) {
      return NextResponse.json(
        { error: "Missing CRD number in request body" },
        { status: 400 }
      );
    }

    const apiKey = process.env.SEC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "SEC_API_KEY is not set in environment" },
        { status: 500 }
      );
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: apiKey, // or `Token ${apiKey}` if your account requires that
    };

    // ---------- 1) MAIN ADV FIRM FILING ----------
    const firmBody = {
      query: `Info.FirmCrdNb:${crd}`,
      from: 0,
      size: 1,
      sort: [{ "Info.FirmCrdNb": { order: "desc" } }],
    };

    const baseUrl = "https://api.sec-api.io/form-adv";

    const [
      firmRes,
      scheduleARes,
      scheduleBRes,
      schedD1BRes,
      schedD5KRes,
      schedD7ARes,
      schedD7BRes,
      brochureRes,
    ] = await Promise.all([
      fetch(`${baseUrl}/firm`, {
        method: "POST",
        headers,
        body: JSON.stringify(firmBody),
      }),
      fetch(`${baseUrl}/schedule-a-direct-owners/${crd}?token=${apiKey}`),
      fetch(`${baseUrl}/schedule-b-indirect-owners/${crd}?token=${apiKey}`),
      fetch(`${baseUrl}/schedule-d-1-b/${crd}?token=${apiKey}`),
      fetch(`${baseUrl}/schedule-d-5-k/${crd}?token=${apiKey}`),
      fetch(`${baseUrl}/schedule-d-7-a/${crd}?token=${apiKey}`),
      fetch(`${baseUrl}/schedule-d-7-b-1/${crd}?token=${apiKey}`),
      fetch(`${baseUrl}/brochures/${crd}?token=${apiKey}`),
    ]);

    if (!firmRes.ok) {
      const err = await firmRes.text();
      return NextResponse.json(
        { error: "Firm ADV fetch failed", details: err },
        { status: 500 }
      );
    }

    const firmJson = await firmRes.json();
    const filing = firmJson.filings?.[0] || null;

    const [scheduleA, scheduleB, schedD1B, schedD5K, schedD7A, schedD7B, brochures] =
      await Promise.all([
        safeJson(scheduleARes),
        safeJson(scheduleBRes),
        safeJson(schedD1BRes),
        safeJson(schedD5KRes),
        safeJson(schedD7ARes),
        safeJson(schedD7BRes),
        safeJson(brochureRes),
      ]);

    return NextResponse.json({
      filing,
      scheduleA: scheduleA || [],
      scheduleB: scheduleB || [],
      otherBusinessNames: schedD1B || [],
      separatelyManagedAccounts: schedD5K || [],
      financialIndustryAffiliations: schedD7A || [],
      privateFunds: schedD7B || [],
      brochures: brochures || [],
    });
  } catch (error) {
    console.error("Error in /api/firm:", error);
    return NextResponse.json(
      { error: error.message || "Unknown server error" },
      { status: 500 }
    );
  }
}

// helper to safely parse JSON from schedule endpoints
async function safeJson(res) {
  try {
    if (!res || !res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error("Error parsing schedule JSON", e);
    return null;
  }
}
