// app/api/home/route.js
import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get(
      "https://luminoushousingltd.com/cms/api/get-req-data/sections?type=slug&value=home&get_section=yes&image=yes&post=yes&file=no&gallery=no"
    );
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching home data:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch home data" }), {
      status: 500,
    });
  }
}
