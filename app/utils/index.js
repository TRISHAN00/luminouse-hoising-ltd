export function parseDescriptionToArray(description) {
  try {
    // Convert &amp; and other HTML entities to normal characters
    const decodeHtml = (html) => {
      const txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    };

    const cleaned = decodeHtml(description);
    return JSON.parse(cleaned); // parsed array
  } catch (error) {
    console.error("Failed to parse description JSON:", error);
    return [];
  }
}
