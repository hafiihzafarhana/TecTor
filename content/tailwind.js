export function detectTailwind() {
  const commonClasses = [
    "flex", "grid", "block", "hidden",
    "text-center", "text-left", "text-right",
    "bg-", "text-", "p-", "m-", "mt-", "mb-", "rounded", "shadow"
  ];

  const elements = document.querySelectorAll("[class]");
  let count = 0;

  elements.forEach(el => {
    const classList = el.className.split(/\s+/);
    classList.forEach(cls => {
      if (commonClasses.some(cc => cls.startsWith(cc))) {
        count++;
      }
    });
  });

  return count > 10;
}
