import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get(
      "https://luminoushousingltd.com/cms/api/get-req-data/sections?type=slug&value=livous-denim&get_section=yes&image=yes&post=yes&file=no&gallery=no"
    );
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
