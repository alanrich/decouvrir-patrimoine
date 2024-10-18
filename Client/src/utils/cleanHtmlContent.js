export const cleanHtmlContent = (htmlContent) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  // Remove edit sections and first heading
  doc
    .querySelectorAll(".mw-editsection, h2, h3, h4, h5, h6")
    .forEach((el) => el.remove());

  // Remove "Article détaillé" links
  doc
    .querySelectorAll("div.mainarticle, div.hatnote")
    .forEach((el) => el.remove());

  return doc.body.innerHTML;
};
