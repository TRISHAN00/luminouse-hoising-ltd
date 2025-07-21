// /api/home.js
export async function getProjectListApi() {
  const response = await fetch(
    `http://localhost/lum-dashboard/api/get-req-data/all-products?image=yes&post=no&file=&specification=&gallery=&variation=&limit=`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function getProjectDetailApi(param) {
  const response = await fetch(
    `http://localhost/lum-dashboard/api/get-req-data/product-data?type=slug&value=${param}&image=yes&post=yes&file=yes`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
