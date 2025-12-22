// app/api/project-detail/[slug]/route.js
import axios from "axios";

export async function GET(req, { params }) {
  const { slug } = params;
  try {
    const response = await axios.get(
      `https://luminoushousingltd.com/cms/api/get-req-data/product-data?type=slug&value=${slug}&image=yes&post=yes&file=yes`
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch project detail" }),
      { status: 500 }
    );
  }
}
