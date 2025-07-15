// app/api/projects/route.js
import axios from "axios";

export async function GET(slug) {
  try {
    const response = await axios.get(
    `https://luminoushousingltd.com/cms/api/get-req-data/product-data?type=slug&value=${slug}r&image=yes&post=yes&file=yes`
    );
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching projects data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch projects data" }),
      {
        status: 500,
      }
    );
  }
}
