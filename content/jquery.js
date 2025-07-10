export async function detectjQuery() {
  const hasGlobal = typeof window.jQuery !== "undefined" || typeof window.$ !== "undefined";

  const scripts = Array.from(document.querySelectorAll("script[src]")).map(s => s.src.toLowerCase());
  const hasScript = scripts.some(src =>
    src.includes("jquery") || /jquery(\.min)?\.js/.test(src)
  );

  const hasPrototype = !!window.jQuery && typeof window.jQuery.fn === "object";

  return hasGlobal || hasScript || hasPrototype;
}
