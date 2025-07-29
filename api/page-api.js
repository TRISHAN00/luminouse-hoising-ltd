// /api/home.js
export async function getApi(param) {
  const response = await fetch(
    `http://localhost/lum-dashboard/api/get-req-data/sections?type=slug&value=${param}&get_section=yes&image=yes&post=yes&file=no&gallery=no`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}


export async function getSettingApi() {
  const response = await fetch(
    `http://localhost/lum-dashboard/api/get-req-data/settings-data`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}