// /api/home.js
export async function getBlogListApi() {
  const response = await fetch(
    `http://localhost/lum-dashboard/api/get-req-data/blog-list?image=yes&post=no&file=&specification=&gallery=&variation=&limit=`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function getBlogDetailApi(param) {
  const response = await fetch(
    `http://localhost/lum-dashboard/api/get-req-data/blog-data?type=slug&value=${param}`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
