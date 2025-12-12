import FirmsTable from "@/components/Home/FirmsTable";

function isZipCode(value = "") {
  return /^\d{5}$/.test(value.trim());
}

export default async function AdvisorsPage({ searchParams }) {
  const params = await searchParams;
  const rawLocation = (params?.location || "").trim();
  const location = rawLocation.toLowerCase();

  const zip = isZipCode(rawLocation);

  const displayLocation = zip
    ? `ZIP ${rawLocation}`
    : rawLocation
        .split(" ")
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/advisors?location=${location}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return (
    <div className="w-full">
      {/* -------------------- BANNER SECTION (FIGMA EXACT) -------------------- */}
      <div className="relative w-full h-[320px] md:h-[380px] lg:h-[420px] overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <img
          src="/alaska.jpg"
          alt="Financial Advisors Alaska"
          className="w-full h-full object-cover"
        />

        {/* DARK GRADIENT OVERLAY (exact like figma) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.35)] to-[rgba(0,0,0,0.65)]"></div>

        {/* CENTER HEADING */}
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide drop-shadow-[0_3px_6px_rgba(0,0,0,0.45)]">
            Financial Advisor Firms{" "}
            {displayLocation ? (
              <>
                {zip ? "near " : "in "}
                {displayLocation} – 2025
              </>
            ) : (
              <>– 2025</>
            )}
          </h1>
        </div>
      </div>

      {/* -------------------- PAGE CONTENT -------------------- */}
      <div className="px-6 md:px-20 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Best Financial Advisors {zip ? "near " : "in "}
          <span className="capitalize">{displayLocation}</span>
        </h2>

        <FirmsTable firms={data.firms} />
      </div>
    </div>
  );
}
