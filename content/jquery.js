export async function detectjQuery() {
  const hasGlobal = typeof window.jQuery !== "undefined" || typeof window.$ !== "undefined";

  const scripts = Array.from(document.querySelectorAll("script[src]")).map(s => s.src.toLowerCase());
  const hasScript = scripts.some(src =>
    src.includes("jquery") || src.includes("jquery.validate") || src.includes("jquery.") // plugin
  );

  return hasGlobal || hasScript;
}
