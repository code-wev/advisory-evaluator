import { firmsData } from "@/data/firmsData";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location");

  if (!location) {
    return Response.json(
      { error: "Location required" },
      { status: 400 }
    );
  }

  // Convert to lowercase for clean matching
  const query = location.toLowerCase();

  // Filter by location from cityState string
  const results = firmsData.filter((firm) =>
    firm.cityState.toLowerCase().includes(query)
  );

  // If no matches found
  if (results.length === 0) {
    return Response.json({
      source: "dummy-data",
      count: 0,
      firms: [],
      message: "No matching firms found for this location."
    });
  }

  // Successful response
  return Response.json({
    source: "dummy-data",
    count: results.length,
    firms: results,
  });
}
