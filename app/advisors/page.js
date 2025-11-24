import FirmsTable from "@/components/Home/FirmsTable";

export default async function AdvisorsPage({ searchParams }) {

  // FIX: Convert promise → object
  const params = await searchParams;
  const location = params?.location?.toLowerCase() || "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/advisors?location=${location}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return (
    <div className="px-6 md:px-20 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Best Financial Advisors in {location}
      </h1>

      <FirmsTable firms={data.firms} />
    </div>
  );
}
