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
        { error: "SEC_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: apiKey
    };

    const baseUrl = "https://api.sec-api.io/form-adv";

    // BODY for ADV firm
    const firmBody = {
      query: `Info.FirmCrdNb:${crd}`,
      from: 0,
      size: 1,
      sort: [{ "Info.FirmCrdNb": { order: "desc" } }],
    };

    // --------------------------
    // FETCH ALL 10 ENDPOINTS 🤝
    // --------------------------

    const [
      firmRes,
      part1ARes,
      scheduleARes,
      scheduleBRes,
      schedD1BRes,
      schedD5KRes,
      schedD7ARes,
      schedD7BRes,
      brochureRes
    ] = await Promise.all([
      fetch(`${baseUrl}/firm`, {
        method: "POST",
        headers,
        body: JSON.stringify(firmBody),
      }),

      // ⭐ NEW IMPORTANT ENDPOINT ⭐
      fetch(`${baseUrl}/part-1a/${crd}?token=${apiKey}`),

      fetch(`${baseUrl}/schedule-a-direct-owners/${crd}?token=${apiKey}`),
      fetch(`${baseUrl}/schedule-b-indirect-owners/${crd}?token=${apiKey}`),
      fetch(`${baseUrl}/schedule-d-1-b/${crd}?token=${apiKey}`),
      fetch(`${baseUrl}/schedule-d-5-k/${crd}?token=${apiKey}`),
      fetch(`${baseUrl}/schedule-d-7-a/${crd}?token=${apiKey}`),
      fetch(`${baseUrl}/schedule-d-7-b-1/${crd}?token=${apiKey}`),
      fetch(`${baseUrl}/brochures/${crd}?token=${apiKey}`),
    ]);

    // -------------------------
    // PARSE MAIN FILING DATA
    // -------------------------
    if (!firmRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch ADV firm record" },
        { status: 500 }
      );
    }

    const firmJson = await firmRes.json();
    const filing = firmJson?.filings?.[0] || null;

    // -------------------------
    // PARSE SUB-ENDPOINTS SAFE
    // -------------------------
    const [
      part1A,
      scheduleA,
      scheduleB,
      schedD1B,
      schedD5K,
      schedD7A,
      schedD7B,
      brochures
    ] = await Promise.all([
      safeJson(part1ARes),
      safeJson(scheduleARes),
      safeJson(scheduleBRes),
      safeJson(schedD1BRes),
      safeJson(schedD5KRes),
      safeJson(schedD7ARes),
      safeJson(schedD7BRes),
      safeJson(brochureRes),
    ]);

    // -------------------------
    // RETURN FULL DATA PACKAGE
    // -------------------------
    return NextResponse.json({
      filing,
      part1A: part1A || {},

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
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// Safe JSON parser
async function safeJson(res) {
  try {
    if (!res || !res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error("JSON parse error:", e);
    return null;
  }
}
