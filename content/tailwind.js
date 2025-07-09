export async function detectTailwind() {
  const commonClasses = [
    "flex", "grid", "block", "hidden",
    "text-center", "text-left", "text-right",
    "bg-", "text-", "p-", "m-", "mt-", "mb-", "rounded", "shadow"
  ];

  const elements = document.querySelectorAll("[class]");
  let count = 0;

  elements.forEach(el => {
    const classAttr = (el.getAttribute("class") || "").toString();
    const classList = classAttr.split(/\s+/);

    classList.forEach(cls => {
      if (commonClasses.some(cc => cls.startsWith(cc))) {
        count++;
      }
    });
  });

  return count > 10;
}
